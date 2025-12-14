import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope, FaUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import QuizMeFavicon from "../assets/images/QuziMeFavicon";
import { registerUser } from "../services/api";
import { showError } from "../utils/showError";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
        setError("Passwords  do not match")
      return;
    }

    try {

    const response = await registerUser(formData);
     if (response?.id || response?.username) {
        navigate("/login");
      } else {
        setError("Signup failed");
      }
    } catch {
      setError("Signup error");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl flex flex-col lg:flex-row overflow-hidden">

        {/* Left Side: Sign Up Form */}
        <div className="w-full lg:w-3/5 p-8 sm:p-12 bg-blue-100 flex flex-col items-center">
          <QuizMeFavicon />

          <h2 className="text-3xl font-bold text-rose-300 mb-2 font-[Baloo]">
            Create Account
          </h2>
          <div className="border-2 w-12 rounded-full border-yellow-100 mb-6"></div>

          <div className="flex gap-4 mb-4">
            <a className="border rounded-full p-3 hover:shadow-md hover:border-gray-500">
              <FaFacebookF className="text-sm" />
            </a>
            <a className="border rounded-full p-3 hover:shadow-md hover:border-gray-500">
              <FaLinkedinIn className="text-sm" />
            </a>
            <a className="border rounded-full p-3 hover:shadow-md hover:border-gray-500">
              <FaGoogle className="text-sm" />
            </a>
          </div>

          <p className="text-gray-500 mb-4 text-center">
            or sign up using your email
          </p>

          <form
            className="w-full flex flex-col items-center gap-4"
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <div className="bg-gray-100 w-full max-w-xs p-2 flex items-center gap-2 rounded-md">
              <FaUser className="text-gray-400 m-2" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="outline-none flex-1 p-2"
                required
              />
            </div>

            {/* Email */}
            <div className="bg-gray-100 w-full max-w-xs p-2 flex items-center gap-2 rounded-md">
              <FaRegEnvelope className="text-gray-400 m-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="outline-none flex-1 p-2"
                required
              />
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="bg-gray-100 w-full max-w-xs p-2 flex items-center gap-2 rounded-md">
              <MdLockOutline className="text-gray-400 m-2" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="outline-none flex-1 p-2"
                required
              />
            </div>
             {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="
                w-full max-w-xs 
                bg-slate-200 
                text-gray-700 
                py-2
                rounded-full 
                font-semibold 
                hover:bg-white 
                hover:shadow-md 
                mt-4
              "
            >
              Sign Up
            </button>

            {/* Mobile only */}
            <div className="lg:hidden text-center mt-6 text-slate-600">
              <p className="text-sm">
                Already have an account?
                <Link to="/login" className="text-teal-600 font-medium underline ml-1">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right Side: Login Prompt (Desktop only) */}
        <div className="hidden lg:flex lg:w-2/5 bg-teal-100 text-slate-500 flex-col justify-center items-center p-8 sm:p-12">
          <QuizMeFavicon />
          <div className="border-2 w-12 rounded-full border-yellow-100 mb-4"></div>
          <h3 className="text-xl font-bold">Already have an account?</h3>

          <Link to="/auth" className="mt-6 w-full max-w-xs">
            <p className="text-center border-2 border-white rounded-full py-2 font-semibold hover:bg-white hover:shadow-md cursor-pointer">
              Log In
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

