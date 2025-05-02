import { Routes, Route, Navigate } from "react-router-dom";
import MainPageComponent from "../main/index.js";
import UploadPage from "../upload/index";
import ProductPage from "../product/index";
import ProtectedRoute from "../login/ProtectedRoute";
import LoginPage from "../login/LoginPage";
import RegisterPage from "../login/RegisterPage";
import { useAuth } from "../login/AuthContext";

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
