const Pagination = ({ page, count, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(count / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-10">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`h-9 w-9 rounded-full font-semibold
            ${page === i + 1
              ? "bg-slate-700 text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-600"}
          `}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
