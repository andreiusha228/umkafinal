'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

interface ChatHeaderProps {
  cartItemCount: number;
  onBagClick: () => void;
}

export function ChatHeader({ cartItemCount, onBagClick }: ChatHeaderProps) {
  return (
    <div className="p-4 md:p-6 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <h1 className="text-lg font-medium text-gray-900">umka 🐻</h1>
        </div>
        <button
          onClick={onBagClick}
          className="relative p-2 -m-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ShoppingBag className="w-6 h-6 text-gray-700" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}


