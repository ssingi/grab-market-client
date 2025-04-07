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

const API_URL = "http://localhost:8080"; // 서버 주소를 8080 포트로 수정

export const register = async (formData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "회원가입 실패");
  }

  return await response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "로그인 실패");
  }

  return await response.json();
};

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
  const registerUser = async (newUser) => {
    try {
      setErrorMessage("");
      UserSchema.parse(newUser);

      const data = await register(newUser);

      return true;
    } catch (error) {
      const message = handleError(error);
      setErrorMessage(message);
      throw new Error(message);
    }
  };

  // 로그인 함수
  const loginUser = async (credentials) => {
    try {
      setErrorMessage("");
      UserSchema.pick({ username: true, password: true }).parse(credentials);

      const data = await login(credentials);

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
        login: loginUser,
        logout,
        register: registerUser,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
