import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import instance from "../api/axiosclient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const access = Cookies.get("access");
    const email = Cookies.get("email");
    if (access && email) {
      setUser({ email });
    }
  }, []);

  const showLogin = () => setLoginOpen(true);
  const hideLogin = () => setLoginOpen(false);

  const login = async (email, password) => {
    const response = await instance.post("/api/token/", { email, password });
    const { access, refresh, name } = response.data;
    Cookies.set("access", access);
    Cookies.set("refresh", refresh);
    Cookies.set("email", email);
    setUser({ email, name });
  };

  const logout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginOpen, showLogin, hideLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
