"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import SearchBar from "../components/SearchBar";
import Cart from "../components/Cart";
import { RootState, AppDispatch } from "../lib/store";
import { fetchProducts } from "../lib/features/products/productsSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );
  const sortOrder = useSelector((state: RootState) => state.filter.sortOrder);
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Store</h1>
      <SearchBar />
      <Filter
        categories={Array.from(new Set(products.map((p) => p.category)))}
      />
      <Sort />
      <ProductList products={filteredProducts} />
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => setIsCartOpen(true)}
      >
        Open Cart ({totalAmount})
      </button>
      <Cart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default HomePage;
