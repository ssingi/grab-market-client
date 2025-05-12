import { useEffect, useState } from "react";
import "./index.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Carousel } from "antd";
import { fetchBanners, fetchProducts } from "./mainHandlers";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Banner } from "../../components/Banner/Banner";

dayjs.extend(relativeTime);

/**
 * **메인 페이지 컴포넌트**
 * - 애플리케이션의 메인 페이지를 구성하는 컴포넌트입니다.
 * - 배너와 상품 리스트를 표시합니다.
 * - 배너는 자동으로 슬라이드되며, 상품 리스트는 상품 정보를 카드 형태로 표시합니다.
 * @returns {JSX.Element} 메인 페이지 컴포넌트
 */
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
            <Banner key={index} href={href} imageUrl={imageUrl} />
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
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          // 상품이 없을 때
          <div>상품을 불러오는 중입니다...</div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
