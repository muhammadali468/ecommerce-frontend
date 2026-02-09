import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
    const [user, setUser] = useState({
        name:"",
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleRegisterUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/user/register`, user);
            alert(res.data.msg)
            if (res.data.sts === 0) {
                navigate("/user/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-center">User Login</h1>
            <form action="#" method="POST" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm/6 font-medium ">
                        Name
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={handleChange}
                            value={user.name}
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
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
                        onClick={handleRegisterUser}
                        className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                        Register
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
    )
}

export default UserRegistration