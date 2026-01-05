import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import QuizSkeleton from "../common/QuizSkeleton";
import Pagination from "../common/Pagination";
import { fetchQuizzes } from "../../services/api";
import { UseAuth } from "../../utils/UseAuth";

export default function QuizOptions() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, authLoading } = UseAuth();

  const subCategoryId = searchParams.get("subcategory");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [difficulty, setDifficulty] = useState("All");
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 10;
  const lastQueryRef = useRef("");

  // ✅ Redirect safely
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // ✅ Fetch quizzes safely
  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    const queryKey = `${page}-${category}-${subCategoryId}-${difficulty}`;
    if (lastQueryRef.current === queryKey) return;
    lastQueryRef.current = queryKey;

    const controller = new AbortController();
    setLoading(true);

    fetchQuizzes(
      {
        page,
        pageSize: PAGE_SIZE,
        categorySlug: category,
        subCategoryId,
        difficulty: difficulty !== "All" ? difficulty : undefined,
      },
      controller.signal
    )
      .then((data) => {
        setQuizzes(data.results);
        setCount(data.count);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [page, category, subCategoryId, difficulty, authLoading, isAuthenticated]);

  if (authLoading || loading) {
    return <QuizSkeleton />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <QuizOptionCard
            key={quiz.id}
            quiz={quiz}
            isAuthenticated={isAuthenticated}
          />
        ))}
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
