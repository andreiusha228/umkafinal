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

function getRecipeIcon(title: string, items: RecipeItem[]): string {
  const titleLower = title.toLowerCase();
  const allText = `${titleLower} ${items.map(i => i.name.toLowerCase()).join(' ')}`;
  
  // Check for specific categories
  if (allText.includes('chicken') || allText.includes('kuře') || allText.includes('drůbež')) {
    return '🍗';
  }
  if (allText.includes('beef') || allText.includes('hovězí') || allText.includes('steak')) {
    return '🥩';
  }
  if (allText.includes('pork') || allText.includes('vepř') || allText.includes('salám') || allText.includes('klobása')) {
    return '🥓';
  }
  if (allText.includes('fish') || allText.includes('ryba') || allText.includes('salmon') || allText.includes('losos')) {
    return '🐟';
  }
  if (allText.includes('pasta') || allText.includes('těstoviny') || allText.includes('spaghetti') || allText.includes('nudle')) {
    return '🍝';
  }
  if (allText.includes('salad') || allText.includes('salát') || allText.includes('vegetable') || allText.includes('zelenina')) {
    return '🥗';
  }
  if (allText.includes('soup') || allText.includes('polévka')) {
    return '🍲';
  }
  if (allText.includes('pizza')) {
    return '🍕';
  }
  if (allText.includes('burger') || allText.includes('hamburger')) {
    return '🍔';
  }
  if (allText.includes('rice') || allText.includes('rýže')) {
    return '🍚';
  }
  if (allText.includes('bread') || allText.includes('chléb') || allText.includes('pečivo')) {
    return '🍞';
  }
  if (allText.includes('dessert') || allText.includes('dezert') || allText.includes('cake') || allText.includes('koláč')) {
    return '🍰';
  }
  
  // Default food icon
  return '🍽️';
}

export function RecipeCard({ title, price, items, onAddToBag, imageUrl }: RecipeCardProps) {
  const recipeIcon = getRecipeIcon(title, items);
  return (
    <Card className="w-full max-w-[280px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-7xl md:text-8xl" role="img" aria-label={`${title} recipe icon`}>
              {recipeIcon}
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


