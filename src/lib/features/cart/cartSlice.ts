import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cartItems: Product[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<Product[]>) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { setCartItems, addToCart, removeFromCart, updateCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
