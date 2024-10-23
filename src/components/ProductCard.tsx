"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (selectedQuantity > 0) {
      addToCart(product, selectedQuantity);
      setSelectedQuantity(1);
    }
  };

  const increaseQuantity = () => {
    setSelectedQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setSelectedQuantity((prev) => (prev > 1 ? prev - 1 : prev));
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

      <div className="flex items-center mt-4">
        <button
          onClick={decreaseQuantity}
          className="bg-gray-200 p-2 rounded-l-md"
        >
          -
        </button>
        <span className="mx-2">{selectedQuantity}</span>
        <button
          onClick={increaseQuantity}
          className="bg-gray-200 p-2 rounded-r-md"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
