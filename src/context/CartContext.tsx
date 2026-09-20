'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant, Size, Color, Coupon } from '@/types';
import { INITIAL_COUPONS } from '@/data/products';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, variant?: ProductVariant, size?: Size, color?: Color, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  coupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  vatAmount: number;
  total: number;
  itemCount: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
}

const FREE_SHIPPING_THRESHOLD = 500; // 500 AED free shipping in UAE
const VAT_RATE = 0.05; // 5% UAE VAT

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  // Load saved cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shourk_nady_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('shourk_nady_coupon');
      if (savedCoupon) {
        setCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shourk_nady_cart', JSON.stringify(items));
      if (coupon) {
        localStorage.setItem('shourk_nady_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('shourk_nady_coupon');
      }
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items, coupon]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    size?: Size,
    color?: Color,
    quantity: number = 1
  ) => {
    const selectedVariant = variant || product.variants[0];
    const selectedSize = size || product.sizes[0] || { id: 'default', name: 'Standard', position: 1 };
    const selectedColor = color || product.colors[0] || { id: 'default', name: 'Midnight Black', nameAr: 'أسود', hexCode: '#0A0A0A' };

    const cartItemId = `${product.id}-${selectedVariant.id}-${selectedSize.id}-${selectedColor.id}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: cartItemId,
            product,
            variant: selectedVariant,
            size: selectedSize,
            color: selectedColor,
            quantity,
            price: selectedVariant.price || product.price,
          },
        ];
      }
    });

    setIsOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const foundCoupon = INITIAL_COUPONS.find((c) => c.code === cleanCode && c.isActive);

    if (!foundCoupon) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (foundCoupon.minOrder && subtotal < foundCoupon.minOrder) {
      return {
        success: false,
        message: `Minimum order of AED ${foundCoupon.minOrder} required for this coupon`,
      };
    }

    setCoupon(foundCoupon);
    return { success: true, message: `Coupon ${foundCoupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (coupon) {
    if (coupon.type === 'percentage') {
      discountAmount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else if (coupon.type === 'fixed') {
      discountAmount = coupon.value;
    }
  }
  if (discountAmount > subtotal) discountAmount = subtotal;

  const afterDiscount = subtotal - discountAmount;
  const shippingFee = afterDiscount >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 25;
  const vatAmount = Math.round(afterDiscount * VAT_RATE);
  const total = afterDiscount + shippingFee + vatAmount;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        vatAmount,
        total,
        itemCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
