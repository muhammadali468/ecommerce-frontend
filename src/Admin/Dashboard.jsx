import { useState } from "react";

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState(null);

    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPrice, setProductPrice] = useState("");

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
            <div className="flex items-center mb-6">
                <h1 className="text-3xl">Logo</h1>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
                <div className="shadow bg-white col-span-1 rounded-2xl p-4">
                    <ul className="flex flex-col space-y-2">
                        <li>
                            Orders (Coming Soon)
                        </li>
                        <li>
                            Add Category
                        </li>
                        <li>Add Product</li>
                    </ul>
                </div>
                <div className="gap-6 col-span-4">
                    {/* Add Category */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
                        <form onSubmit={handleAddCategory} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Category Name"
                                className="w-full border rounded px-3 py-2"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full"
                                onChange={(e) => setCategoryImage(e.target.files[0])}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add Category
                            </button>
                        </form>

                        {/* Category List */}
                        {categories.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Categories:</h3>
                                <ul>
                                    {categories.map((cat) => (
                                        <li key={cat.id} className="flex items-center gap-2 mb-2">
                                            <img
                                                src={cat.image}
                                                alt={cat.name}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                            <span>{cat.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Add Product */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="w-full border rounded px-3 py-2"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Price"
                                className="w-full border rounded px-3 py-2"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Add Product
                            </button>
                        </form>

                        {/* Product List */}
                        {products.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Products:</h3>
                                <ul>
                                    {products.map((prod) => (
                                        <li key={prod.id}>
                                            {prod.name} - {prod.category} - ${prod.price}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
