import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import { API_URL } from "../../config/constants";
import dayjs from "dayjs";
import { Button } from "antd";
import { getProduct, onClickPurchase } from "./productHandlers";

/** 상품 페이지 컴포넌트 */
function ProductPage() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 상품 정보 가져오기
  useEffect(() => {
    getProduct(productID, setProduct, setIsLoading);
  }, [productID]);

  // 로딩 상태 처리
  if (isLoading) return <h1>상품 정보를 받고 있습니다...</h1>;

  // product 값 추출
  const { imageUrl, seller, name, price, createdAt, description, quantity } =
    product;

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

        {/* 구매 버튼 */}
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger={true}
          onClick={onClickPurchase}
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
