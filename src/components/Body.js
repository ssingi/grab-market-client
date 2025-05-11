import { Routes, Route, Navigate } from "react-router-dom";
import MainPageComponent from "../features/main";
import UploadPage from "../features/upload";
import ProductPage from "../features/product";
import { ProtectedRoute } from "../utils/authUtils";
import LoginPage from "../features/auth/login/LoginPage";
import RegisterPage from "../features/auth/register/RegisterPage";
import { useAuth } from "../features/auth/AuthContext";
import "./Body.css";

/** Body 컴포넌트 */
function Body() {
  const { user } = useAuth();

  return (
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
          path="/products/:productID"
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
  );
}

export default Body;
