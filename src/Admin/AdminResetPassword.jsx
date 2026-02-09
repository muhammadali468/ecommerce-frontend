import axios from "axios"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const AdminResetPassword = () => {
    const [password, setPassword] = useState({
        resetToken: useParams().resetToken,
        password: "",
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword({
            ...password,
            [name]: value
        })
        // setPassword(e.target.value)
    }
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/admin/reset-password`, password);
            if (res.data.sts !== 0) {
                alert("Error changing Password!")
            }
            alert("Password Changed!")
            navigate("/admin/login");
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Change Password of <i></i></h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium ">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                value={password.password}
                                onChange={handleChange}
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="border block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handleResetPassword}
                            className=" flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Change Password
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default AdminResetPassword