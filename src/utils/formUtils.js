import { ERROR_MESSAGES } from "../config/constants";

/**
 * 유효성 검사 함수
 * - 입력값이 비어 있는지 확인
 * @param {Object} fields - 입력 필드 객체
 * @returns {boolean} - 유효성 검사 결과
 */
export const isFormValid = (fields) => {
  return Object.values(fields).every((value) => value.trim());
};

/**
 * 입력값 변경 처리 함수
 * - 입력값을 상태로 업데이트
 * @param {Event} e - 이벤트 객체
 * @param {Function} setState - 상태 업데이트 함수
 */
export const handleChange = (e, setState) => {
  const { name, value } = e.target;
  setState((prev) => ({ ...prev, [name]: value }));
};

/**
 * 로그인 제출 처리 함수
 * @param {Object} params - 필요한 매개변수
 * @param {Event} params.e - 이벤트 객체
 * @param {Object} params.credentials - 사용자 입력값
 * @param {Function} params.setError - 에러 상태 업데이트 함수
 * @param {Function} params.setIsLoading - 로딩 상태 업데이트 함수
 * @param {Function} params.login - 로그인 함수
 * @param {Function} params.navigate - 페이지 이동 함수
 */
export const loginSubmit = async ({
  e,
  credentials,
  setError,
  setIsLoading,
  login,
  navigate,
}) => {
  e.preventDefault();
  setError(""); // 에러 초기화

  if (!isFormValid(credentials)) {
    setError(ERROR_MESSAGES.REQUIRED);
    return;
  }

  setIsLoading(true);
  try {
    await login(credentials);
    navigate("/");
  } catch (error) {
    setError(error.message || ERROR_MESSAGES.LOGIN_FAILED);
  } finally {
    setIsLoading(false);
  }
};

/**
 * 회원가입 제출 처리 함수
 * @param {Object} params - 필요한 매개변수
 * @param {Event} params.e - 이벤트 객체
 * @param {Object} params.formData - 사용자 입력값
 * @param {Function} params.setError - 에러 상태 업데이트 함수
 * @param {Function} params.register - 회원가입 함수
 * @param {Function} params.navigate - 페이지 이동 함수
 */
export const registerSubmit = async ({
  e,
  formData,
  setError,
  register,
  navigate,
}) => {
  e.preventDefault();
  setError(""); // 에러 초기화

  if (!isFormValid(formData)) {
    setError(ERROR_MESSAGES.REQUIRED);
    return;
  }

  try {
    await register(formData);
    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    navigate("/login");
  } catch (err) {
    setError(err.message || ERROR_MESSAGES.REGISTER_FAILED);
  }
};
