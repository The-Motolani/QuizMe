import { Link } from "react-router-dom";

const QuizCategoryCard = ({ title, description, IconComponent, path }) => {
  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-md transition">
      
      <div className="rounded-full h-12 w-12 flex items-center justify-center border-2 border-yellow-100 bg-blue-100">
        {IconComponent && (
          <IconComponent className="text-lg text-slate-500" />
        )}
      </div>

      <h3 className="text-xl font-bold text-rose-300 text-center font-[Baloo]">
        {title}
      </h3>

      <p className="text-gray-500 text-center text-sm">
        {description}
      </p>

      <Link
        to={path}
        className="
          bg-slate-200 
          text-gray-700 
          py-2 
          px-6 
          rounded-full 
          font-semibold 
          hover:bg-white 
          hover:shadow-md
        "
      >
        Go
      </Link>
    </div>
  );
};

export default QuizCategoryCard;
