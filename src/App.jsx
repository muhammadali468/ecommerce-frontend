
import { useEffect } from 'react';
import './index.css'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function App() {
  const VITE_APP_ADMIN_TOKEN_AUTH = import.meta.env.VITE_APP_ADMIN_TOKEN_AUTH;
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");
  useEffect(() => {
    if (!token) {
      // navigate("/admin/login");
    }
    const handleValidateToken = async () => {
      try {
        const res = await axios.post(VITE_APP_ADMIN_TOKEN_AUTH, { token });
        console.log(res)
        if (res.data.sts === 1) {
          localStorage.removeItem("admin_id");
          localStorage.removeItem("admin_email");
          localStorage.removeItem("admin_name");
          localStorage.removeItem("admin_token");
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    handleValidateToken()
  }, [])
  return (
    <Outlet />
  )
}

export default App
