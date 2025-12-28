import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { quizCategoryData } from "../components/common/quizCategoryData";
import { quizzes } from "../services/quizzes";
import QuizSubCategoryFilter from "../components/layout/QuizSubCategoryFilter";
import QuizOptionCard from "../components/layout/QuizOptionCard";
import QuizSkeleton from "../components/common/QuizSkeleton";
import DifficultyFilter from "../components/common/DifficultyFilter";
import { UseAuth } from "../utils/UseAuth";

export default function QuizOptions() {
  const isAuthenticated = UseAuth();

  const [difficulty, setDifficulty] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeSubCategory, setActiveSubCategory] = useState("All");

  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const PAGE_SIZE = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setDifficulty(searchParams.get("difficulty") || "All");
    setPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const categoryData = quizCategoryData
    .flatMap(group => group.items)
    .find(item => item.path.includes(category));

  const filteredQuizzes = quizzes.filter(quiz => {
    if (quiz.category !== category) return false;
    if (activeSubCategory !== "All" && quiz.subCategory !== activeSubCategory)
      return false;
    if (difficulty !== "All" && quiz.difficulty !== difficulty) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredQuizzes.length / PAGE_SIZE);
  const paginated = filteredQuizzes.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  if (loading) return <QuizSkeleton />;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <DifficultyFilter
        active={difficulty}
        onChange={level => {
          setDifficulty(level);
          setPage(1);
        }}
      />

      <div>
        <h1 className="text-3xl font-bold text-slate-700 mb-2">
          {categoryData?.title}
        </h1>
        <p className="text-slate-500">{categoryData?.description}</p>
      </div>

      {categoryData?.subCategories && (
        <QuizSubCategoryFilter
          subCategories={categoryData.subCategories}
          active={activeSubCategory}
          onChange={setActiveSubCategory}
        />
      )}

      {paginated.length === 0 ? (
        <p className="text-slate-400 text-center mt-10">
          No quizzes available for this selection.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginated.map(quiz => (
            <QuizOptionCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </section>
  );
}
