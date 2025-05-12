import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/constants";
import "./ProductCard.css";

/**
 * **상품 카드 컴포넌트**
 * - 상품 정보를 표시하는 카드 형태의 컴포넌트입니다.
 * - 품절 상품은 흐리게 처리되며, 클릭할 수 없습니다.
 * @param {Object} product - 상품 정보
 * @param {string} product.productID - 상품 ID
 * @param {string} product.imageUrl - 상품 이미지 URL
 * @param {string} product.seller - 판매자 이름
 * @param {string} product.name - 상품 이름
 * @param {number} product.price - 상품 가격
 * @param {string} product.createdAt - 상품 등록일
 * @param {number} product.quantity - 상품 수량
 * @returns {JSX.Element} 상품 카드 컴포넌트
 */
export const ProductCard = ({ product }) => {
  const { productID, imageUrl, seller, name, price, createdAt, quantity } =
    product;

  return (
    <div className="product-card">
      {/* 품절 상품 처리 */}
      {quantity <= 0 && <div className="product-blur" />}
      <Link
        style={{
          color: "inherit",
          pointerEvents: quantity <= 0 ? "none" : "auto",
        }}
        className="product-link"
        to={`/products/${productID}`}
      >
        {/* 상품 카드 */}
        <div>
          <img
            className="product-img"
            src={`${API_URL}/${imageUrl}`}
            alt="상품 이미지"
          />
        </div>

        {/* 상품 정보 */}
        <div className="product-contents">
          <span className="product-name">{name}</span>
          <span className="product-price">{price}원</span>
          <div className="product-footer">
            <div className="product-seller">
              <img
                className="product-avatar"
                src="images/icons/avatar.png"
                alt="판매자 이미지"
              />
              <span>{seller}</span>
            </div>
            <span className="product-date">{dayjs(createdAt).fromNow()}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
