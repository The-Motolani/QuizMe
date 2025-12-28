import { Navigate } from "react-router-dom";
import { UseAuth } from "../utils/UseAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = UseAuth();
  console.log("isauth>>>>>>",isAuthenticated)

  if (loading) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
