// src/components/marketplace/Cart.tsx
import React, { useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item flex items-center mb-4 p-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div className="cart-item-details flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="quantity-control flex items-center">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded-l-md"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                      className="w-12 text-center border-t border-b border-gray-300"
                      min="1"
                    />
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                  <div className="price text-lg font-semibold">
                    ${item.price * item.quantity}
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="remove-btn text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="cart-footer mt-6 flex justify-between items-center">
          <div className="total-price text-lg font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button
            onClick={onCheckout}
            className="checkout-btn px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
