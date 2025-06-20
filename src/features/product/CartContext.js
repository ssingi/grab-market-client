import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // 같은 상품이면 수량만 증가
  const addToCart = (product) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.productID === product.productID
      );
      if (idx > -1) {
        // 이미 있으면 수량 증가
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + 1,
        };
        return updated;
      }
      // 없으면 새로 추가 (초기 수량 1)
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // 수량 변경
  const updateQuantity = (productID, newQty) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) =>
            item.productID === productID ? { ...item, quantity: newQty } : item
          )
          .filter((item) => item.quantity > 0) // 0 이하이면 자동 삭제
    );
  };

  // 상품 삭제
  const removeFromCart = (productID) => {
    setCartItems((prev) => prev.filter((item) => item.productID !== productID));
  };

  // 장바구니 비우기 함수 추가
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
