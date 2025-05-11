import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { handleChange, loginSubmit } from "../../../utils/formUtils";
import AuthForm from "../AuthForm";
import "../auth.css";

/** 로그인 페이지 컴포넌트 */
const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    userID: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // 컴포넌트 언마운트 시 상태 초기화
  useEffect(() => {
    return () => {
      setCredentials({ userID: "", password: "" });
    };
  }, []);

  return (
    <AuthForm
      title="로그인"
      formData={credentials}
      onChange={(e) => handleChange(e, setCredentials)}
      onSubmit={(e) =>
        loginSubmit({
          e,
          credentials,
          setError,
          login,
          navigate,
          setIsLoading,
        })
      }
      submitText="로그인"
      isLoading={isLoading}
      error={error}
      footer={
        <div className="register-link">
          <p>계정이 없으신가요?</p>
          <Link to="/register">
            <button>회원가입</button>
          </Link>
        </div>
      }
    />
  );
};

export default LoginPage;
