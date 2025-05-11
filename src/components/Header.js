import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { DownloadOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../features/auth/AuthContext";
import "./Header.css";

/** Header 컴포넌트 */
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
    <div id="header">
      <div id="header-area">
        <Link to="/">
          <img src="/images/icons/logo.png" alt="logo" />
        </Link>

        {!isAuthPage && (
          <Button
            size="large"
            onClick={() => navigate("/upload")}
            icon={<DownloadOutlined />}
          >
            상품 업로드
          </Button>
        )}
        {user && (
          <Button
            id="logout-button"
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
