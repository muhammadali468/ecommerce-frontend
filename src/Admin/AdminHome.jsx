import axios from "axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Navbar from "../Components/Navbar";
import Dashboard from "./Dashboard";
const AdminHome = () => {
  const admin_name = localStorage.getItem("admin_name");
  const admin_email = localStorage.getItem("admin_email");
  const admin_token = localStorage.getItem("admin_token");

  const navigate = useNavigate()
  useEffect(() => {
    if (!admin_token) {
      navigate("/admin/login")
    }
  })

  return (
      <Dashboard/>
  )
}

export default AdminHome