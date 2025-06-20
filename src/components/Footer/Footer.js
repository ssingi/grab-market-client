import "./Footer.css";

// Footer 컴포넌트 선언과 동시에 내보내기
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">#STORY</div>
        <div className="footer-links">
          <a href="/about">홈</a>
          <a href="/contact">상품</a>
          <a href="/contact">문의</a>
        </div>
        <div className="footer-info">
          © 2025 STORY. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
