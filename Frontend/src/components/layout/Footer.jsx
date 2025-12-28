import "../../App.css";
import QuizMeLogo from "../../assets/images/QuizMeLogo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <QuizMeLogo />
          <p className="text-gray-400 text-sm leading-relaxed">
            Fun, interactive quizzes to play, create, and learn all from your browser.
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold mb-4">Features</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Play Quizzes</a></li>
            <li><a href="#" className="hover:text-white">Create Quizzes</a></li>
            <li><a href="#" className="hover:text-white">Leaderboard & Challenges</a></li>
            <li><a href="#" className="hover:text-white">Learning Resources</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="font-semibold">Subscribe to our Newsletter</h3>
          <p className="text-gray-400 text-sm">
            Get the latest quizzes, updates, and tips delivered to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full
                px-4
                py-2.5
                rounded-lg
                bg-gray-800
                text-white
                border
                border-gray-600
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                placeholder-gray-400
              "
            />

            <button
              type="submit"
              className="
                bg-blue-600
                hover:bg-blue-700
                px-5
                py-2.5
                rounded-lg
                text-sm
                font-medium
                whitespace-nowrap
              "
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
         &copy; {new Date().getFullYear()} QuizMe. All rights reserved.
      </div>
    </footer>
  );
}
