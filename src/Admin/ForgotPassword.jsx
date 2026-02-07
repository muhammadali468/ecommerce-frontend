import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminForgotPassword = () => {

    const [adminEmail, setAdminEmail] = useState(localStorage.getItem("tem_email") ? localStorage.getItem("tem_email") : "");

    const handleChange = (e) => {
        const email = e.target.value;
        setAdminEmail(email)
    }
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/admin/reset-password-link", { adminEmail })
            console.log("res", res)
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div>
            <div
                className="flex h-auto min-h-screen items-center justify-center overflow-x-hidden bg-[url('https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/auth/auth-background-2.png')] bg-cover bg-center bg-no-repeat py-10"
            >
                <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8">

                    <div className="bg-base-100 shadow-base-300/20 z-1 w-full space-y-6 rounded-xl p-6 shadow-md sm:max-w-md lg:p-8">
                        <div className="flex items-center gap-3">
                            {/* <img src="https://cdn.flyonui.com/fy-assets/logo/logo.png" className="size-8" alt="brand-logo" /> */}
                            {/* <h2 className="text-base-content text-xl font-bold">FlyonUI</h2> */}
                        </div>
                        <div>
                            <h3 className="text-base-content mb-1.5 text-2xl font-semibold">Forgot Password?</h3>
                            <p className="text-base-content/80">Enter your email and we'll send you instructions to reset your password</p>
                        </div>
                        <form className="mb-4 space-y-4" >
                            <div className="flex flex-col space-y-2">
                                <label className="label-text" htmlFor="userEmail">Email address*</label>
                                <input value={adminEmail} onChange={handleChange} type="email" placeholder="Enter your email address" className="border p-3 rounded-xl input" id="userEmail" required />
                            </div>
                            <div className="w-full flex justify-center">
                                <button onClick={handleForgotPassword} className="bg-indigo-600 py-2 px-6 rounded-xl text-white mx-auto">Send Reset Link</button>
                            </div>
                        </form>
                        <div className="group flex items-center justify-center gap-2">
                            <span
                                className="icon-[tabler--chevron-left] text-primary size-5 shrink-0 transition-transform group-hover:-translate-x-1 rtl:rotate-180"
                            ></span>
                            <Link to="/admin/login" className="link link-animated link-primary font-normal">Back to login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminForgotPassword