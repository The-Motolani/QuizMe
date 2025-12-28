import { useEffect, useState } from "react";
import { fetchQuizzes, fetchSubcategories } from "../services/api";
import QuizSkeleton from "../components/common/QuizSkeleton";
import QuizCard from "../components/common/QuizCard";
import LockedQuizCard from "../components/common/LockedQuizCard";

export default function TechnologyQuizzes({ isAuthenticated }) {
  const [quizzes, setQuizzes] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchQuizzes({
      category: "technology",
      difficulty,
      subcategory,
      page,
    })
      .then((res) => {
        setQuizzes(res.data.results);
        setCount(res.data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [difficulty, subcategory, page]);

  useEffect(() => {
    fetchSubcategories("technology")
      .then((res) => setSubcategories(res.data))
      .catch(() => setSubcategories([]));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Technology Quizzes</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={subcategory}
          onChange={(e) => {
            setSubcategory(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Subcategories</option>
          {subcategories.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select> */}
      </div>

      {/* Quiz Grid */}
      {/* {loading ? (
        <QuizSkeleton />
      ) : quizzes.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No quizzes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {quizzes.map((quiz) =>
            isAuthenticated ? (
              <QuizCard key={quiz.id} quiz={quiz} />
            ) : (
              <LockedQuizCard key={quiz.id} quiz={quiz} />
            )
          )} */}
        {/* </div> */}
      {/* )} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {/* {loading
    ? Array.from({ length: 6 }).map((_, i) => (
        <QuizSkeleton key={i} />
      ))
    : quizzes.map((quiz) =>
        isAuthenticated ? (
          <QuizCard key={quiz.id} quiz={quiz} />
        ) : (
          <LockedQuizCard key={quiz.id} quiz={quiz} />
        )
      )} */}
</div>


      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
        >
          Prev
        </button>
        <span className="px-3 py-2 text-gray-700">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * 10 >= count}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </section>
  );
}
