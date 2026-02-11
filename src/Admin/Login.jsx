import { useEffect, useState } from "react"
import ErrorMessage from "../Components/ErrorMessage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
const Login = () => {
    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate();
    const VITE_APP_ADMIN_LOGIN = import.meta.env.VITE_APP_ADMIN_LOGIN
    const [adminData, setAdminData] = useState({
        adminEmail: "",
        adminPassword: "",
    });

    useEffect(()=>{
        const admin_token = localStorage.getItem("admin_token")
        if(admin_token){
            alert("Already Logged in!")
            navigate("/admin/home")
        }
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({
            ...adminData,
            [name]: value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(VITE_APP_ADMIN_LOGIN, adminData);
            setShowToast(true)
            setTimeout(() => { setShowToast(false) }, 3000)
            if (res.data.sts === 0) {
                console.log(res.data)
                setMsg(res.data.msg)
                setType("success")
                localStorage.setItem("admin_id", res.data.aId);
                localStorage.setItem("admin_email", res.data.aEmail);
                localStorage.setItem("admin_name", res.data.aName);
                localStorage.setItem("admin_token", res.data.token);
                navigate("/admin/home")
                // remove temp email
                localStorage.removeItem("tem_email")
            }
            else {
                setMsg(res.data.msg)
                setType("error")
            }
            if(adminData.adminEmail && res.data.sts === 2){
                localStorage.setItem("tem_email", adminData.adminEmail)
            }
        }
        catch (error) {
            console.log(res.data.error)
        }
    }
    return (
        <>
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Admin Login</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium ">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    value={adminData.adminEmail}
                                    id="email"
                                    name="adminEmail"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block border w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium ">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link to="/admin/forgot-password" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={adminData.adminPassword}
                                    onChange={handleChange}
                                    id="password"
                                    name="adminPassword"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block border w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={handleLogin}
                                className="text-white flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                        Not a member?{' '}
                        <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login