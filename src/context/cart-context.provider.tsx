import React, { FC, useContext, useEffect, useState } from "react";
import Cart from "../model/Cart.type";

export type CartContextType = {
  getItemCount: () => number;
  getCartTotal: () => number;
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
};

export const CartContext = React.createContext<CartContextType>({
  getItemCount: () => 0,
  getCartTotal: () => 0,
  cart: [],
  setCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

const CartContextProvider: FC<any> = ({ children }) => {
  const [cart, setCart] = useState<Cart[]>([] as Cart[]);

  useEffect(() => {
    if (!globalThis?.localStorage) return;
    const prevCart = localStorage.getItem("cart");
    setCart(
      prevCart && typeof prevCart !== "undefined" ? JSON.parse(prevCart) : []
    );
  }, [globalThis?.localStorage]);

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  const getItemCount = () =>
    cart.reduce((totalItem: number, item) => totalItem + item.quantity, 0);
  const getCartTotal = () =>
    cart.reduce(
      (total: number, item) => total + item.product.price.valueOf() * item.quantity,
      0
    );

  const defaultContext = {
    getItemCount,
    getCartTotal,
    cart,
    setCart,
  };

  return (
    <CartContext.Provider value={defaultContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
