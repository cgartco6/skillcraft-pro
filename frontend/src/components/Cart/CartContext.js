import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (course) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === course.id);
      if (existingItem) {
        toast.error('Course already in cart!');
        return prevItems;
      }
      
      toast.success(`${course.title} added to cart!`);
      return [...prevItems, { ...course, quantity: 1 }];
    });
  };

  const removeFromCart = (courseId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === courseId);
      toast.success(`${item.title} removed from cart!`);
      return prevItems.filter(item => item.id !== courseId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared!');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    isCartOpen,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
