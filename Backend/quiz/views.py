from django.shortcuts import render
from django.views.generic.edit import UpdateView
from django.urls import reverse_lazy
from django.views import View
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import IsQuizCreatorOrReadOnly
from rest_framework import viewsets, filters, generics, permissions, status
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import (
    QuizCategory, SubCategory, Question, Answer, Quiz,
    QuizAttempt, UserAnswer, MultiplayerRoom, LeaderboardEntry,
    ShareableResult
)
from .serializers import (
    QuizCategorySerializer, SubCategorySerializer, QuizSerializer,
    QuizCreateSerializer, QuestionSerializer, UserAnswerSerializer,
    QuizAttemptSerializer, MultiplayerRoomSerializer,
    LeaderboardEntrySerializer, ShareableResultSerializer, SubmitAnswerSerializer
)
from rest_framework.pagination import PageNumberPagination

# --- Custom Pagination ---
class QuizPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

# --- Categories ---
class QuizCategoryViewSet(viewsets.ModelViewSet):
    queryset = QuizCategory.objects.all()
    serializer_class = QuizCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# --- Questions ---
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# --- Quizzes ---
class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsQuizCreatorOrReadOnly]
    pagination_class = QuizPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter]
    
    # Filtering options
    filterset_fields = ['is_public', 'creator__id', 'difficulty', 'questions__subcategory__id', 'questions__category__slug']
    
    # Ordering options
    ordering_fields = ['title', 'created_at']
    ordering = ['-created_at']  # default: newest first
    
    # Search options
    search_fields = ['title', 'questions__text']

    @action(detail=True, methods=['post'])
    def submit_answer(self, request, pk=None):
        question_id=request.data.get("question_id")
        answer_id=request.data.get("answer_id")

        try:
            question = Question.objects.get(id=question_id, quiz_id=pk)
        except Question.DoesNotExist:
            return Response({"Question Does Not Exist!"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            answer = question.objects.get(id=answer_id)
        except Answer.DoesNotExist:
            return Response({'Answer does not exist!'}, status=status.HTTP_400_BAD_REQUEST)

        if answer.is_correct:
            return Response({'Correct Answer'}, status=status.HTTP_200_OK)
        else:
            return Response({'Incorrect Answer'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def add_question(self, request, pk=None):
        quiz = self.get_object()
        question_text = request.data.get('text')
        answer_data = request.data.get('answer', [])

        if not question_text:
            return Response({'Question does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        question = Question.objects.create(quiz=quiz, text=question_text)

        
    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return QuizCreateSerializer
        return QuizSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    @action(detail=False, methods=["get"])
    def by_category(self, request):
        """
        Filter quizzes by quiz category slug.
        A quiz is included if at least one of its questions belongs to the category.
        """
        category_slug = request.query_params.get("category")
        if not category_slug:
            return Response({"error": "Category slug is required."}, status=400)

        quizzes = Quiz.objects.filter(
            questions__category__slug=category_slug
        ).distinct()

        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def by_subcategory(self, request):
        """
        Filter quizzes by question subcategory name.
        A quiz is included if at least one of its questions belongs to the subcategory.
        """
        subcategory_name = request.query_params.get("subcategory")
        if not subcategory_name:
            return Response({"error": "Subcategory name is required."}, status=400)

        quizzes = Quiz.objects.filter(
            questions__subcategory__name=subcategory_name
        ).distinct()

        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)
    
# --- Quiz Attempts ---
class QuizAttemptViewSet(viewsets.ModelViewSet):
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# --- Multiplayer Rooms ---
class MultiplayerRoomViewSet(viewsets.ModelViewSet):
    queryset = MultiplayerRoom.objects.all()
    serializer_class = MultiplayerRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)

    @action(detail=True, methods=["post"])
    def join(self, request, pk=None):
        room = self.get_object()
        room.participants.add(request.user)
        return Response({"message": f"{request.user} joined room {room.code}"})


# --- Leaderboard ---
class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeaderboardEntry.objects.all()
    serializer_class = LeaderboardEntrySerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["get"])
    def by_category(self, request):
        category = request.query_params.get("category")
        if not category:
            return Response({"error": "Category slug required"}, status=400)
        entries = LeaderboardEntry.objects.filter(category__slug=category).order_by('-best_score')
        serializer = self.get_serializer(entries, many=True)
        return Response(serializer.data)

    filterset_fields = ['category__slug', 'user__id']  # filter by category or user
    ordering_fields = ['best_score', 'updated_at']
    ordering = ['-best_score']  # default: highest score first

# --- Shareable Results ---
class ShareableResultViewSet(viewsets.ModelViewSet):
    queryset = ShareableResult.objects.all()
    serializer_class = ShareableResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SubmitQuizAttemptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quiz_id):
        quiz = Quiz.objects.filter(id=quiz_id).first()
        if not quiz:
            return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

        answers_data = request.data.get("answers", [])
        if not answers_data:
            return Response({"error": "No answers submitted"}, status=status.HTTP_400_BAD_REQUEST)

        total_questions = quiz.questions.count()
        score = 0
        user_answers = []

        for item in answers_data:
            serializer = SubmitAnswerSerializer(data=item)
            serializer.is_valid(raise_exception=True)
            question = serializer.validated_data['question']
            selected_answer = serializer.validated_data['selected_answer']
            is_correct = selected_answer.is_correct
            if is_correct:
                score += 1

            user_answers.append({
                "question": question,
                "selected_answer": selected_answer,
                "is_correct": is_correct
            })

        # Create QuizAttempt
        attempt = QuizAttempt.objects.create(
            user=request.user,
            quiz=quiz,
            score=score,
            total_questions=total_questions
        )

        # Save UserAnswers
        user_answer_objs = [
            UserAnswer(
                attempt=attempt,
                question=ua["question"],
                selected_answer=ua["selected_answer"],
                is_correct=ua["is_correct"]
            )
            for ua in user_answers
        ]
        UserAnswer.objects.bulk_create(user_answer_objs)

        # Update leaderboard
        for question in quiz.questions.all():
            category = question.category
            leaderboard_entry, created = LeaderboardEntry.objects.get_or_create(
                user=request.user,
                category=category,
                defaults={"best_score": score}
            )
            if not created and score > leaderboard_entry.best_score:
                leaderboard_entry.best_score = score
                leaderboard_entry.save()

        serializer = QuizAttemptSerializer(attempt)
        return Response(serializer.data, status=status.HTTP_201_CREATED)