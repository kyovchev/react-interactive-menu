import { useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  useEffect(() => navigate("/"), [navigate]);
  return "";
}

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/menu");
}
