import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import QuizOptionCard from "./QuizOptionCard";
import QuizSkeleton from "../common/QuizSkeleton";
import Pagination from '../common/Pagination';
import DifficultyFilter from "../common/DifficultyFilter";
import { fetchQuizzes } from "../../services/api";
import { UseAuth } from "../../utils/UseAuth";

export default function QuizOptions() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = UseAuth();

  const subCategoryId = searchParams.get("subcategory");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [difficulty, setDifficulty] = useState("All");
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 10;

  useEffect(() => {
    setLoading(true);

    fetchQuizzes({
      page,
      pageSize: PAGE_SIZE,
      categorySlug: category,
      subCategoryId,
      difficulty: difficulty !== "All" ? difficulty : undefined
    })
      .then(data => {
        setQuizzes(data.results);
        setCount(data.count);
      })
      .finally(() => setLoading(false));
  }, [page, category, subCategoryId, difficulty]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-8">

      <DifficultyFilter
        active={difficulty}
        onChange={level => {
          setDifficulty(level);
          setPage(1);
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <QuizSkeleton key={i} />
            ))
          : quizzes.map(quiz => (
              <QuizOptionCard
                key={quiz.id}
                quiz={quiz}
                isAuthenticated={isAuthenticated} // ✅ auth-driven
              />
            ))
        }
      </div>

      <Pagination
        page={page}
        count={count}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </section>
  );
}
