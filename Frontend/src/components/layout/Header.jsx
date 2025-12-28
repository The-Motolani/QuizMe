import { useState } from "react";
import { Link } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { FaBars, FaTimes } from "react-icons/fa";
import QuizMeLogo from "../../assets/images/QuizMeLogo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md">
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-4
          flex items-center justify-between
          relative
        "
      >
        {/* Logo */}
        <QuizMeLogo />

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* <button aria-label="Search">
            <FcSearch className="h-8 w-8 cursor-pointer hover:scale-105 transition" />
          </button> */}

          <Link to="login">
            <button
              className="
                relative
                whitespace-nowrap
                font-bold
                text-lg
                px-6 py-2
                rounded-full
                border-2
                shadow-2xl
                drop-shadow-md

                bg-gradient-to-r
                from-teal-500
                via-teal-400
                to-teal-700

                text-black
                hover:scale-105
                hover:shadow-3xl
                transition-transform
              "
            >
              Log In
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl text-teal-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="
            md:hidden
            bg-pink-50
            shadow-lg
            border-t
            border-pink-100
            px-4 py-5
            flex flex-col gap-4
            animate-slideDown
          "
        >
          {/* <button className="flex items-center gap-2">
            <FcSearch className="h-6 w-6" />
            <span className="text-gray-700 font-semibold">Search</span>
          </button> */}

          <Link to="login" onClick={() => setMobileOpen(false)}>
            <button
              className="
                w-full
                font-bold
                py-3
                rounded-full
                bg-gradient-to-r
                from-teal-500
                via-teal-400
                to-teal-700
                shadow-md
                hover:shadow-xl
              "
            >
              Log In
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
