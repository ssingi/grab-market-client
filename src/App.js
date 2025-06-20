import "./App.css";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import { Footer } from "./components/Footer/Footer"; // named import로 수정!
import { AuthProvider } from "./features/auth/AuthContext";
import { CartProvider } from "./features/product/CartContext"; // CartProvider import 추가

/**
 * **App 컴포넌트**
 * - 애플리케이션의 최상위 컴포넌트입니다.
 * - Header, Body, Footer 컴포넌트를 포함합니다.
 * - 애플리케이션의 전체적인 레이아웃을 구성합니다.
 * - Header: 상단 네비게이션 바
 * - Body: 메인 콘텐츠 영역
 * - Footer: 하단 정보 영역
 * @returns {JSX.Element} App 컴포넌트
 */
function App() {
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

/**
 * **AppWrapper 컴포넌트**
 * - App 컴포넌트를 AuthProvider와 CartProvider로 감싸는 래퍼 컴포넌트입니다.
 * - 인증 및 장바구니 관련 상태를 관리하기 위해 사용됩니다.
 * - 애플리케이션의 최상위 컴포넌트로 사용됩니다.
 * @returns {JSX.Element} AppWrapper 컴포넌트
 */
const AppWrapper = () => (
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);

export default AppWrapper;
