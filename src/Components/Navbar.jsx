import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="bg-glassy h-16 fixed w-full z-20 top-0 start-0 border-b border-black border-default">
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
                <div className="flex gap-2">
                    <Link to="/user/login">User</Link>
                    <Link to="/admin/login">Admin</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar