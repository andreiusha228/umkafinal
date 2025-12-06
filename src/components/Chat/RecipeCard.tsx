'use client';

import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface RecipeItem {
  id: number;
  name: string;
  price: number;
}

interface RecipeCardProps {
  title: string;
  price: string;
  items: RecipeItem[];
  onAddToBag: () => void;
  imageUrl?: string;
}

export function RecipeCard({ title, price, items, onAddToBag, imageUrl }: RecipeCardProps) {
  return (
    <Card className="w-full max-w-[280px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-base mb-1">{title}</h3>
        <p className="text-lg font-semibold text-gray-900 mb-4">{price} Kč</p>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Ingredients:</h4>
          <ul className="space-y-1.5">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-700 flex-1">{item.name}</span>
                <span className="text-gray-500 ml-2 whitespace-nowrap">{item.price} Kč</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={onAddToBag}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-medium h-12"
        >
          Add to Bag
        </Button>
      </div>
    </Card>
  );
}


