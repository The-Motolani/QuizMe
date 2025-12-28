const DifficultyFilter = ({ active, onChange }) => {
  const levels = ["All", "Easy", "Medium", "Hard"];

  return (
    <div className="flex gap-3 flex-wrap">
      {levels.map(level => (
        <button
          key={level}
          onClick={() => onChange(level)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition
            ${active === level
              ? "bg-slate-700 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"}
          `}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default DifficultyFilter;
