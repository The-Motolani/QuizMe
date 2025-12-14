import { VscArrowSmallRight, VscChevronDown } from "react-icons/vsc";
import '../../App.css';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuizMeLogo from '../../assets/images/QuizMeLogo';
import Button from '../common/Button';
import { FcSearch } from "react-icons/fc";
import Doughnut from '../../assets/images/doughnut.jpg';

export default function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative items-center mx-20 mt-4 mb-3" ref={menuRef}>
      <div className="flex justify-between mb-4">
        <QuizMeLogo />

        <div className="bg-pink-100 gap-1 flex rounded-3xl items-center border-2 px-4 py-2">
          <p className="z-1 text-3xl font-[Baloo] px-5 whitespace-nowrap">
            Join Game! Enter a code:
          </p>
          <input
            type="number"
            placeholder="012-456"
            className="py-2 w-40 outline-none font-bold text-xl font-[Baloo]"
          />
        </div>

        <div className="my-6 ml-4 relative">
          <img
            src={Doughnut}
            alt="user image"
            onClick={toggleMenu}
            className="rounded-full h-10 w-10 border-2 border-pink-100 shadow-xl hover:cursor-pointer hover:shadow-3xl"
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
        </div>
      </div>
      <hr className="border-blue-100 mx-15 mb-4" />
    </header>
  );
}
