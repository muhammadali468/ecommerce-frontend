const Loader = () => {
    return (
        <div className="absolute z-50 bg-glassy h-full w-full top-0 left-0 flex items-center justify-center">
            <span className="animate-spin">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#50A2FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
            </span>
        </div>
    )
}

export default Loader