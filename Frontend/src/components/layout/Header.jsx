import { VscArrowSmallRight } from "react-icons/vsc";
import '../../App.css'
import { Link } from 'react-router-dom';
import { VscChevronDown } from "react-icons/vsc";
import QuizMeLogo from '../../assets/images/QuizMeLogo';
import Button from '../common/Button'
import { FcSearch } from "react-icons/fc";

export default function Header() {
    return (
        <>
    <header className="relative flex justfiy-between gap-200 items-center mx-20 mt-4 mb-6">
      <QuizMeLogo/> 
      <div className="flex lg:gap-10">
      <div className=" items-center flex">
      <FcSearch className="bg-grey-600 rounded h-8 w-10 rounded p-6px m-2px rounded hover:cursor-pointer"/>
      </div>
      <Link to ="auth">
      <button className="w-full font-bold font-sans whitespace-nowrap border-2 py-2 shadow-2xl drop-shadow-md rounded-full 
        hover:bg-[#087E84] 
        bg-gradient-to-r from-teal-500 via-teal-400 via-teal-500 to-teal-700 py-1.5 px-3 text-center text-black 
        transition-transform 
        duration-300 
        before:bg-gradient-to-r from-[#FFFFFFCC] to-[#FFFFFF00] 
        before:block before:contents-[''] before:absolute before:left-[10px] before:right-[10px] before:top-[5px] before:h-[5px] before:transform before:scale-105 before:rounded-xl outline-[#087ea4] decoration-solid transform-3d cursor-pointer
        hover:scale-105 hover:shadow-3xl text-xl
        "
        >
        Log In
        </button>
      </Link>
      </div>

    </header>
        </>
    )
}