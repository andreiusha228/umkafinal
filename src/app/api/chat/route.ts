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
    let products: Product[] = [];
    try {
      const productsPath = path.join(process.cwd(), 'data', 'products.json');
      if (!fs.existsSync(productsPath)) {
        console.error('Products file not found at:', productsPath);
        throw new Error('Products database not found');
      }
      const productsData = fs.readFileSync(productsPath, 'utf8');
      products = JSON.parse(productsData);
    } catch (fileError) {
      console.error('Error reading products file:', fileError);
      return NextResponse.json(
        {
          reply: "I'm sorry, I couldn't access the product database. Please contact support.",
          recipe: {},
          items: []
        },
        { status: 500 }
      );
    }

    const availableProducts = products.filter((p: Product) => p.in_stock);
    const productsJson = JSON.stringify(availableProducts, null, 2);

    const systemPrompt = `You are Umka 🐻 — a friendly cooking assistant.

IMPORTANT: Language Detection
- Automatically detect the language the user is speaking (English or Czech)
- Always respond in the SAME language the user is using
- If the user writes in Czech, respond in Czech
- If the user writes in English, respond in English
- Match the user's language style and formality level

PERSONALITY & CONVERSATION:
- Be friendly, helpful, and conversational
- You can have general conversations, answer questions, and chat about cooking, food, or anything else
- When users greet you (hi, hello, etc.), respond warmly and ask how you can help
- You're not just a recipe generator — you're a friendly assistant who can talk about cooking, food, ingredients, meal planning, and more
- If someone asks about recipes, ingredients, or cooking, use the product catalog below
- If it's just a friendly conversation, respond naturally without trying to generate a recipe

RECIPE GENERATION (only when user asks for recipes):
- You have access to this product catalog (JSON below)
- Only use products where in_stock=true
- Recipe price = sum of product prices from the list
- Never invent prices or unavailable items
- Respect user budgets
- If user asks for a recipe but no suitable recipe can be made from available products, suggest alternatives or explain what's available

RESPONSE FORMAT:
Always reply in JSON format:
{
  "reply": "string - your conversational response or recipe explanation",
  "recipe": { "title": "string", "price": "string" } - only include if generating a recipe,
  "items": [ { "id": number, "name": "string", "price": number } ] - only include if generating a recipe
}

If the user is just chatting (greetings, questions, general conversation), return:
{ "reply": "your friendly response", "recipe": {}, "items": [] }

If the user asks for a recipe, include the recipe and items in your response.

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
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Provide more specific error messages
    let errorMessage = "I'm sorry, something went wrong. Please try again later.";
    let statusCode = 500;
    
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      
      if (error.message.includes('OPENAI_API_KEY') || error.message.includes('apiKey')) {
        errorMessage = "OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable on the server.";
        statusCode = 500;
      } else if (error.message.includes('No response from OpenAI')) {
        errorMessage = "I couldn't get a response from the AI. Please try again.";
        statusCode = 502;
      } else if (error.message.includes('Products database')) {
        errorMessage = "I couldn't access the product database. Please contact support.";
        statusCode = 500;
      } else {
        // Don't expose internal error details to users, but log them
        errorMessage = "I'm sorry, an unexpected error occurred. Please try again later.";
      }
    }
    
    return NextResponse.json(
      { 
        reply: errorMessage,
        recipe: {},
        items: []
      },
      { status: statusCode }
    );
  }
}
