import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setCredentials({ username: "", password: "" });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(credentials);
      if (success) navigate("/");
    } catch (error) {
      setError(error.message); // 서버에서 반환된 에러 메시지 표시
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">사용자 이름:</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
      <div className="register-link">
        <p>계정이 없으신가요?</p>
        <Link to="/register">
          <button>회원가입</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
