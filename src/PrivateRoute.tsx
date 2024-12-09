import { useNavigate } from "react-router";
import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react";

const PrivateRoute = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) return;
    navigate('/login');
  }, [isAuthenticated])

  return children;
}

export default PrivateRoute