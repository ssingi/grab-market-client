import { API_URL } from "../config/constants";
import { UserSchema } from "../schema/userSchema";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import * as z from "zod";

/**
 * 공통 API POST 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} body - 요청 본문
 * @return {Promise<Object>} - API 응답 데이터
 * @throws {Error} - 요청 실패 시 에러 메시지
 */
export const apiRequest = async (endpoint, body) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message ||
        (endpoint === "/register" ? "회원가입 실패" : "로그인 실패")
    );
  }

  return await response.json();
};

/**
 * 회원가입 API 요청
 * @param {Object} formData - 사용자 정보 객체
 * @return {Promise<Object>} - API 응답 데이터
 */
const register = async (formData) => apiRequest("/register", formData);

/**
 * 로그인 API 요청
 * @param {Object} credentials - 사용자 인증 정보 객체
 * @return {Promise<Object>} - API 응답 데이터
 */
const login = async (credentials) => apiRequest("/login", credentials);

/**
 * 회원가입 함수
 * - 사용자 입력값을 검증하고 회원가입 요청을 처리
 * @param {Object} newUser - 회원가입 정보 (userID, password, email)
 * @param {Function} setErrorMessage - 에러 메시지 설정 함수
 * @param {Function} setUser - 사용자 상태 설정 함수
 * @returns {Promise<boolean>} - 성공 여부
 */
export const registerUser = async (newUser, setErrorMessage, setUser) => {
  try {
    setErrorMessage("");
    UserSchema.parse(newUser);
    await register(newUser);
    return true;
  } catch (error) {
    const message = handleError(error);
    setErrorMessage(message);
    throw new Error(message);
  }
};

/**
 * 로그인 함수
 * - 사용자 입력값을 검증하고 로그인 요청을 처리
 * @param {Object} credentials - 로그인 정보 (userID, password)
 * @param {Function} setErrorMessage - 에러 메시지 설정 함수
 * @param {Function} setUser - 사용자 상태 설정 함수
 * @returns {Promise<boolean>} - 성공 여부
 */
export const loginUser = async (credentials, setErrorMessage, setUser) => {
  try {
    setErrorMessage("");
    UserSchema.pick({ userID: true, password: true }).parse(credentials);

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

/**
 * 로그아웃 함수
 * - localStorage에서 사용자 정보를 제거하고 사용자 상태를 초기화
 * @param {Function} setUser - 사용자 상태 설정 함수
 */
export const logout = (setUser) => {
  localStorage.removeItem("user");
  setUser(null);
};

/**
 * ProtectedRoute 컴포넌트
 * - 사용자가 인증된 경우에만 자식 컴포넌트를 렌더링합니다.
 * - 인증되지 않은 경우 로그인 페이지로 리디렉션합니다.
 */
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // 사용자가 인증되지 않은 경우 로그인 페이지로 리디렉션
  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

/**
 * 에러 처리 함수
 * - ZodError 인스턴스인 경우, 첫 번째 에러 메시지를 반환
 * - 그렇지 않은 경우, error.message를 반환
 * @param {Error} error - 에러 객체
 * @param {string} defaultMessage - 기본 에러 메시지
 * @returns {string} - 에러 메시지
 */
const handleError = (
  error,
  defaultMessage = "요청 처리 중 오류가 발생했습니다"
) => {
  if (error instanceof z.ZodError) {
    return error.errors[0]?.message || defaultMessage;
  }
  return error.message || defaultMessage;
};
