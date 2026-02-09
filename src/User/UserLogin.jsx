import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const UserLogin = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const BASE_URL = window.location.hostname === "localhost" ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_DEV_BASE_URL
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${BASE_URL}/api/user/login`, user)
            alert(res.data.msg)
            console.log(res.data)
            if (res.data.sts === 0) {
                navigate("/shop")
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form action="#" method="POST" className="max-w-lg border shadow-lg p-8 rounded-2xl mx-auto my-20 space-y-6">
                <div className="text-4xl text-center">Logo</div>
                <h1 className="inter-tight-bold text-center">User Login</h1>
                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium ">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={handleChange}
                            value={user.email}
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium ">
                            Password
                        </label>
                        {/* <div className="text-sm">
                            <Link to="/admin/forgot-password" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                Forgot password?
                            </Link>
                        </div> */}
                    </div>
                    <div className="mt-2">
                        <input
                            value={user.password}
                            onChange={handleChange}
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="text-white flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Login
                    </button>
                </div>
                <span>
                    Not user?
                    <Link to="/admin/login" className="mx-1 text-blue-700">Login</Link>
                    for Admin
                </span>

            </form>
        </>
    )
}

export default UserLogin