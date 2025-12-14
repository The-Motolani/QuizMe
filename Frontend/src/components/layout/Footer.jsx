import '../../App.css'

export default function Footer() {
    return(
        <>
    {/* </>  <footer className=" flex mt-40 bg-blue-400 text-white text-sm justify-between text-left w-full"> */}
       <footer className="bg-gray-900 text-white py-12">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
    
    <div>
      <h2 className="text-2xl font-bold mb-4">QuizMe!</h2>
      <p className="text-gray-400">
        Fun, interactive quizzes to play, create, and learn—all from your browser.
      </p>
    </div>
    
    <div>
      <h3 clasNames="font-semibold mb-4">Features</h3>
      <ul className="space-y-2 text-gray-400">
        <li><a href="#" className="hover:text-white">Play Quizzes</a></li>
        <li><a href="#" className="hover:text-white">Create Quizzes</a></li>
        <li><a href="#" className="hover:text-white">Leaderboard & Challenges</a></li>
        <li><a href="#" className="hover:text-white">Learning Resources</a></li>
      </ul>
    </div>
    
    <div>
      <h3 className="font-semibold mb-4">Company</h3>
      <ul className="space-y-2 text-gray-400">
        <li><a href="#" className="hover:text-white">About Us</a></li>
        <li><a href="#" className="hover:text-white">Careers</a></li>
        <li><a href="#" className="hover:text-white">Blog</a></li>
        <li><a href="#" className="hover:text-white">Contact</a></li>
      </ul>
    </div>
    
    <div>
      <h3 className="font-semibold mb-4">Subscribe to our Newsletter</h3>
      <p className="text-gray-400 mb-3">Get the latest quizzes, updates, and tips delivered to your inbox.</p>
      <form className="flex flex-col sm:flex-row gap-2">
        <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded text-gray-900 w-full" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">Subscribe</button>
      </form>
    </div>
    
  </div>
  
  <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
    &copy; 2025 QuizMe!. All rights reserved.
  </div>
</footer>
        </>
    )
}