// src/redux/cartSlice.ts
import { Product, ProductVariations } from '@/types/product.js';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  product: Product;
  variation: ProductVariations;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  step:string
}

const initialState: CartState = {
  items: [],
  step:""
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Ajouter ou augmenter quantité
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>
    ) => {
      const existingItem = state.items.find(
        item =>
          item.product.id === action.payload.product.id &&
          item.variation.id === action.payload.variation.id
      );
    
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    

    // Changer quantité d’un item
    updateQuantity: (state, action: PayloadAction<{ productId: number;variationId: number; quantity: number }>) => {
      const item = state.items.find(item => item.product.id === action.payload.productId && item.variation.id === action.payload.variationId);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (i) =>
              !(i.product.id === action.payload.productId &&
                i.variation.id === action.payload.variationId)
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },

    // Supprimer un item
    removeFromCart: (state, action: PayloadAction<{ productId: number;variationId: number}>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload.productId && item.variation.id !== action.payload.variationId);
    },

    // Vider le panier
    clearCart: (state) => {
      initialState
    },

     // Changer de step
     updateCartStep: (state, action: PayloadAction<{ step:string }>) => {
      state.step = action.payload.step;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
