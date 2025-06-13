// src/utils/RequireAdmin.jsx
import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const token = localStorage.getItem("token");
  const id_role = localStorage.getItem("id_role");

  if (!token) return <Navigate to="/login" />;
  if (id_role !== "1") return <Navigate to="/productlistpage" />;

  return children;
}
