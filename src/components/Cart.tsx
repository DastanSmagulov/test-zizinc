"use client";
import React from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (product: CartItem) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  isOpen,
  onClose,
}) => {
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <button className="absolute top-4 right-4" onClick={onClose}>
        Close
      </button>
      <h2 className="text-xl font-semibold p-4">Cart</h2>
      <div className="p-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="font-bold mt-4">
              Total: ${totalAmount.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
