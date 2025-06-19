import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { API_URL } from "../../config/constants";
import dayjs from "dayjs";
import { Button } from "antd";
import { getProduct, purchaseProduct } from "./productHandlers";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "./CartContext";
import axios from "axios";

/**
 * **상품 페이지 컴포넌트**
 * - 특정 상품의 상세 정보를 표시하는 페이지입니다.
 * - 상품 이미지, 판매자 정보, 상품 이름, 가격, 등록일, 설명 등을 표시합니다.
 * - 구매 버튼을 통해 상품 구매를 처리할 수 있습니다.
 *
 * @returns {JSX.Element} 상품 페이지 컴포넌트
 */
function ProductPage() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buyQuantity, setBuyQuantity] = useState(1); // 구매 수량 상태 추가
  const { user } = useAuth();
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();

  /**
   * **상품 정보 가져오기**
   * - `productID`를 기반으로 서버에서 상품 정보를 가져옵니다.
   * - 가져온 데이터를 `product` 상태에 저장하고 로딩 상태를 업데이트합니다.
   */
  useEffect(() => {
    getProduct(productID, setProduct, setIsLoading);
  }, [productID]);

  // 로딩 상태 처리
  if (isLoading) return <h1>상품 정보를 받고 있습니다...</h1>;
  if (!product) return <h1>상품 정보를 불러올 수 없습니다.</h1>;

  // product 값 추출
  const { imageUrl, seller, name, price, createdAt, description, quantity } =
    product;

  // 구매 버튼 클릭 시
  const handlePurchase = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      await purchaseProduct(productID, buyQuantity, user.userID, "주소 미입력");
      // 구매 성공 후 상품 정보 직접 요청
      const res = await axios.get(`${API_URL}/products/${productID}`);
      const latestProduct = res.data.product;
      setProduct(latestProduct); // 상태도 갱신
      // 장바구니에 상품 추가 (구매 수량만큼)
      for (let i = 0; i < buyQuantity; i++) {
        addToCart(latestProduct);
      }
      alert(`구매 성공! 남은 수량: ${latestProduct.quantity}`);
    } catch (err) {
      alert(typeof err === "string" ? err : "구매에 실패했습니다.");
    }
  };

  return (
    <div>
      {/* 상품 이미지 */}
      <div id="image-box">
        <img src={`${API_URL}/${imageUrl}`} alt="상품 이미지" />
      </div>

      {/* 판매자 프로필 */}
      <div id="profile-box">
        <img src="/images/icons/avatar.png" alt="프로필" />
        <span>{seller}</span>
      </div>

      {/* 상품 정보 */}
      <div id="contents-box">
        <div id="name">{name}</div>
        <div id="price">{price}원</div>
        <div id="createdAT">{dayjs(createdAt).format("YYYY년 MM월 DD일")}</div>

        {/* 수량 조절 UI */}
        <div style={{ margin: "12px 0" }}>
          <span>수량: </span>
          <Button
            size="small"
            onClick={() => setBuyQuantity((q) => Math.max(1, q - 1))}
            disabled={buyQuantity <= 1}
            style={{ marginRight: 8 }}
          >
            -
          </Button>
          <span
            style={{
              fontWeight: "bold",
              minWidth: 24,
              display: "inline-block",
              textAlign: "center",
            }}
          >
            {buyQuantity}
          </span>
          <Button
            size="small"
            onClick={() => setBuyQuantity((q) => Math.min(quantity, q + 1))}
            disabled={buyQuantity >= quantity}
            style={{ marginLeft: 8 }}
          >
            +
          </Button>
          <span style={{ marginLeft: 12, color: "#888" }}>
            (재고: {quantity}개)
          </span>
        </div>

        {/* 구매 버튼 */}
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger={true}
          onClick={handlePurchase}
          disabled={quantity === 0}
        >
          구매하기
        </Button>

        {/* 상품 설명 */}
        <pre id="description">{description}</pre>
      </div>
    </div>
  );
}
export default ProductPage;
