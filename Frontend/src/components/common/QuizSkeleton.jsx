const QuizSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md animate-pulse space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-200 rounded w-1/2" />
      <div className="flex gap-2 mt-3">
        <div className="h-5 w-16 bg-slate-200 rounded-full" />
        <div className="h-5 w-16 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
};

export default QuizSkeleton;
