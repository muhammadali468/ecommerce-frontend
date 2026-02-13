import { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import AddProduct from "./AddProduct";
import { Link, useNavigate } from "react-router-dom";
import ManageOrders from "./ManageOrders";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const BASE_URL = window.location.hostname === "localhost" ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_DEV_BASE_URL
    const token = localStorage.getItem("admin_token");
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            console.log("BASE_URL", BASE_URL)
            const res = await axios.post(`${BASE_URL}/api/admin-logout`, { token })
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
            console.log(error);
        }
    }
    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!categoryName || !categoryImage) return alert("All fields required");
        const newCategory = {
            id: Date.now(),
            name: categoryName,
            image: URL.createObjectURL(categoryImage),
        };
        setCategories([...categories, newCategory]);
        setCategoryName("");
        setCategoryImage(null);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!productName || !productCategory || !productPrice)
            return alert("All fields required");
        const newProduct = {
            id: Date.now(),
            name: productName,
            category: productCategory,
            price: productPrice,
        };
        setProducts([...products, newProduct]);
        setProductName("");
        setProductCategory("");
        setProductPrice("");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <Link to="/">
                    <h1 className="cursor-pointer text-3xl">Logo</h1>
                </Link>
                <div className="flex items-center">
                    <Link to="/admin/change-password">Change Password</Link>
                    <button className='cursor-pointer ml-2' onClick={handleLogout}>Logout</button>
                </div>

            </div>
            {/* <AdminNavbar/> */}
            <Tabs className="grid md:grid-cols-5 gap-4">
                <TabList className="shadow bg-white col-span-1 rounded-2xl p-4">
                    <Tab className="rounded-xl p-2 cursor-pointer" selectedClassName="bg-blue-400 text-white">Add Category</Tab>
                    <Tab className="rounded-xl p-2 cursor-pointer" selectedClassName="bg-blue-400 text-white">Orders</Tab>
                    <Tab className="rounded-xl p-2 cursor-pointer" selectedClassName="bg-blue-400 text-white">Add Product</Tab>
                </TabList>
                <div className="col-span-4">
                    <TabPanel>
                        <AddCategory />
                    </TabPanel>
                    <TabPanel>
                        <ManageOrders />
                    </TabPanel>
                    <TabPanel>
                        <AddProduct />
                    </TabPanel>
                </div>

            </Tabs>
        </div>
    );
}

export default Dashboard;
