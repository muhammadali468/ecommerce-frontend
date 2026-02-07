import { Link } from "react-router-dom"
import Navbar from "./Components/Navbar"
const Home = () => {
  return (
    <>
      <Navbar />
      <section className="bg-white py-8 antialiased md:py-20">
        <div className="mx-auto grid max-w-7xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
          <div className="content-center justify-self-start md:col-span-7 md:text-start">
            <h1 className="mb-4 text-4xl inter-tight-bold leading-none tracking-tight  md:max-w-3xl md:text-5xl xl:text-6xl">Welcome to E-Commerce Site!<br />Up to 50% OFF!</h1>
            <p className="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">Don't Wait - Limited Stock at Unbeatable Prices!</p>
            <div className="flex gap-4">
              <Link to="/shop" className="bg-blue-600 text-black border-black inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium text-white hover:bg-primary-800 dark:border dark:border-white focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Shop Now</Link>
              {/* <Link to="/categories" className="bg-[#95BDD8] border-black inline-block rounded-lg bg-primary-700 px-6 py-3.5 text-center font-medium text-white hover:bg-primary-800 dark:border dark:border-white focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Browser Categories
              </Link> */}
            </div>
          </div>
          <div className="hidden md:col-span-5 md:mt-0 md:flex">
            <img className="dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg" alt="shopping illustration" />
            <img className="hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg" alt="shopping illustration" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home