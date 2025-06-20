import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/constants";
import "./ProductCard.css";

// 품절 오버레이 분리
const SoldOutOverlay = () => (
  <div className="product-blur">
    <span className="sold-out-text">품절</span>
  </div>
);

const ProductCardComponent = React.memo(({ product }) => {
  const {
    productID,
    imageUrl,
    seller,
    name,
    price,
    createdAt,
    quantity,
  } = product;

  const isSoldOut = quantity <= 0;

  return (
    <div className="product-card">
      {isSoldOut && <SoldOutOverlay />}
      <Link
        to={`/products/${productID}`}
        className="product-link"
        style={{
          color: "inherit",
          pointerEvents: isSoldOut ? "none" : "auto",
        }}
        aria-disabled={isSoldOut}
        tabIndex={isSoldOut ? -1 : 0}
      >
        <div>
          <img
            className="product-img"
            src={`${API_URL}/${imageUrl}`}
            alt={name ? `${name} 상품 이미지` : "상품 이미지"}
          />
        </div>
        <div className="product-contents">
          <span className="product-name">{name}</span>
          <span className="product-price">{price.toLocaleString()}원</span>
          <div className="product-footer">
            <div className="product-seller">
              <img
                className="product-avatar"
                src="/images/icons/avatar.png"
                alt={`${seller} 판매자 프로필`}
              />
              <span>{seller}</span>
            </div>
            <span className="product-date">{dayjs(createdAt).fromNow()}</span>
          </div>
        </div>
      </Link>
    </div>
  );
});

// PropTypes 연결은 export된 이름에 맞춰주세요!
ProductCardComponent.propTypes = {
  product: PropTypes.shape({
    productID: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    imageUrl: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export const ProductCard = ProductCardComponent;
