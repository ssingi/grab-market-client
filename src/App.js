import { useEffect } from "react";
import "./App.css";
import {
  Route,
  Routes,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Button } from "antd";
import { DownloadOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthProvider, useAuth } from "./login/AuthContext";
import MainPageComponent from "./main/index.js";
import UploadPage from "./upload/index";
import ProductPage from "./product/index";
import ProtectedRoute from "./login/ProtectedRoute";
import LoginPage from "./login/LoginPage";
import RegisterPage from "./login/RegisterPage";

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    if (!user && !isAuthPage) {
      navigate("/login");
    }
  }, [user, navigate, isAuthPage]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/icons/logo.png" alt="logo" />
          </Link>
          <Button
            size="large"
            onClick={function () {
              navigate("/upload");
            }}
            icon={<DownloadOutlined />}
          >
            상품 업로드
          </Button>
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
      <div id="body">
        <Routes future={{ v7_relativeSplatPath: true }}>
          <Route
            path="/"
            element={user ? <Navigate to="/main" /> : <Navigate to="/login" />}
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainPageComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
