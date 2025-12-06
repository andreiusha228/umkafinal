'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { RecipeCard } from './RecipeCard';
import { ChatInput } from './ChatInput';
import { BagScreen } from './BagScreen';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  type: 'message' | 'recipe';
  recipe?: {
    title: string;
    price: string;
    items: { id: number; name: string; price: number }[];
  };
  timestamp?: Date;
}

interface BagItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

interface ChatResponse {
  reply: string;
  recipe: { title?: string; price?: string };
  items: { id: number; name: string; price: number }[];
}

export function ChatInterface() {
  const { t } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<'chat' | 'bag'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t.chat.welcome,
      isUser: false,
      type: 'message',
      timestamp: undefined,
    },
  ]);
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      content: userText,
      isUser: true,
      type: 'message',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    const loadingMsg: Message = {
      id: (Date.now() + 1).toString(),
      content: '...',
      isUser: false,
      type: 'message',
    };
    setMessages(prev => [...prev, loadingMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      let botMsg: Message;
      if (data.recipe && data.recipe.title) {
        botMsg = {
          id: (Date.now() + 2).toString(),
          content: data.reply,
          isUser: false,
          type: 'recipe',
          recipe: {
            title: data.recipe.title,
            price: data.recipe.price || 'N/A',
            items: data.items || [],
          },
          timestamp: new Date(),
        };
      } else {
        botMsg = {
          id: (Date.now() + 2).toString(),
          content: data.reply,
          isUser: false,
          type: 'message',
          timestamp: new Date(),
        };
      }

      setMessages(prev => [...prev.slice(0, -1), botMsg]);

    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = 'Sorry, an error occurred. Please try again.';
      
      // Try to get more specific error message
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        if (error.message.includes('OPENAI_API_KEY')) {
          errorMessage = 'API key is not configured. Please check your environment variables.';
        } else if (error.message.includes('HTTP')) {
          errorMessage = `Server error: ${error.message}. Please check the console for details.`;
        }
      }
      
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        content: errorMessage,
        isUser: false,
        type: 'message',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev.slice(0, -1), errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const addAllToBag = (items: { id: number; name: string; price: number }[]) => {
    const recipeItems: BagItem[] = items.map((item, idx) => ({
      id: `${item.id}-${Date.now()}-${idx}`,
      name: item.name,
      description: '',
      price: item.price,
      quantity: 1,
      onQuantityChange: handleQuantityChange,
    }));
    
    setBagItems(prev => [...prev, ...recipeItems]);
    setCartCount(prev => prev + recipeItems.length);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setBagItems(prev => {
      const updated = prev
        .map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter(item => item.quantity > 0);
      
      setCartCount(updated.reduce((sum, item) => sum + item.quantity, 0));
      return updated;
    });
  };

  const handleClearBag = () => {
    setBagItems([]);
    setCartCount(0);
  };

  const handleShowBag = () => setCurrentScreen('bag');
  const handleBackToChat = () => setCurrentScreen('chat');

  if (currentScreen === 'bag') {
    return (
      <BagScreen
        onBack={handleBackToChat}
        items={bagItems}
        onQuantityChange={handleQuantityChange}
        onClearBag={handleClearBag}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      <ChatHeader cartItemCount={cartCount} onBagClick={handleShowBag} />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4 md:p-6 max-w-4xl mx-auto w-full">
          {messages.map((message) => {
            if (message.type === 'recipe' && message.recipe) {
              return (
                <div key={message.id} className="flex justify-start">
                  <RecipeCard
                    title={message.recipe.title}
                    price={message.recipe.price}
                    items={message.recipe.items}
                    onAddToBag={() => addAllToBag(message.recipe?.items || [])}
                  />
                </div>
              );
            }

            return (
              <ChatMessage
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
}


