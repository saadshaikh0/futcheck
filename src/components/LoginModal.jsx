import React from "react";
import { useAuth } from "../auth/AuthContext";
import LoginForm from "./LoginForm";

const LoginModal = () => {
  const { loginOpen, hideLogin } = useAuth();

  if (!loginOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 relative text-black w-full max-w-sm">
        <button
          onClick={hideLogin}
          className="absolute top-2 right-2 text-gray-500"
        >
          &times;
        </button>
        <h2 className="text-xl mb-4">Login</h2>
        <LoginForm onSuccess={hideLogin} />
      </div>
    </div>
  );
};

export default LoginModal;
