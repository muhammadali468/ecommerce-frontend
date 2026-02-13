import { Link, useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import axios from "axios";

const CheckOut = () => {
    const userName = localStorage.getItem("user_name")
    const userEmail = localStorage.getItem("user_email")
    const userToken = localStorage.getItem("user_token")
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
    const [productIds, setProductIds] = useState(cartItems.map(item => item._id))
    const [priceValidatedProducts, setPriceValidatedProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [deliveryCharges, setDeliveryCharges] = useState(0);
    const BASE_URL = window.location.hostname === "localhost" ? import.meta.env.VITE_APP_LOCAL_BASE_URL : import.meta.env.VITE_APP_DEV_BASE_URL
    const [checkoutData, setCheckoutData] = useState({
        customerName: userName ? userName : "",
        customerEmail: userEmail ? userEmail : "",
        customerPhone: "",
        customerAddress: "",
        paymentMethod: "",
        products: cartItems.map(({ _id, quantity }) => ({ _id, quantity })),
        totalAmount: 0,
        deliveryType: "",
    })
    useEffect(() => {
        if (!checkoutData.deliveryType) return;
        const charges = checkoutData.deliveryType === "normal" ? 500 : 1000;
        setDeliveryCharges(charges);
    }, [checkoutData.deliveryType]);

    const handlePlaceOrder = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const orderPlaced = await axios.post(`${BASE_URL}/api/user/order`, checkoutData,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            setLoading(false)
            if(orderPlaced.status === 401){
                navigate("/user/login")
            }
            if (orderPlaced.data.sts === 0) {
                alert(`Thanks for placing order with us, this is your order id : ${orderPlaced.data.orderId}`)
                navigate("/shop")
            }
        } catch (error) {
            setLoading(false)
            // navigate("/user/login")
            console.log(error)
        }
    }
    useEffect(() => {
        if (!userToken) {
            navigate("/user/login")
        }
    }, [])
    useEffect(() => {
        console.log(checkoutData)
    }, [checkoutData])

    useEffect(() => {
        const handleFetchPrice = async () => {
            setLoading(true)
            const fetchPrice = await axios.post(`${BASE_URL}/api/public/calculateProductPrice`, { productIds });
            const fetchedPrices = fetchPrice.data.products
            console.log(fetchPrice.data)
            setPriceValidatedProducts(fetchedPrices);
            console.log(fetchedPrices)
            setLoading(false)
        }
        handleFetchPrice()
    }, [productIds])
    useEffect(() => {
        if (cartItems.length === 0) {
            alert("Please Add product(s) to your cart first!")
            navigate("/shop")
        }
        localStorage.setItem("cart", JSON.stringify(cartItems))
        console.log(cartItems)
        // total amount calculation
        const total = priceValidatedProducts.length > 0 ? priceValidatedProducts.reduce((sum, item) => {
            const cartItem = cartItems.find(product => product._id === item._id);
            return sum + item.price * (cartItem?.quantity || 0)
        }, 0) : 0;
        console.log(total)
        setCheckoutData(prev => ({
            ...prev,
            totalAmount: total + deliveryCharges
        }))

    }, [cartItems, priceValidatedProducts, deliveryCharges])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCheckoutData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <>
            {loading ? <Loader /> : ""}
            <Navbar />
            <section className="bg-white py-8 md:py-20 px-4 sm:px-16">
                <form action="#" className="mx-auto max-w-7xl px-4 2xl:px-0">
                    <ol className="items-center flex justify-between w-max max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                        <li className=" flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700">
                            <Link to="/cart" className="flex items-center after:text-gray-200">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Cart
                            </Link>
                        </li>
                        <svg className="mx-2" height="12" width="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve"><path d="m6.8 23.7-1.4-1.4L15.7 12 5.4 1.7 6.8.3 18.5 12z" /></svg>
                        <li className=" flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 text-black">
                            <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Checkout
                            </span>
                        </li>


                    </ol>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 ">Delivery Details</h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label for="customerName" className="mb-2 block text-sm font-medium text-gray-900 "> Your name </label>
                                        <input onChange={handleChange} value={checkoutData.customerName} type="text" name="customerName" id="customerName" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600   dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                    </div>

                                    <div>
                                        <label for="customerEmail" className="mb-2 block text-sm font-medium text-gray-900 "> Your email* </label>
                                        <input onChange={handleChange} value={checkoutData.customerEmail} type="email" name="customerEmail" id="customerEmail" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600   dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />
                                    </div>
                                    <div className="">
                                        <label for="customerPhone" className="mb-2 block text-sm font-medium text-gray-900 "> Phone Number* </label>
                                        <input onChange={handleChange} value={checkoutData.customerPhone} type="text" name="customerPhone" id="customerPhone" className="z-20 rounded-lg block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700    dark:placeholder:text-gray-400 dark:focus:border-primary-500" placeholder="+92-3012345678" required />
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mb-2 flex items-center gap-2">
                                            <label for="customerAddress" className="block text-sm font-medium text-gray-900 "> Address* </label>
                                        </div>
                                        <textarea onChange={handleChange} rows={4} type="text" name="customerAddress" id="customerAddress" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600   dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="name@flowbite.com" required />

                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 ">Payment</h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input name="paymentMethod" onChange={handleChange} value="COD" id="credit-card" aria-describedby="credit-card-text" type="radio" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600  dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                            </div>
                                            <div className="ms-4 text-sm">
                                                <label for="credit-card" className="font-medium leading-none text-gray-900 ">COD (Cash on delivery)</label>
                                                <p id="credit-card-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay at the time of delivery</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 ">Delivery Methods</h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input onChange={handleChange} type="radio" name="deliveryType" value="normal" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600  dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                            </div>
                                            <div className="ms-4 text-sm">
                                                <label for="dhl" className="font-medium leading-none text-gray-900 "> 500 PKR - Normal Delivery </label>
                                                <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get in few days</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input onChange={handleChange} type="radio" name="deliveryType" value="priority" className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600  dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                            </div>
                                            <div className="ms-4 text-sm">
                                                <label for="dhl" className="font-medium leading-none text-gray-900 "> 1000 PKR - Priority Delivery </label>
                                                <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Get in one day</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flow-root">
                                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-200">
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Subtotal</dt>
                                        <dd className="text-base font-medium text-gray-900 ">{priceValidatedProducts.length > 0 ? (priceValidatedProducts).reduce((sum, item) => sum + item.price * (cartItems.find((product) => product._id === item._id)?.quantity), 0) : ""} PKR</dd>
                                    </dl>


                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery Charges</dt>
                                        <dd className="text-base font-medium text-gray-900 ">{deliveryCharges} PKR</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-bold text-gray-900 ">Total</dt>
                                        <dd className="text-base font-bold text-gray-900 ">{checkoutData.totalAmount} PKR</dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <button onClick={handlePlaceOrder} type="submit" className="cursor-pointer flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Place Order</button>
                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Sign in or create an account now.</a>.</p>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default CheckOut