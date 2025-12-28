// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaBell, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
// import QuizMeFavicon from "../../assets/images/QuziMeFavicon";
// import QuizMeLogo from "../../assets/images/QuizMeLogo";
// import { getGreeting } from "../../utils/Greeting";
// import { UseAuth } from "../../utils/UseAuth";

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//    const { logout } = UseAuth();

//   const toggleMenu = () => setIsOpen(prev => !prev);
//   const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  
// const handleLogout = () => {
//     logout();
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     navigate("/login");
//   };

//   return (
//     <header className="relative bg-white shadow-md rounded-2xl p-4 max-w-7xl mx-auto mb-6 flex justify-between items-center">
//       {/* Logo */}
//       <div className="flex items-center gap-2">
//         <QuizMeLogo/>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex items-center gap-4 relative">
//         <span className="text-gray-700">{getGreeting()}</span>
//         <FaBell className="text-gray-600 cursor-pointer" />
//         <FaUserCircle
//           onClick={toggleMenu}
//           className="text-gray-600 cursor-pointer text-2xl"
//         />
//         {isOpen && (
//           <div className="absolute bg-white border border-gray-300 shadow-xl p-4 right-0 mt-2 rounded-lg z-50">
//             <ul className="flex flex-col gap-2">
//               <li className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
//                 <Link to="/homepage">Home</Link>
//               </li>
//               <li className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
//                 <Link to="/profile">Profile</Link>
//               </li>
//               <li className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer">
//                 <Link to="/dashboard">Dashboard</Link>
//               </li>
//               <li
//                 className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer text-red-600 flex items-center gap-2"
//                 onClick={handleLogout}
//               >
//                 <FaSignOutAlt /> Logout
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* Mobile Hamburger */}
//       <div className="md:hidden flex items-center gap-4">
//          <FaBell className="text-gray-600 cursor-pointer" />
//         <button onClick={toggleMobileMenu}>
//           {mobileMenuOpen ? (
//             <FaTimes className="text-2xl text-gray-600" />
//           ) : (
//             <FaBars className="text-2xl text-gray-600" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-2xl p-4 flex flex-col gap-3 md:hidden z-40">
//           <span className="text-gray-700">{getGreeting()}</span>
//           {/* <FaBell className="text-gray-600 cursor-pointer" /> */}

//           <ul className="flex flex-col gap-2">
//             <li className="px-4 py-2 hover:bg-gray-100 rounded">
//               <Link to="/homepage" onClick={() => setMobileMenuOpen(false)}>Home</Link>
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 rounded">
//               <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 rounded">
//               <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
//             </li>
//             <li
//               className="px-4 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-red-600"
//               onClick={() => {
//                 handleLogout();
//                 setMobileMenuOpen(false);
//               }}
//             >
//               <FaSignOutAlt /> Logout
//             </li>
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// }

import { useState, useRef } from "react";
import { FaBell, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { updateProfilePicture } from "../../services/api"
import toast from "react-hot-toast";
import QuizMeLogo from "../../assets/images/QuizMeLogo";
import { UseAuth } from "../../utils/UseAuth";
import { getGreeting } from "../../utils/Greeting";
import DefaultUser from "../../assets/images/doughnut.jpg"


export default function Header({ handleLogout, user }) {
    const isAuthenticated = UseAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.user_profile?.profile_picture || "/default-avatar.png");
  const fileInputRef = useRef(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const res = await updateProfilePicture(file);
        setAvatarUrl(res.profile_picture);
      } catch (err) {
        console.error(err);
      }
    }
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

        <img
          src={avatarUrl || {DefaultUser}}
          alt="User"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

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

          <img
            src={avatarUrl || "/default-avatar.png"}
            alt="User"
            className="w-12 h-12 rounded-full cursor-pointer mx-auto my-2"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

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
