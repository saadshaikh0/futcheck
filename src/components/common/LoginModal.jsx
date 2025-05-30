import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { loginUser, verifyGoogleToken } from '../../api/authService';
import { setUserInfo } from '../../redux/appSlice';
import { setCookie } from '../utils/cookies';
import { GoogleLogin } from '@react-oauth/google';

const LoginModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password });
      const { access, refresh } = data;
      setCookie('access_token', access);
      setCookie('refresh_token', refresh);
      dispatch(setUserInfo(data));
      onClose();
    } catch (err) {
      setError('Login failed');
    }
  };

  const handleGoogle = async (credentialResponse) => {
    try {
      const userInfo = await verifyGoogleToken({
        token: credentialResponse.credential,
      });
      const { access, refresh } = userInfo.tokens;
      setCookie('access_token', access);
      setCookie('refresh_token', refresh);
      setCookie('google_token', credentialResponse.credential);
      dispatch(setUserInfo(userInfo));
      onClose();
    } catch (err) {
      console.error('Google login failed');
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <Dialog.Panel className="bg-white w-80 p-4 rounded-md">
        <Dialog.Title className="text-lg font-bold mb-2 text-center">
          Login
        </Dialog.Title>
        <div className="flex flex-col gap-2">
          <input
            className="border p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleLogin}
            className="bg-fuchsia-400 text-white py-2 rounded mt-2"
          >
            Login
          </button>
          <p className="text-xs text-center mt-2">
            Register user or login with Google
          </p>
          <div className="flex justify-center mt-2">
            <GoogleLogin onSuccess={handleGoogle} onError={() => {}} size="medium" theme="outline" />
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default LoginModal;
