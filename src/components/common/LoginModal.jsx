import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import {
  loginUser,
  registerUser,
  verifyGoogleToken,
} from "../../api/authService";
import { setUserInfo } from "../../redux/appSlice";
import { setCookie } from "../utils/cookies";
import { GoogleLogin } from "@react-oauth/google";

const LoginModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await loginUser({ email, password });
      const { access, refresh } = data;
      setCookie("access_token", access);
      setCookie("refresh_token", refresh);
      dispatch(setUserInfo(data));
      onClose();
    } catch (err) {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Validation
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      const data = await registerUser({ email, password });
      const { access, refresh } = data;
      setCookie("access_token", access);
      setCookie("refresh_token", refresh);
      dispatch(setUserInfo(data));
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleGoogle = async (credentialResponse) => {
    try {
      setIsLoading(true);
      setError("");
      const userInfo = await verifyGoogleToken({
        token: credentialResponse.credential,
      });
      const { access, refresh } = userInfo.tokens;
      setCookie("access_token", access);
      setCookie("refresh_token", refresh);
      setCookie("google_token", credentialResponse.credential);
      dispatch(setUserInfo(userInfo));
      onClose();
    } catch (err) {
      console.error("Google login failed");
      setError("Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
    setConfirmPassword("");
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <Dialog.Panel className="bg-white w-80 p-4 rounded-md">
        <Dialog.Title className="text-lg font-bold mb-2 text-center">
          {isRegistering ? "Register" : "Login"}
        </Dialog.Title>
        <div className="flex flex-col gap-2">
          <input
            className="border p-2 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {isRegistering && (
            <input
              className="border p-2 rounded"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-fuchsia-400 text-white py-2 rounded mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : isRegistering ? "Register" : "Login"}
          </button>

          <button
            onClick={toggleMode}
            disabled={isLoading}
            className="text-fuchsia-400 text-sm underline mt-2 disabled:opacity-50"
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Need an account? Register"}
          </button>

          <div className="flex items-center my-2">
            <hr className="flex-1" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-1" />
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogle}
              onError={() => setError("Google login failed")}
              size="medium"
              theme="outline"
              disabled={isLoading}
            />
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default LoginModal;
