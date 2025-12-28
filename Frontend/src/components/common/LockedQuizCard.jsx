import { FaLock } from "react-icons/fa";

export function LockedQuizCard({ quiz }) {
  return (
    <div className="bg-gray-100 rounded-xl p-5 shadow space-y-2 text-center">
      <FaLock className="mx-auto text-gray-500" />
      <h3 className="font-semibold text-slate-700">{quiz.title}</h3>
      <p className="text-sm text-gray-500">Login to play this quiz</p>
    </div>
  );
}
