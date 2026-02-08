import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../Components/ProductCard"

const UserHome = () => {
  const [products, setProducts] = useState([]) 
  const handleFetchProducts = async () => {
    const res = await axios.get("https://ecommerce-backend-production-b154.up.railway.app/api/products/get");
    if (res) {
      setProducts(res.data.product);
    }
  }
  useEffect(() => {
    handleFetchProducts()
  }, [])
  return (
    <div>
      <h1>Welcome user</h1>
      <h2>All Products</h2>
      <div className="grid grid-cols-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            image={"https://ecommerce-backend-production-b154.up.railway.app/products/"+product.productThumbnailImg}
            name={product.productName}
            price={product.productPrice}
            salePrice={product.productSalePrice}
          />
        ))}
      </div>
    </div>
  )
}

export default UserHome