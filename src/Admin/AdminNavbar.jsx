import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
const AdminNavbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("admin_token");
    const BASE_URL = window.location.hostname === "localhost" ? import.meta.VITE_APP_LOCAL_BASE_URL : import.meta.VITE_APP_DEV_BASE_URL
    const handleLogout = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/admin/logout`, { token })
            alert(res.data.msg)
            if (res.data.sts === 0) {
                localStorage.removeItem("admin_id");
                localStorage.removeItem("admin_email");
                localStorage.removeItem("admin_name");
                localStorage.removeItem("admin_token");
                navigate("/admin/login")
            }
        }
        catch (error) {
            console.groupEnd(error);
        }
    }
    return (
        <Disclosure
            as="nav"
            className="relative bg-glassy border-b border after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {/* <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" /> */}
                            {/* <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" /> */}
                        </DisclosureButton>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex items-center">
                            {/* <img
                                alt="Your Company"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            /> */}
                            <h2>Logo</h2>
                        </div>

                    </div>
                    <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                        >
                            <span className="absolute -inset-1.5" />
                            {/* <BellIcon aria-hidden="true" className="size-6" /> */}
                        </button>
                        <Link to="/admin/change-password" className='z-10' >Change Password</Link>
                        <button className='cursor-pointer ml-2' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>


        </Disclosure>
    )
}

export default AdminNavbar