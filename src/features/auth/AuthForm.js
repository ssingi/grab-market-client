import React from "react";

/**
 * **CustomInputField 컴포넌트**
 * - 입력 필드를 렌더링하는 재사용 가능한 컴포넌트입니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.name - 입력 필드의 name 속성
 * @param {string} props.type - 입력 필드의 타입 (text, password, email 등)
 * @param {string} props.label - 입력 필드의 라벨 텍스트
 * @param {Object} props.formData - 입력 필드의 데이터
 * @param {Function} props.onChange - 입력 필드 변경 핸들러
 * @returns {JSX.Element} 입력 필드 컴포넌트
 */
const CustomInputField = ({ name, type, label, value, onChange }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

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
  // 입력 필드 설정
  const FORM_FIELDS = [
    { name: "userID", type: "text", label: "사용자 ID:" },
    { name: "password", type: "password", label: "비밀번호:" },
    ...(formData.email !== undefined
      ? [{ name: "email", type: "email", label: "이메일:" }]
      : []),
  ];

  return (
    <div className="auth-container">
      <h2>{title}</h2>

      {/* 에러 메시지 표시 */}
      {error && <div className="error-message">{error}</div>}

      {/* 로그인 및 회원가입 폼 */}
      <form onSubmit={onSubmit}>
        {FORM_FIELDS.map(({ name, type, label }) => (
          <CustomInputField
            key={name}
            name={name}
            type={type}
            label={label}
            value={formData[name]}
            onChange={onChange}
          />
        ))}

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
