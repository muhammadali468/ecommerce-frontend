import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
    const admin_email = localStorage.getItem("admin_email");
    const [passwords, setPasswords] = useState({
        email: admin_email,
        oldPassword: "",
        newPassword: "",
    })
    const admin_name = localStorage.getItem("admin_name");
    const admin_token = localStorage.getItem("admin_token");

    const navigate = useNavigate()
    useEffect(() => {
        if (!admin_token) {
            navigate("/admin/login")
        }

    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value,
        })
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.put("https://ecommerce-backend-production-b154.up.railway.app/api/admin/change-password", passwords);
            console.log(res)
            alert(res.data.msg)
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 tracking-tight">Change Password of {admin_email ? admin_email : ""}</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="oldPassword" className="block text-sm/6 font-medium ">
                                    Old Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={passwords.oldPassword}
                                    onChange={handleChange}
                                    id="oldPassword"
                                    name="oldPassword"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="border block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="newPassword" className="block text-sm/6 font-medium ">
                                    New Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={passwords.newPassword}
                                    onChange={handleChange}
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="border block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleChangePassword}
                                className="text-white flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default ChangePassword