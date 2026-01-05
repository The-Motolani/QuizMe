import { Navigate } from "react-router-dom";
import { UseAuth } from "../utils/UseAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = UseAuth();
  console.log("isauth>>>>>>",isAuthenticated)

  if (authLoading) return null;

  // if (!) {
  //   return <Navigate to="/login" replace />;
  // }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
