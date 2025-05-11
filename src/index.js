import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* ✅ 라우터를 가장 바깥쪽으로 이동 */}
    <BrowserRouter>
      {/* ✅ 인증 프로바이더 내부에서 앱 실행 */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
