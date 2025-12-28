import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBell, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import QuizMeFavicon from "../assets/images/QuziMeFavicon";
import { UseAuth } from "../utils/UseAuth";
import { getGreeting } from "../utils/Greeting";
import { useRef } from "react";
import QuizCategories from "../components/layout/QuizCategories";
import JoinGameInput from "../components/common/JoinInputGame";
import toast from "react-hot-toast";
import Header from "../components/layout/HeaderHomePage";


export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const { logout } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)){
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Header */}
      <Header/>
      {/* <header className="flex justify-between items-center bg-white shadow-md rounded-2xl p-4 max-w-7xl mx-auto mb-6">
        <div className="flex items-center gap-2">
          <QuizMeFavicon />
        </div>

        

        <div className="flex items-center gap-4">
          <span className="text-gray-700">{getGreeting()}</span>
          <FaBell className="text-gray-600 cursor-pointer" />
          <FaUserCircle 
          onClick={toggleMenu}
          className="text-gray-600 cursor-pointer text-2xl" 
          />
          {isOpen && (
            <div className="absolute bg-white border border-[#ccc] shadow-xl p-4 right-0 mt-2 rounded-lg">
              <ul>
                <li className="px-4 py-2 hover:cursor-pointer">Home</li>
                <li className="px-4 py-2 hover:cursor-pointer">Profile</li>
               <a href="dashboard"> <li className="px-4 py-2 hover:cursor-pointer">Dashboard</li></a>
              </ul>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-200 text-red-700 px-3 py-1 rounded-full hover:bg-red-100 hover:shadow-md"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

         <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <FaTimes className="text-2xl text-gray-600" />
          ) : (
            <FaBars className="text-2xl text-gray-600" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-2xl p-4 flex flex-col gap-2 md:hidden z-40">
          <span className="text-gray-700">{getGreeting()}</span>
          <FaBell className="text-gray-600 cursor-pointer" />
          <div className="flex flex-col gap-2">
            <li className="px-4 py-2 hover:cursor-pointer list-none">Home</li>
            <li className="px-4 py-2 hover:cursor-pointer list-none">Profile</li>
            <a href="dashboard">
              <li className="px-4 py-2 hover:cursor-pointer list-none">Dashboard</li>
            </a>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-200 text-red-700 px-3 py-1 rounded-full hover:bg-red-100 hover:shadow-md mt-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
      </header> */}

      {/* Main content */}
      <main>
        <JoinGameInput/>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dashboard Cards */}
        
        <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-teal-600">My Quizzes</h2>
          <p className="text-gray-500 text-center">
            View and manage the quizzes you've created or enrolled in.
          </p>
          <Link
            to="/my-quizzes"
            className="bg-slate-200 py-2 px-6 rounded-full font-semibold hover:bg-white hover:shadow-md"
          >
            Go
          </Link>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-teal-600">Leaderboard</h2>
          <p className="text-gray-500 text-center">
            Check your ranking and see top performing users.
          </p>
          <Link
            to="/leaderboard"
            className="bg-slate-200 py-2 px-6 rounded-full font-semibold hover:bg-white hover:shadow-md"
          >
            View
          </Link>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-teal-600">Profile</h2>
          <p className="text-gray-500 text-center">
            Update your account information and settings.
          </p>
          <Link
            to="/profile"
            className="bg-slate-200 py-2 px-6 rounded-full font-semibold hover:bg-white hover:shadow-md"
          >
            Edit
          </Link>
        </div>

        </div>


        {/* Quiz Categories Card */}
        <QuizCategories />
        
        </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} QuizMe. All rights reserved.
      </footer>
    </div>
  );
}
