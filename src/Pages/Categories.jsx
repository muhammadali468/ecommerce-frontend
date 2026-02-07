import { useState, useEffect } from "react"
import Navbar from "../Components/Navbar"
import { Link } from "react-router-dom"
import axios from "axios"

const Categories = () => {

    const [categoriesData, setCategoriesData] = useState([])
    const handleViewAllCategories = async () => {
        const allCat = await axios.get("http://localhost:5000/api/category/viewAll")
        setCategoriesData(allCat.data.cat)
    }
    useEffect(() => {
        handleViewAllCategories()
    }, [])

    return (
        <>
            <Navbar />
            <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-7xl px-4 2xl:px-0">
                    <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
                        <h2 className="text-xl  text-gray-900 dark:text-white sm:text-2xl">Shop by category</h2>

                        {/* <a href="#" title="" className="flex items-center text-base  text-primary-700 hover:underline dark:text-primary-500">
                            See more categories
                            <svg className="ms-1 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                            </svg>
                        </a> */}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {categoriesData.map((category) => (
                            <Link key={category._id} to="#" className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".34" d="M5 10h2q3 0 3-3V5q0-3-3-3H5Q2 2 2 5v2q0 3 3 3" stroke="#292d32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M17 10h2q3 0 3-3V5q0-3-3-3h-2q-3 0-3 3v2q0 3 3 3" stroke="#292d32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path opacity=".34" d="M17 22h2q3 0 3-3v-2q0-3-3-3h-2q-3 0-3 3v2q0 3 3 3" stroke="#292d32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /><path d="M5 22h2q3 0 3-3v-2q0-3-3-3H5q-3 0-3 3v2q0 3 3 3" stroke="#292d32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                                <span className="text-sm text-gray-900 dark:text-white capitalize">{category.cat_name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Categories