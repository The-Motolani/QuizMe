const QuizSubCategoryFilter = ({ subCategories, active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onChange("All")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition
          ${active === "All"
            ? "bg-rose-300 text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
        `}
      >
        All
      </button>

      {subCategories.map(sub => (
        <button
          key={sub.title}
          onClick={() => onChange(sub.title)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${active === sub.title
              ? "bg-rose-300 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
          `}
        >
          {sub.title}
        </button>
      ))}
    </div>
  );
};

export default QuizSubCategoryFilter;
