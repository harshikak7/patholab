import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await checkAuth();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated
    ? children
    : <Navigate to="/login" />;

};

export default ProtectedRoute;