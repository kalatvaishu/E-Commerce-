import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";



export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  const addToCart = (product) => {
    const isInCart = cartItem.find((item) => item.id === product.id);
    if (isInCart) {
      toast.info("Item already in cart");
    } else {
      setCartItem([
        ...cartItem,
        {
          ...product,
          quantity: 1,
          originalPrice: product.price,
        },
      ]);
      toast.success("Item added to cart");
    }
  };

  const updateQuantity = (items, id, action) => {
    const updatedCart = items.map((item) => {
      if (item.id === id) {
        const quantity =
          action === "increase"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity,
          price: quantity * item.originalPrice,
        };
      }
      return item;
    });
    setCartItem(updatedCart);
  };
  const deleteItem = (id) => {
    const filteredCart = cartItem.filter((item) => item.id !== id);
    setCartItem(filteredCart);
    toast.success("Item removed from cart");
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
