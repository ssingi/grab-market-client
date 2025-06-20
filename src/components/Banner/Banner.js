import { useNavigate } from "react-router-dom";
import "./Banner.css";

/**
 * 블로그 스타일 히어로 배너 컴포넌트
 */
export function Banner() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-text">
        <h1>“당신의 쇼핑, 새로운 이야기로”</h1>
        <p>프리미엄 상품을 합리적인 가격에, #STORY에서 경험하세요.</p>
        <div className="cta-buttons">
          <button className="primary" onClick={() => navigate("/products")}>
            상품 둘러보기
          </button>
          <button className="secondary" onClick={() => navigate("/about")}>
            브랜드 스토리
          </button>
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/products/bluetoothspeaker.png" alt="블루투스 스피커" />
        <div className="product-caption">대표 상품 : 블루투스스피커</div>
      </div>
    </section>
  );
}
