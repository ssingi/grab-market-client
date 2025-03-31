import { createContext, useContext, useState, useEffect } from "react";
import * as z from "zod";

const AuthContext = createContext();

const UserSchema = z.object({
  username: z
    .string()
    .min(3, "최소 3자 이상 입력해주세요")
    .max(20, "20자 이내로 입력해주세요"),
  password: z.string().min(6, "최소 6자 이상 입력해주세요"),
  email: z.string().email("유효한 이메일 주소를 입력해주세요"),
});

const API_URL = "http://localhost:3001"; // 서버 주소 확인

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [errorMessage, setErrorMessage] = useState("");

  // 에러 메시지 자동 초기화
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // 에러 처리 함수 정의
  const handleError = (error) => {
    if (error instanceof z.ZodError) {
      return error.errors[0].message;
    }
    return error.message || "요청 처리 중 오류가 발생했습니다";
  };

  // 로그아웃 함수 정의
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // 회원가입 함수 정의
  const register = async (newUser) => {
    try {
      setErrorMessage("");
      UserSchema.parse(newUser);

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "회원가입에 실패했습니다");
      }

      return true;
    } catch (error) {
      const message = handleError(error);
      setErrorMessage(message);
      throw new Error(message);
    }
  };

  // 로그인 함수
  const login = async (credentials) => {
    try {
      setErrorMessage("");
      UserSchema.pick({ username: true, password: true }).parse(credentials);

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "로그인 실패");
      }

      const data = await response.json();

      if (!data.user) {
        throw new Error("사용자 정보를 받아오지 못했습니다");
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return true;
    } catch (error) {
      const message = handleError(error);
      setErrorMessage(message);
      throw new Error(message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
