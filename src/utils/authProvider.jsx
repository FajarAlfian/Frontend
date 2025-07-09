import React, { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    id: null,
    token: null,
    role: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
