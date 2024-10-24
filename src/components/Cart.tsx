"use client";
import React from "react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
} from "../lib/features/cart/cartSlice";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  cartItems: Product[];
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, isOpen, onClose }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[80vw] sm:w-[40vw] bg-white shadow-lg transform ${
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
                  {item.name} x
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateCartQuantity({
                          id: item.id,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                    className="w-16 mx-2 border rounded-md text-center"
                  />
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
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
