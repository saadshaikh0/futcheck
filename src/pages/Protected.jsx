import React from "react";
import { useAuth } from "../auth/AuthContext";

const Protected = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl mb-4">Protected Page</h2>
      <p>Welcome {user?.email}</p>
      <button className="bg-red-700 p-2 mt-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Protected;
