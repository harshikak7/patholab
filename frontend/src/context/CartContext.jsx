import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");

    return storedCart ? JSON.parse(storedCart) : [];
  });
  useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );
}, [cartItems]);

  const addToCart = (test) => {
    const exists = cartItems.find((item) => item._id === test._id);

    if (exists) return;

    setCartItems([...cartItems, test]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
     localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
