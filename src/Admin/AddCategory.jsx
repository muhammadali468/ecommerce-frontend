import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../Components/Loader";

const AddCategory = () => {
    const [file, setFile] = useState(null);
    const [catName, setCatName] = useState("");
    const [categoriesData, setCategoriesData] = useState([])
    const [loading, setLoading] = useState(false);
    const handleViewAllCategories = async () => {
        const allCat = await axios.get("https://ecommerce-backend-production-b154.up.railway.app/api/category/viewAll")
        setCategoriesData(allCat.data.cat)
    }
    // handleViewAllCategories()
    useEffect(() => {
        handleViewAllCategories()
    }, [])

    const handleChange = (e) => {
        setCatName(e.target.value)
    }

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a file!")
        }
        const newFormData = new FormData();
        newFormData.append("cat_name", catName)
        newFormData.append("cat_img", file)
        try {
            setLoading(true)
            const res = await axios.post("https://ecommerce-backend-production-b154.up.railway.app/api/category/add", newFormData);
            alert(res.data.msg);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
        handleViewAllCategories()

    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleDeleteCategory = async (id) => {
        try {
            setLoading(true)
            const res = await axios.delete(`https://ecommerce-backend-production-b154.up.railway.app/api/category/delete/${id}`);
            setLoading(false)
            alert(res.data.msg)
            handleViewAllCategories()
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            {loading ? <Loader/> : ""}
            <div className="flex min-h-screen bg-gray-100 px-6 gap-6">
                {/* Left: Add Category Form */}
                <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl mb-4">Add Category</h2>
                    <form
                        // onSubmit={handleAddCategory}
                        className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="cat_name" className="block text-sm  mb-1">Category Name</label>
                            <input
                                name="cat_name"
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="cat_img" className="block text-sm  mb-1">Category Image</label>
                            <input
                                name="cat_img"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full border p-4 rounded-xl cursor-pointer"
                            />
                        </div>
                        <button
                            onClick={handleAddCategory}
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                        >
                            Add Category
                        </button>
                    </form>
                </div>

                {/* Right: Category Table */}
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                    <h2 className="text-2xl mb-4">All Categories</h2>
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-3 border-b">Image</th>
                                <th className="text-left p-3 border-b">Name</th>
                                <th className="text-left p-3 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoriesData.map((cat) => (
                                <tr key={cat._id} className="hover:bg-gray-100">
                                    <td className="p-3 border-b">
                                        <img src={cat.cat_img} alt={cat.cat_name} className="w-16 h-16 object-cover p-3 rounded border border-black" />
                                    </td>
                                    <td className="p-3 border-b">{cat.cat_name}</td>
                                    <td className="p-3 border-b">
                                        <button
                                            className="bg-red-500 text-white rounded-xl cursor-pointer p-2 text-center"
                                            onClick={() => handleDeleteCategory(cat._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {categoriesData.length === 0 && (
                                <tr>
                                    <td colSpan="2" className="p-3 text-center text-gray-500">
                                        No categories added yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AddCategory