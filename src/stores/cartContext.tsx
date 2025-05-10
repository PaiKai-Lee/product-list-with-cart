import { createContext, useContext, useState } from 'react';

type CartItemType = {
  id: number;
  quantity: number;
  price: number;
};
type CartContextType = {
  items: CartItemType[];
  addToCart: (id: number, price: number) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getQuantity: (id: number) => number | undefined;
  resetCart: () => void;
  getTotalResult: () => {
    totalQuantity: number;
    totalPrice: number;
  };
};

const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  function addToCart(id: number, price: number) {
    // 如果購物車沒有該商品,則加入購物車
    if (!cartItems.some((item) => item.id === id)) {
      setCartItems((prev) => [...prev, { id, quantity: 1, price }]);
    }
  }

  function removeFromCart(id: number) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function increaseQuantity(id: number) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    );
  }

  function decreaseQuantity(id: number) {
    if (getQuantity(id) === 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    );
  }

  function resetCart() {
    setCartItems([]);
  }

  function getQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity;
  }

  function getTotalResult() {
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );

    return { totalQuantity, totalPrice };
  }

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getQuantity,
        getTotalResult,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
