import { Link } from "react-router-dom";
import QuizMeFavicon from "../assets/images/QuziMeFavicon";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <QuizMeFavicon />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-[Baloo] text-teal-600 mb-2">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Page not found
        </h2>

        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist
          or hasn’t been launched yet.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button
              className="
                bg-gradient-to-r from-teal-500 via-teal-400 to-teal-600
                text-black
                font-semibold
                px-6 py-2.5
                rounded-full
                shadow-md
                hover:shadow-lg
                hover:scale-105
                transition
              "
            >
              Go Home
            </button>
          </Link>

          <Link to="/dashboard">
            <button
              className="
                bg-pink-100
                text-teal-700
                font-semibold
                px-6 py-2.5
                rounded-full
                hover:bg-pink-200
                transition
              "
            >
              Dashboard
            </button>
          </Link>
        </div>

        {/* Subtle hint */}
        <p className="text-xs text-gray-400 mt-6">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </main>
  );
}
