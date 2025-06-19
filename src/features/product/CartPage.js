import { useCart } from "./CartContext";
import { API_URL } from "../../config/constants";
import "./CartPage.css";

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

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
    </div>
  );
}

export default CartPage;
