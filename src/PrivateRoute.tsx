import { useNavigate } from "react-router";
import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react";

const PrivateRoute = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  useEffect(() => {
    if (token) return;
    navigate('/login');
  })

  return children;
}

export default PrivateRoute