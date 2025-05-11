import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { registerSubmit, handleChange } from "../../../utils/formUtils";
import AuthForm from "../AuthForm";
import "../auth.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userID: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <AuthForm
      title="회원가입"
      formData={formData}
      onChange={(e) => handleChange(e, setFormData)}
      onSubmit={(e) =>
        registerSubmit({ e, formData, setError, register, navigate })
      }
      submitText="회원가입"
      error={error}
    />
  );
};

export default RegisterPage;
