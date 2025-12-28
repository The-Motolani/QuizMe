// import React from "react";
// import Game from "../../assets/images/andrey.jpg";
// import StartQuiz from "../../assets/images/PastelQuiz.jpg";
// import Template from "../../assets/images/PastelTemp.jpg";

// export default function Hero() {
//   return (
//     <main className="bg-pink-50 py-20">
//       <div className="max-w-7xl mx-auto px-6 md:px-12 font-[charis]">

//         {/* Hero Top Section */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
//           {/* Text */}
//           <div className="space-y-5 text-gray-700">
//             <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
//               QuizMe!
//             </h1>

//             <p className="text-base sm:text-lg">
//               Create, play and share fun learning quizzes right from your browser.
//             </p>

//             <p>
//               Bring interaction to your lessons, presentations or group activities with QuizMe.
//               Create engaging quizzes, polls, puzzles and challenges that get everyone involved.
//             </p>

//             <ul className="space-y-2 list-disc list-inside">
//               <li>No downloads required. Everything works instantly on the web</li>
//               <li>Build custom quizzes in minutes</li>
//               <li>Host live sessions and watch players compete in real time</li>
//               <li>Use polls, puzzles and multi-choice challenges to spark engagement</li>
//               <li>Share your QuizMe games using a simple link</li>
//             </ul>

//             <p>
//               Unlock advanced features to host larger groups, add more question styles and access deeper insights.
//             </p>
//           </div>

//           {/* Image */}
//           <div className="w-full">
//             <img
//               src={Game}
//               alt="Quiz gameplay"
//               className="w-full rounded-3xl shadow-xl object-cover"
//             />
//           </div>
//         </section>

//         {/* Action Cards */}
//         <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-8">
          
//           {/* Card 1 */}
//           <div className="
//             bg-white
//             rounded-2xl
//             p-6
//             flex items-center gap-6
//             shadow-xl
//             hover:shadow-2xl
//             transition
//           ">
//             <img
//               src={StartQuiz}
//               alt="Start Quiz"
//               className="h-20 w-20 rounded-full object-cover"
//             />
//             <p className="text-lg font-bold text-gray-800">
//               Start a Quiz
//             </p>
//           </div>

//           {/* Card 2 */}
//           <div className="
//             bg-white
//             rounded-2xl
//             p-6
//             flex items-center gap-6
//             shadow-xl
//             hover:shadow-2xl
//             transition
//           ">
//             <img
//               src={Template}
//               alt="Explore Templates"
//               className="h-20 w-20 rounded-full object-cover"
//             />
//             <p className="text-lg font-bold text-gray-800">
//               Explore Templates
//             </p>
//           </div>
//         </section>

//       </div>
//     </main>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import Game from "../../assets/images/andrey.jpg";
import StartQuiz from "../../assets/images/PastelQuiz.jpg";
import Template from "../../assets/images/PastelTemp.jpg";

export default function Hero() {
  return (
    <main className="bg-pink-50 py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 font-[charis]">

        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Create quizzes people actually enjoy playing
            </h1>

            <p className="text-base sm:text-lg text-gray-700 max-w-xl">
              QuizMe helps teachers, teams, and creators build interactive quizzes,
              polls, and games that boost participation and learning.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/create-quiz">
                <button className="
                  bg-gradient-to-r from-teal-500 via-teal-400 to-teal-600
                  text-black
                  font-bold
                  px-8 py-3
                  rounded-full
                  shadow-lg
                  hover:shadow-xl
                  hover:scale-105
                  transition
                ">
                  Create a Quiz
                </button>
              </Link>

              <Link to="/join">
                <button className="
                  bg-white
                  border border-teal-300
                  text-teal-700
                  font-semibold
                  px-8 py-3
                  rounded-full
                  hover:bg-teal-50
                  transition
                ">
                  Join a Game
                </button>
              </Link>
            </div>

            {/* TRUST STATS */}
            <div className="grid grid-cols-3 gap-6 pt-8 text-center">
              <div>
                <p className="text-3xl font-bold text-teal-700">10k+</p>
                <p className="text-sm text-gray-600">Quizzes Created</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-teal-700">95%</p>
                <p className="text-sm text-gray-600">Player Engagement</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-teal-700">50k+</p>
                <p className="text-sm text-gray-600">Games Played</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src={Game}
              alt="Quiz gameplay"
              className="w-full rounded-3xl shadow-2xl object-cover"
            />

            {/* FLOATING BADGE */}
            <div className="
              absolute -bottom-6 left-6
              bg-white
              rounded-2xl
              px-5 py-3
              shadow-xl
              text-sm
              font-semibold
              text-gray-700
            ">
              No downloads. Works instantly 🚀
            </div>
          </div>
        </section>

        {/* QUICK ACTION CARDS */}
        <section className="mt-24 grid grid-cols-1 sm:grid-cols-2 gap-8">

          <Link to="/create-quiz">
            <div className="
              bg-white
              rounded-2xl
              p-6
              flex items-center gap-6
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition
            ">
              <img
                src={StartQuiz}
                alt="Start Quiz"
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-bold text-gray-800">
                  Start a Quiz
                </p>
                <p className="text-sm text-gray-600">
                  Build your first quiz in minutes
                </p>
              </div>
            </div>
          </Link>

          <Link to="/templates">
            <div className="
              bg-white
              rounded-2xl
              p-6
              flex items-center gap-6
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition
            ">
              <img
                src={Template}
                alt="Explore Templates"
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-bold text-gray-800">
                  Explore Templates
                </p>
                <p className="text-sm text-gray-600">
                  Use ready-made quiz formats
                </p>
              </div>
            </div>
          </Link>

        </section>
      </div>
    </main>
  );
}
