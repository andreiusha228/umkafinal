import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }
  return new OpenAI({
    apiKey: apiKey,
  });
}

interface Product {
  id: number;
  name: string;
  price: number;
  tags: string;
  in_stock: boolean;
}

interface ChatResponse {
  reply: string;
  recipe: { title?: string; price?: string };
  items: { id: number; name: string; price: number }[];
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Read products from JSON file
    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(productsData);

    const availableProducts = products.filter((p: Product) => p.in_stock);
    const productsJson = JSON.stringify(availableProducts, null, 2);

    const systemPrompt = `You are Umka — a cooking assistant.

IMPORTANT: Language Detection
- Automatically detect the language the user is speaking (English or Czech)
- Always respond in the SAME language the user is using
- If the user writes in Czech, respond in Czech
- If the user writes in English, respond in English
- Match the user's language style and formality level

You have access to this product catalog (JSON below).
Only use products where in_stock=true.
Recipe price = sum of product prices from the list.
Never invent prices or unavailable items.
Respect user budgets.
If no recipe fits, return:
{ "reply": "No recipe found for your query.", "recipe": {}, "items": [] }

Reply strictly in JSON:
{
  "reply": "string",
  "recipe": { "title": "string", "price": "string" },
  "items": [ { "id": number, "name": "string", "price": number } ]
}

Available products:
${productsJson}`;

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let chatResponse: ChatResponse;
    try {
      chatResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', responseText);
      return NextResponse.json({
        reply: "I'm sorry, I couldn't process your request properly. Please try again.",
        recipe: {},
        items: []
      });
    }

    return NextResponse.json(chatResponse);

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        reply: "I'm sorry, something went wrong. Please try again later.",
        recipe: {},
        items: []
      },
      { status: 500 }
    );
  }
}
