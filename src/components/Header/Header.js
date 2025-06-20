import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import {
  DownloadOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../features/auth/AuthContext";
import "./Header.css";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* 로고 */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/icons/logo.png" alt="logo" />
        </Link>
      </div>

      {/* 메뉴 */}
      {!isAuthPage && (
        <ul className="navbar-menu">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">홈</Link>
          </li>
          <li className={location.pathname.startsWith("/products") ? "active" : ""}>
            <Link to="/products">상품</Link>
          </li>
          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to="/about">브랜드 소개</Link>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact">문의</Link>
          </li>
        </ul>
      )}

      {/* 우측 액션 */}
      <div className="navbar-actions">
        {!isAuthPage && (
          <>
            <Button
              size="large"
              onClick={() => navigate("/upload")}
              icon={<DownloadOutlined />}
              style={{ marginRight: 8 }}
            >
              상품 업로드
            </Button>
            <Button
              size="large"
              onClick={() => navigate("/cart")}
              icon={<ShoppingCartOutlined />}
              style={{ marginRight: 8 }}
            >
              장바구니
            </Button>
          </>
        )}
        {user ? (
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        ) : (
          !isAuthPage && (
            <Button
              icon={<UserOutlined />}
              onClick={() => navigate("/login")}
            >
              로그인
            </Button>
          )
        )}
      </div>
    </nav>
  );
}

export default Header;
