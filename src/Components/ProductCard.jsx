const ProductCard = ({ id, image, name, price, salePrice }) => {
  const handleAddtoCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex(item => item.id === id)
    if (index > -1) {
      cart[index].quantity += 1;
    }
    else {
      cart.push({ _id: id, quantity: 1, name, image })
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Product Added to cart!");
  }
  // const handleAddtoFavorate=()=>{
  //   const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  // }
  return (
    <div key={id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="h-56 w-full">
        <a href="#">
          <img className="mx-auto h-full mix-blend-multiply" src={image} alt="" />
          {/* <img className="mx-auto hidden h-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg" alt="" /> */}
        </a>
      </div>

      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex">
            <svg width="20" height="20" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 17h9a.499.499 0 1 1 0 1h-9a.499.499 0 1 1 0-1m4.5 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 1c.558 0 1 .442 1 1s-.442 1-1 1-1-.442-1-1 .442-1 1-1m0-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 1c.558 0 1 .442 1 1s-.442 1-1 1-1-.442-1-1 .442-1 1-1M25 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 1c.558 0 1 .442 1 1s-.442 1-1 1-1-.442-1-1 .442-1 1-1M.446 15.67a1.505 1.505 0 0 0 0 2.124l11.76 11.76c.58.582 1.542.587 2.123 0L28.855 14.85c.247-.25.532-.48.768-.856.235-.376.376-.87.376-1.544V1.5c0-.823-.678-1.5-1.5-1.5h-11c-1.158 0-1.824.624-2.35 1.145zm.703.712L15.85 1.856C16.383 1.33 16.658 1 17.5 1h11c.285 0 .5.214.5.5v10.952c0 .547-.093.805-.224 1.013-.13.21-.344.394-.63.684l-14.53 14.7c-.197.2-.5.2-.703-.002l-11.76-11.76a.487.487 0 0 1-.004-.706z" /></svg>
            <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs  text-primary-800 dark:bg-primary-900 dark:text-primary-300"> {Math.floor(100 - salePrice / price * 100)}% Discount</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <button type="button" data-tooltip-target="tooltip-quick-look-2" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only"> Quick look </span>
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
            <div id="tooltip-quick-look-2" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm  text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
              Quick look
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>

            <button type="button" data-tooltip-target="tooltip-add-to-favorites-2" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only"> Add to Favorites </span>
              <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
              </svg>
            </button>
            <div id="tooltip-add-to-favorites-2" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm  text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
              Add to favorites
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>
          </div>
        </div>

        <a href="#" className="text-lg  leading-tight text-gray-900 hover:underline ">{name}</a>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

            <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

            <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

            <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

            <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>
          </div>

          <p className="text-sm  text-gray-900 ">4.9</p>
          <p className="text-sm  text-gray-500 dark:text-gray-400">(1,233)</p>
        </div>

        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
            <p className="text-sm  text-gray-500 dark:text-gray-400">Best Seller</p>
          </li>

          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
            <p className="text-sm  text-gray-500 dark:text-gray-400">Best Price</p>
          </li>
        </ul>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl  leading-tight text-gray-900 ">{price} PKR</p>

          <button
            onClick={handleAddtoCart}
            type="button" className="whitespace-nowrap bg-blue-600 text-white cursor-pointer inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm  border  hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>

  );
};

export default ProductCard;
