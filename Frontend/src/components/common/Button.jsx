import '../../App.css'

export default function button({children, className = "", ...props }) {
    return(
        <>
        <button type="button" className={`w-full whitespace-nowrap border-2 py-2 shadow-2xl drop-shadow-md rounded-full 
        bg-[#087E84] linear-gradient( #6bacafff, #11979eff, #087E84, #054c50ff) py-1.5 px-3 text-center text-black 
        transition-all duration-150 ease-out outline-[#087ea4] decoration-solid transition-[] ${className}`}
        {...props}
        >
            {children}
        </button>
        </>
    ); 
}