import axios from "axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Navbar from "../Components/Navbar";
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
    <>
      <AdminNavbar/>
      <h1>Welcome {admin_name}</h1>
      <h2>Admin Dashboard</h2>
      <div className="mt-10">
        <Link className="bg-green-500 p-4 rounded-xl text-white" to="/admin/add-category" target="_blank">Add Category</Link>
        <Link className="bg-green-500 p-4 rounded-xl text-white ml-2" to="/admin/add-product" target="_blank">Add Product</Link>
      </div>
    </>
  )
}

export default AdminHome