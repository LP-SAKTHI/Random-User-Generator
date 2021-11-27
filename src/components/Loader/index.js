




const Loader = () => {
    return (
        <>
        <div className = "fixed inset-0 bg-black z-20 flex justify-center items-center">
            <div className="w-24 h-24 border-white-500 border-solid border-16 rounded-full loader-top-border animate-spin">
            <div className = "w-20 h-20 border-white-500 border-solid border-1 rounded-full loader-top-border animate-spin"></div>
        
            </div>
        </div>
        </>
    )
}

export default Loader
