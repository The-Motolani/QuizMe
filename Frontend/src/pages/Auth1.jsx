import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import QuizMeFavicon from "../assets/images/QuziMeFavicon";
import { loginUser } from "../services/api";
import { AuthProvider, UseAuth } from "../utils/UseAuth";
import { toast } from 'react-hot-toast';


export default function Auth() {
  const {login} = UseAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ identifier: "", password: "" });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => (
      { ...prevData, 
        [name]: value 
      }
    ));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await loginUser(formData);
    console.log("Login response:", response);
    const { user, tokens } = response;

    if (!tokens?.access) {
      toast.error("Invalid username or password");
      return;
    }

    // Store tokens
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);

    // Store user in auth context
    login(user);
    toast.success('Logged in successfully');

    navigate("/homepage");
  } catch (err) {
    const message =
      err.response?.data?.detail ||
      err.response?.data?.error ||
      "Login failed! Please try again.";

    toast.error(message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Login Form */}
        <div className="w-full w-3/5 p-8 sm:p-12 bg-blue-100 flex flex-col items-center">
        <QuizMeFavicon className=""/>
          <h2 className="text-3xl font-bold text-rose-300 mb-2 font-[Baloo]">Log In</h2>
          <div className="border-2 w-12 rounded-full border-yellow-100 mb-6"></div>

          <div className="flex gap-4 mb-4">
            <a href="#" className="border rounded-full p-3 hover:shadow-md hover:border-gray-500">
              <FaFacebookF className="text-sm" />
            </a>
            <a href="#" className="border rounded-full p-3 hover:shadow-md hover:border-gray-500">
              <FaLinkedinIn className="text-sm" />
            </a>
            <a href="#" className="border rounded-full p-3 hover:shadow-md hover:border-gray-500">
              <FaGoogle className="text-sm" />
            </a>
          </div>

          <p className="text-gray-500 mb-4 text-center">or log in using your Username or Email</p>

          <form className="w-full flex flex-col items-center gap-4" onSubmit={handleSubmit}>
            <div className="bg-gray-100 w-full max-w-xs p-2 flex items-center gap-2 rounded-md">
              <FaRegEnvelope className="text-gray-400 m-2" />
              <input
                type="text"
                name="identifier"
                placeholder="Email or Username"
                value={formData.identifier}
                onChange={handleChange}
                className="outline-none flex-1 p-2"
                required
              />
            </div>

            <div className="bg-gray-100 w-full max-w-xs p-2 flex items-center gap-2 rounded-md">
              <MdLockOutline className="text-gray-400 m-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="outline-none flex-1 p-2"
                required
              />
            </div>

            <div className="flex w-full max-w-xs justify-between items-center text-sm text-gray-500 mt-2">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="cursor-pointer" /> Remember me
              </label>
              <Link to="/forgotPassword" className="hover:text-gray-700"  >Forgot Password?</Link>
            </div>
                
            <button
              type="submit"
              className="
              w-full max-w-xs 
              bg-slate-200 
              text-gray-700 
              py-2
              sm:mx-9
              rounded-full 
              font-semibold
               hover:bg-white hover:shadow-md mt-4"
            >
              Sign In
            </button>
             {/* Mobile only */}
        <div className="lg:hidden text-center mt-6 text-slate-600 bg-blue-100">
        
        <Link to="/signup" className="text-teal-600 font-medium underline">
           <p className="text-sm font-semibold">Don't have an account?</p>
        </Link>
        </div>
          </form>
        </div>

        {/* Right Side: Sign Up Prompt */}
        <div className="hidden w-full lg:w-2/5 bg-teal-100 text-slate-500 lg:flex flex-col justify-center items-center p-8 sm:p-12">
          <QuizMeFavicon/>
          <div className="border-2 w-12 rounded-full border-yellow-100 mb-4"></div> 
           <h3 className="text-xl font-bold">don't have an account?</h3>
          <Link to="/signup" className="mt-6 w-full max-w-xs">
            <p className="text-center border-2 border-white rounded-full py-2 font-semibold hover:bg-white hover:shadow-md cursor-pointer">
              Sign Up
            </p>
          </Link>
         </div>
      </div>
    </div>
  );
}
