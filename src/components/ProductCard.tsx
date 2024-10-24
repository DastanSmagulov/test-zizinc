"use client";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../lib/features/cart/cartSlice";
import { AppDispatch } from "../lib/store";
import { RootState } from "../lib/store";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Select the cart items from the store
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currentCartItem = cartItems.find((item) => item.id === product.id);
  const cartQuantity = currentCartItem ? currentCartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const increaseQuantity = () => {
    dispatch(
      updateCartQuantity({ id: product.id, quantity: cartQuantity + 1 })
    );
  };

  const decreaseQuantity = () => {
    if (cartQuantity > 1) {
      dispatch(
        updateCartQuantity({ id: product.id, quantity: cartQuantity - 1 })
      );
    } else {
      dispatch(removeFromCart(product.id)); // Remove from cart if quantity reaches zero
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-md">
      <Image
        src={product.image}
        alt={product.name}
        width={48}
        height={48}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">${product.price.toFixed(2)}</p>
      {cartQuantity > 0 ? (
        <div className="flex items-center mt-4">
          <button
            onClick={decreaseQuantity}
            className="bg-gray-200 p-2 rounded-l-md"
          >
            -
          </button>
          <span className="mx-2">{cartQuantity}</span>
          <button
            onClick={increaseQuantity}
            className="bg-gray-200 p-2 rounded-r-md"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
