// src/utils/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/productlistpage" replace /> : children;
}
