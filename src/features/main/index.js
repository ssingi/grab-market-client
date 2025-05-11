import { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../config/constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Carousel } from "antd";
import { fetchBanners, fetchProducts } from "./mainHandlers";

dayjs.extend(relativeTime);

/** 메인 페이지 컴포넌트 */
function MainPage() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  // 상품과 배너 데이터 가져오기
  useEffect(function () {
    fetchProducts(setProducts);
    fetchBanners(setBanners);
  }, []);

  return (
    <div>
      {/* 배너 */}
      <Carousel autoplay autoplaySpeed={3000}>
        {banners.length > 0 ? ( // 배너가 있을 때
          banners.map(({ href, imageUrl }, index) => (
            <Link to={href} key={index}>
              <div id="banner">
                <img src={`${API_URL}/${imageUrl}`} alt="배너 이미지" />
              </div>
            </Link>
          ))
        ) : (
          // 배너가 없을 때
          <div>배너를 불러오는 중입니다...</div>
        )}
      </Carousel>

      {/* 상품 리스트 */}
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product-list">
        {products.length > 0 ? ( // 상품이 있을 때
          products.map(
            (
              { productID, imageUrl, seller, name, price, createdAt, quantity },
              index
            ) => (
              // 상품 카드
              <div className="product-card" key={index}>
                {/* 품절 상품 처리 */}
                {quantity <= 0 && <div className="product-blur" />}
                <Link
                  style={{
                    color: "inherit",
                    pointerEvents: quantity <= 0 ? "none" : "auto", // 품절 시 클릭 방지
                  }}
                  className="product-link"
                  to={`/products/${productID}`}
                >
                  <div>
                    <img
                      className="product-img"
                      src={`${API_URL}/${imageUrl}`}
                      alt="상품 이미지"
                    />
                  </div>
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
                      <span className="product-date">
                        {dayjs(createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )
        ) : (
          // 상품이 없을 때
          <div>상품을 불러오는 중입니다...</div>
        )}
      </div>
    </div>
  );
}
export default MainPage;
