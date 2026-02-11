import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
const AddProduct = () => {
    const [categoriesData, setCategoriesData] = useState([])
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const admin_token = localStorage.getItem("admin_token")
        if (!admin_token) {
            navigate("/admin/login")
        }
        else {
            handleViewAllCategories()
            handleViewAllProducts()
        }
    }, [])
    const [formData, setFormData] = useState(new FormData())
    const [file, setFile] = useState(null)
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [seachQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productSelected, setProductSelected] = useState(null);
    const [files, setFiles] = useState([])
    const BASE_URL = window.location.hostname === "localhost" ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_DEV_BASE_URL

    const [loading, setLoading] = useState(false);
    const handleViewAllCategories = async () => {
        try {
            setLoading(true)
            const allCat = await axios.get(`${BASE_URL}/api/category/viewAll`)
            setLoading(false)
            setCategoriesData(allCat.data.cat)

        } catch (error) {
            alert("Failed to get categories!")
            setLoading(false)
        }
    }
    const handleViewAllProducts = async () => {
        try {
            setLoading(true)
            const allProductsRes = await axios.get(`${BASE_URL}/api/products/get`);
            setLoading(false)
            setProducts(allProductsRes.data.product)
        } catch (error) {
            alert("Failed to get products!")
            setLoading(false)


        }

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (file) {
            const fd = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                fd.append(key, value);
            });
            fd.append("productThumbnailImg", file);
            console.log([...fd.entries()]);
            try {
                setLoading(true)

                const res = await axios.post(`${BASE_URL}/api/product/add`, fd);
                setLoading(false)

                alert(res.data.msg)
                handleViewAllProducts()
            } catch (error) {
                alert("Failed to add product")
                console.log(error)
            }
        }
        else {
            alert("Please select a valid File")
        }

    }

    const handleDeleteProduct = async (id) => {
        try {
            setLoading(true)
            const res = await axios.delete(`${BASE_URL}/api/product/delete/${id}`)
            setLoading(false)
            alert(res.data.msg)
            if (res.data.sts === 0) {
                handleViewAllProducts()
            }
        } catch (error) {
            alert("Failed to delete product!")
            console.log(error);
            setLoading(false)
        }
    }

    const handleCheckBoxChange = (checkedId) => {
        setSelectedRows((prevSelectedRowns) => {
            if (prevSelectedRowns.includes(checkedId)) {
                return prevSelectedRowns.filter((id) => id !== checkedId)
            }
            else {
                return [...prevSelectedRowns, checkedId]
            }
        })
        console.log(selectedRows)
    }

    const handleChangeStatus = async (status) => {
        try {
            setLoading(true)
            const res = await axios.post(`${BASE_URL}/api/product/update`, {
                productIds: selectedRows,
                productStatuses: status
            })
            setLoading(false)
            alert(res.data.msg)
            if (res) {
                handleViewAllProducts()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteProducts = async () => {
        try {
            setLoading(true)

            const res = await axios.post(`${BASE_URL}/api/product/delete/multiple`, {
                productIds: selectedRows,
            })
            setLoading(false)

            alert(res.data.msg)
            if (res) {
                handleViewAllProducts()
            }
        } catch (error) {
            alert("Failed to delete products!")
            setLoading(false)

            console.log(error)
        }
    }
    const filterProducts = products.filter((product) => selectedStatus === "all" ? true : product.productStatus === selectedStatus).filter((product) => product.productName.toLowerCase().includes(seachQuery.toLowerCase()));
    const openModal = (productId) => {
        console.log(productId)
        setIsModalOpen(true);
        setProductSelected(productId);
    }

    const handleFilesChange = (e) => {
        setFiles(e.target.files)
    }
    const handleUploadImages = async () => {
        if(files.length === 0){
            alert("File is required!")
        }
        const formData = new FormData();
        for (const file of files) {
            formData.append("images", file)
        }
        formData.append("productId", productSelected)
        try {
            setLoading(true)
            const res = await axios.post(`${BASE_URL}/api/product/uploadimages/${productSelected}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            if (res) {
                setLoading(false)
                alert(res.data.msg)
                setIsModalOpen(false)
                setFiles([])
            }

        } catch (error) {
            console.log(error)
            alert("Failed to upload product images");
            setLoading(false)
        }
    }



    return (
        <>
            {loading ? <Loader /> : ""}
            <div className="min-h-screen bg-gray-100">
                <div className="mx-auto  rounded-2xl bg-white p-6 shadow">
                    <div className="flex justify-between my-4">
                        <h1 className="mb-6 text-2xl font-semibold text-gray-800">
                            Add Product
                        </h1>
                        <div className="flex justify-between items-center space-x-4">
                            <input placeholder="Search product by name" className="border rounded-xl p-4" type="text" onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div>
                            <select name="filterStatus" id="" onChange={(e) => {
                                setSelectedStatus(e.target.value)
                            }}>
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="enable">Enable</option>
                                <option value="disable">Disable</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Left: Add Product Form */}
                        <div className="rounded-xl border p-5">
                            <h2 className="mb-4 text-lg font-medium text-gray-700">
                                Product Details
                            </h2>

                            <form className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">
                                        Category
                                    </label>
                                    <select
                                        name="productCategory"
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-3 py-2 focus:border-indigo-500 focus:outline-none">
                                        <option>Select category</option>
                                        {categoriesData.map((category) => (
                                            <option key={category._id} value={category._id}>{category.cat_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">
                                        Product Name
                                    </label>
                                    <input
                                        name="productName"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter product name"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">
                                        Product Image
                                    </label>
                                    <input
                                        name="productThumbnailImg"
                                        onChange={handleFileChange}
                                        type="file"
                                        className="w-full rounded-lg border px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">
                                        Product Short Description
                                    </label>
                                    <input
                                        name="productShortDescription"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter product name"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">
                                        Product Long Description
                                    </label>
                                    <textarea
                                        name="productLongDescription"
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Product description"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-indigo-500 focus:outline-none"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">
                                        Price
                                    </label>
                                    <input
                                        name="productPrice"
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Enter price"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">
                                        Sale Price
                                    </label>
                                    <input
                                        name="productSalePrice"
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Enter price"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">
                                        Sale Start Date
                                    </label>
                                    <input
                                        name="productSaleStartDate"
                                        onChange={handleChange}
                                        type="date"
                                        placeholder="Enter price"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm text-gray-600">
                                        Sale End Date
                                    </label>
                                    <input
                                        name="productSaleEndDate"
                                        onChange={handleChange}
                                        type="date"
                                        placeholder="Enter price"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <button
                                    onClick={handleAddProduct}
                                    className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
                                >
                                    Add Product
                                </button>
                            </form>
                        </div>

                        {/* Right: Products Table */}
                        <div className="rounded-xl border p-5">
                            <h2 className="mb-4 text-lg font-medium text-gray-700">
                                Product List
                            </h2>

                            <div className="overflow-x-auto">
                                {filterProducts.length === 0 ?
                                    <h2 className="text-center">No Data Available</h2> :
                                    <table className="w-full border-collapse text-sm">
                                        <thead>
                                            <tr className="bg-gray-100 text-left">
                                                <th className="border px-3 py-2"></th>
                                                <th className="border px-3 py-2">Serial</th>
                                                <th className="border px-3 py-2">Name</th>
                                                <th className="border px-3 py-2">Category</th>
                                                <th className="border px-3 py-2">Price</th>
                                                <th className="border px-3 py-2">Status</th>
                                                <th className="border px-3 py-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterProducts.map((product, index) => (
                                                <tr key={product._id}>
                                                    <td className="border px-3 py-2"><input checked={selectedRows.includes(product._id)} type="checkbox" onChange={() => handleCheckBoxChange(product._id)} /></td>
                                                    <td className="border px-3 py-2">{index + 1}</td>
                                                    <td className="border px-3 py-2">{product.productName}</td>
                                                    <td className="border px-3 py-2">{product.productCategoryName}</td>
                                                    <td className="border px-3 py-2">{product.productPrice}</td>
                                                    <td className="border px-3 py-2">{product.productStatus}</td>
                                                    <td className="border px-3 py-2 gap-2 justify-between">
                                                        <button onClick={() => handleDeleteProduct(product._id)} className="text-white px-4 py-2 rounded-xl bg-red-500 hover:underline">
                                                            Delete
                                                        </button>
                                                        <button
                                                            onClick={() => openModal(product._id)}
                                                            className="rounded-xl ml-2 bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                                                            Add Photos
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>}
                            </div>
                            <div className="flex space-x-2 my-2">
                                <div className="flex">
                                    <button onClick={() => handleChangeStatus("pending")} className="border p-3 cursor-pointer rounded-xl">Pending</button>
                                    <button onClick={() => handleChangeStatus("enable")} className="border mx-2 p-3 cursor-pointer rounded-xl">Enable</button>
                                    <button onClick={() => handleChangeStatus("disable")} className="border p-3 cursor-pointer rounded-xl">Disable</button>
                                </div>
                                <button className="bg-red-600 text-white rounded-xl p-4" onClick={handleDeleteProducts}>Delete Selected</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen === true ?
                <div className="fixed bg-glassy inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Upload Product Images</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="cursor-pointer text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <input onChange={(e) => handleFilesChange(e)} className="cursor-pointer border rounded-lg px-4 py-2 my-2 w-full" type="file" multiple name="productImages" id="" />

                        {/* Footer */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="cursor-pointer rounded-lg border px-4 py-2 hover:bg-gray-100">
                                Cancel
                            </button>
                            <button disabled={files.length === 0} onClick={handleUploadImages} className="enabled:cursor-pointer disabled:bg-gray-400 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                                Confirm
                            </button>
                        </div>

                    </div>
                </div> : ""
            }

        </>
    );
}
export default AddProduct
