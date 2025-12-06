'use client';

interface BagItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

interface BagScreenProps {
  onBack: () => void;
  items: BagItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onClearBag: () => void;
}

export function BagScreen({ onBack, items, onQuantityChange, onClearBag }: BagScreenProps) {
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      <div className="p-4 md:p-6 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-medium text-gray-900">Your bag</h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={onClearBag}
              className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              Clear bag
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto w-full">
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500 text-center">
                Nothing in Bag yet 🛍️
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-500">{item.description}</p>
                      )}
                    </div>
                    <span className="font-semibold text-gray-800">
                      {item.price * item.quantity} Kč
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.price} Kč each
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 md:p-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg text-gray-700">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              {totalPrice} Kč
            </span>
          </div>
          <button
            disabled={items.length === 0}
            className={`w-full py-4 rounded-2xl font-medium text-base h-14 ${
              items.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}


