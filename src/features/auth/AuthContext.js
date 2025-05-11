import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logout } from "../../utils/authUtils";

const AuthContext = createContext();

/**
 * AuthProvider 컴포넌트
 * - 애플리케이션 전역에서 인증 상태를 관리하고 제공하는 컴포넌트
 * @param {React.ReactNode} children - 하위 컴포넌트
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * 에러 메시지 자동 초기화
   * - 에러 메시지가 설정된 후 5초 후에 자동으로 초기화
   */
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: async (Credentials) => {
          await loginUser(Credentials, setErrorMessage, setUser);
        },
        logout: () => logout(setUser),
        register: async (newUser) => {
          await registerUser(newUser, setErrorMessage, setUser);
        },
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth 훅
 * - AuthContext를 사용하기 위한 커스텀 훅
 * @returns {Object} - 인증 상태와 함수들
 */
export const useAuth = () => useContext(AuthContext);
