import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";

export function useRequireRole(allowedRoles) {
  const { auth } = useContext(AuthContext);                  
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate("/login", { replace: true });
      return;
    }
    if (!allowedRoles.includes(auth.role)) {
      navigate("/", { replace: true });
    }
  }, [auth, allowedRoles, navigate]);
}
