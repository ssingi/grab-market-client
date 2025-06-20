import { useCart } from "./CartContext";
import { API_URL } from "../../config/constants";
import "./CartPage.css";
import { Button, message } from "antd";
import { useAuth } from "../auth/AuthContext";
import { purchaseProduct } from "./productHandlers";

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  // 장바구니 전체 구매 처리
  const handleCartPurchase = async () => {
    if (!user) {
      message.error("로그인이 필요합니다.");
      return;
    }
    try {
      for (const item of cartItems) {
        await purchaseProduct(
          item.productID,
          item.quantity,
          user.userID,
          "주소 미입력"
        );
      }
      message.success("장바구니 상품을 모두 구매했습니다.");
      clearCart && clearCart();
    } catch (err) {
      message.error("구매에 실패했습니다.");
    }
  };

  if (cartItems.length === 0) {
    return <h2 className="cart-title">장바구니가 비어 있습니다.</h2>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">장바구니</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li className="cart-item" key={item.productID}>
            <img
              className="cart-item-img"
              src={`${API_URL}/${item.imageUrl}`}
              alt={item.name}
            />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">{item.price}원</div>
              <div className="cart-item-qty">
                수량:{" "}
                <button
                  className="qty-btn"
                  onClick={() =>
                    updateQuantity(item.productID, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() =>
                    updateQuantity(item.productID, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.productID)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* 장바구니 구매 버튼 추가 */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Button type="primary" danger size="large" onClick={handleCartPurchase}>
          구매
        </Button>
      </div>
    </div>
  );
}

export default CartPage;
