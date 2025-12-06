'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSendMessage, disabled = false, placeholder }: ChatInputProps) {
  const { t } = useLanguage();
  const defaultPlaceholder = placeholder || t.chat.placeholder;
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="flex items-center justify-center">
          <div className="relative w-full max-w-2xl">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={defaultPlaceholder}
              disabled={disabled}
              className="w-full pr-14 py-3 text-base rounded-full border-gray-200 bg-white focus:bg-white focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            />
            {message.trim() && (
              <Button
                type="submit"
                disabled={disabled}
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
              >
                <Send className="w-5 h-5" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}


