import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add item or increment quantity
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((c) => c.id === item.id);
      if (exist) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // ✅ Update quantity
  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) => (i.id === id ? { ...i, quantity } : i));
    });
  };

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Clear cart completely
  const clearCart = () => setCart([]);

  // ✅ Calculate total amount
  const totalAmount = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
