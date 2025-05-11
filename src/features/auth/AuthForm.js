import React from "react";

/**
 * 공통 인증 폼 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.title - 폼 제목
 * @param {Object} props.formData - 입력 필드 데이터
 * @param {Function} props.onChange - 입력 필드 변경 핸들러
 * @param {Function} props.onSubmit - 폼 제출 핸들러
 * @param {string} props.submitText - 제출 버튼 텍스트
 * @param {boolean} [props.isLoading] - 로딩 상태
 * @param {string} [props.error] - 에러 메시지
 * @param {React.ReactNode} [props.footer] - 폼 하단에 표시할 추가 콘텐츠
 */
const AuthForm = ({
  title,
  formData,
  onChange,
  onSubmit,
  submitText,
  isLoading = false,
  error = "",
  footer = null,
}) => {
  return (
    <div className="auth-container">
      <h2>{title}</h2>

      {/* 에러 메시지 표시 */}
      {error && <div className="error-message">{error}</div>}

      {/* 로그인 및 회원가입 폼 */}
      <form onSubmit={onSubmit}>
        {/* 사용자 ID 입력 필드 */}
        <div>
          <label htmlFor="userID">사용자 ID:</label>
          <input
            type="text"
            id="userID"
            name="userID"
            value={formData.userID}
            onChange={onChange}
            required
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>

        {/* 이메일 입력 필드 (회원가입 시에만 표시) */}
        {formData.email !== undefined && (
          <div>
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>
        )}

        {/* 제출 버튼 */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? `${title} 중...` : submitText}
        </button>
      </form>

      {/* 추가 콘텐츠 */}
      {footer}
    </div>
  );
};

export default AuthForm;
