import React, { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    id: null,
    token: null,
    role: null,
  });

  // ⏬ Ambil dari localStorage saat pertama kali render
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  // ⏫ Simpan ke localStorage setiap kali auth berubah
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth"); // Bersihkan jika logout
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
