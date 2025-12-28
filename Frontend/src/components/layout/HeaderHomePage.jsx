import { useState } from "react";
import { FaBell, FaSignOutAlt, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import QuizMeLogo from "../../assets/images/QuizMeLogo";
import { UseAuth } from "../../utils/UseAuth";
import { getGreeting } from "../../utils/Greeting";
import { Link, useNavigate } from "react-router-dom";


export default function Header() {
  const {logout} = UseAuth();
  const [isOpen, setIsOpen] = useState(false);  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleMenu = () => setIsOpen(prev => !prev);


    const handleLogout = () => {
      logout();
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-md rounded-2xl p-4 max-w-7xl mx-auto mb-6 relative">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl"><QuizMeLogo/></span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        <span className="text-gray-700">{getGreeting()}</span>
        <FaBell className="text-gray-600 cursor-pointer" />

        <FaUserCircle
          onClick={toggleMenu}
          className="text-gray-600 cursor-pointer text-2xl"
        />
        {isOpen && (
          <div className="absolute bg-white border border-gray-300 shadow-xl p-4 right-0 mt-2 rounded-lg z-50">
            <ul className="flex flex-col gap-2">
              <li className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <Link to="/homepage">Home</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer text-red-600 flex items-center gap-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </li>
            </ul>
          </div>
        )}
      {/* </div> */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-200 text-red-700 px-3 py-1 rounded-full hover:bg-red-100 hover:shadow-md"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Mobile: Notification + Hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <FaBell className="text-gray-600 cursor-pointer" />

        <button onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <FaTimes className="text-2xl text-gray-600" />
          ) : (
            <FaBars className="text-2xl text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-2xl p-4 flex flex-col gap-2 z-40 md:hidden">
          <span className="text-gray-700">{getGreeting()}</span>
          <ul className="flex flex-col gap-2">
            <li className="px-4 py-2 hover:cursor-pointer list-none">Home</li>
            <li className="px-4 py-2 hover:cursor-pointer list-none">Profile</li>
            <li className="px-4 py-2 hover:cursor-pointer list-none">
              <a href="/dashboard">Dashboard</a>
            </li>
          </ul>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-200 text-red-700 px-3 py-1 rounded-full hover:bg-red-100 hover:shadow-md mt-2 mx-auto"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </header>
  );
}
