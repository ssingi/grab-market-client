// src/components/Body/Body.js

import { Routes, Route, Navigate } from "react-router-dom";
import MainPageComponent from "../../features/main";
import UploadPage from "../../features/upload";
import ProductPage from "../../features/product";
import CartPage from "../../features/product/CartPage";
import { ProtectedRoute } from "../../utils/authUtils";
import LoginPage from "../../features/auth/login/LoginPage";
import RegisterPage from "../../features/auth/register/RegisterPage";
import ProductsPage from "../../features/products/ProductsPage"; // 상품 페이지 import
import ContactPage from "../../features/contact/ContactPage";
import { useAuth } from "../../features/auth/AuthContext";
import "./Body.css";

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
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
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
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
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
