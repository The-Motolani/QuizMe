import QuizCategoryCard from "../common/QuizCategoryCard";
import { quizCategoryData } from "../common/quizCategoryData";

export default function QuizCategories() {
  return (
    <section className="max-w-7xl mx-auto mt-10 space-y-12">
      {quizCategoryData.map(group => (
        <div key={group.group}>
          <h2 className="text-2xl font-bold text-slate-700 mb-6">
            {group.group}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {group.items.map(item => (
              <QuizCategoryCard
                key={item.title}
                title={item.title}
                description={item.description}
                IconComponent={item.IconComponent}
                path={item.path}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}


// import QuizCategoryCard from "../common/QuizCategoryCard";
// import { quizCategoryGroups } from "../common/quizCategoryData";

// const QuizCategories = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-12">
//       <div className="max-w-7xl mx-auto">

//         {/* Page Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl font-bold text-rose-300 font-[Baloo]">
//             Choose a Quiz Category
//           </h1>
//           <div className="border-2 w-12 mx-auto rounded-full border-yellow-100 mt-2"></div>
//           <p className="text-gray-500 mt-4">
//             Explore quizzes by topic, format, and purpose.
//           </p>
//         </div>

//         {/* Groups */}
//         <div className="space-y-16">
//           {quizCategoryGroups.map((group) => (
//             <div key={group.group}>
              
//               <h2 className="text-xl font-semibold text-slate-600 mb-6">
//                 {group.group}
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//                 {group.items.map((item) => (
//                   <QuizCategoryCard
//                     key={item.title}
//                     {...item}
//                   />
//                 ))}
//               </div>

//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizCategories;


// // import QuizCategoryCard from "../common/QuizCategoryCard";
// // import { quizCategoryGroups } from "../common/quizCategoryData";

// // const QuizCategories = () => {
// //   return (
// //     <div className="max-w-7xl mx-auto mt-10 space-y-16">
// //       {quizCategoryGroups.map((group) => (
// //         <div key={group.group}>
// //           <h2 className="text-2xl font-bold text-teal-700 mb-6">
// //             {group.group}
// //           </h2>

// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// //             {group.items.map((item) => (
// //               <QuizCategoryCard
// //                 key={item.title}
// //                 {...item}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default QuizCategories;
