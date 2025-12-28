import { Link } from "react-router-dom";

export function QuizCard({ quiz }) {
  return (
    <Link
      to={`/quiz/${quiz.id}`}
      className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition space-y-2"
    >
      <h3 className="font-semibold text-slate-800">{quiz.title}</h3>
      <span className="text-sm text-green-600">Public Quiz</span>
    </Link>
  );
}
