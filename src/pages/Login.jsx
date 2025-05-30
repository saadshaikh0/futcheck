import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/protected");
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl mb-4">Login</h2>
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
};

export default Login;
