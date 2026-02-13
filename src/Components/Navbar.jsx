import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Navbar = () => {
    const user = localStorage.getItem("user_token") ? localStorage.getItem("user_token") : null

    return (
        <nav className="bg-glassy h-16 fixed w-full z-20 top-0 start-0 border-b border-black border-default px-16">
            <div className="flex items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-xl text-heading whitespace-nowrap">Logo</span>
                </Link>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto" id="navbar-language">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                        <li>
                            <Link to="/" className="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/Shop" className="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Shop</Link>
                        </li>

                    </ul>
                </div>
                <div className="flex gap-2 items-center">
                    <Link to="/cart">
                        <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m.5.5.6 2m0 0 2.4 8h11v-6a2 2 0 0 0-2-2zm11.4 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-8-1a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" stroke="#000" />
                        </svg>
                    </Link>
                    {user ?
                        <Menu as="div" className="relative">
                            <MenuButton className="rounded-full block border-2 p-1" as="span">
                                    <svg width="20" height="20" viewBox="-0.5 0 33 33" xmlns="http://www.w3.org/2000/svg"><title>user</title><path d="M16.5 0a9.5 9.5 0 0 1 4.581 17.825C27.427 19.947 32 25.94 32 33h-2c0-7.732-6.268-14-14-14S2 25.268 2 33H0c0-7.3 4.888-13.458 11.57-15.379A9.5 9.5 0 0 1 16.5 0m0 2a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15" fill="#252528" /></svg>
                            </MenuButton>
                            <MenuItems as="ul" className="bg-gray-100 focus:none outline:none focus-visible:outline-none p-4 absolute rounded-xl shadow flex flex-col space-y-2">
                                <MenuItem as="li" className="w-max">
                                    <p className="text-sm">My Orders</p>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                        :

                        <Link to="/user/login">User</Link>}
                    <Link to="/admin/login">Admin</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar