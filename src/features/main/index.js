import { useEffect, useState } from "react";
import "./index.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Carousel } from "antd";
import { fetchBanners } from "./mainHandlers";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Banner } from "../../components/Banner/Banner";

dayjs.extend(relativeTime);

function MainPage({ products }) { // products를 props로 받음
  const [banners, setBanners] = useState([]);

  useEffect(function () {
    fetchBanners(setBanners);
  }, []);

  return (
    <div>
      {/* 배너 */}
      <Carousel autoplay autoplaySpeed={3000}>
        {banners.length > 0 ? (
          banners.map(({ href, imageUrl }, index) => (
            <Banner key={index} href={href} imageUrl={imageUrl} />
          ))
        ) : (
          <div>배너를 불러오는 중입니다...</div>
        )}
      </Carousel>

      {/* 상품 리스트 */}
      <h1 id="product-headline">판매되는 상품들</h1>
      <div id="product-list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))
        ) : (
          <div>상품이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
