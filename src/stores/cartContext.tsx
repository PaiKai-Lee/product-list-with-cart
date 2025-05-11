import { createContext, useState } from 'react';

type CartItemType = {
  id: number;
  quantity: number;
  price: number;
};
type CartContextType = {
  items: CartItemType[];
  totalQuantity: number;
  totalPrice: number;
  addToCart: (id: number, price: number) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getQuantity: (id: number) => number | undefined;
  resetCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

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

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        totalQuantity,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getQuantity,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
