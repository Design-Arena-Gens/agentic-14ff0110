'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import type { CartItem, Product } from '@/lib/types';
import { products } from '@/lib/data';

type CartAction =
  | { type: 'ADD'; productId: string; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE'; productId: string; quantity: number }
  | { type: 'RESET' };

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: []
};

const getProduct = (productId: string): Product | undefined =>
  products.find((product) => product.id === productId);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD': {
      const product = getProduct(action.productId);
      if (!product) return state;

      const existingItem = state.items.find(
        (item) => item.product.id === action.productId
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.productId
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          )
        };
      }

      return {
        items: [...state.items, { product, quantity: action.quantity }]
      };
    }
    case 'UPDATE': {
      const quantity = Math.max(1, action.quantity);
      return {
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity }
            : item
        )
      };
    }
    case 'REMOVE': {
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.productId
        )
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

type CartContextType = {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = 'agentic-supermarket-cart';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    if (typeof window === 'undefined') return initial;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return initial;
      const parsed = JSON.parse(saved) as CartState;
      return parsed;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, isMounted]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    dispatch({ type: 'ADD', productId, quantity });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE', productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE', productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [state.items]
  );

  const itemCount = useMemo(
    () => state.items.reduce((count, item) => count + item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      itemCount
    }),
    [state.items, subtotal, itemCount, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
