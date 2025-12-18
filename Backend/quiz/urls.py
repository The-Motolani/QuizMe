from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    QuizCategoryViewSet, SubCategoryViewSet, QuestionViewSet,
    QuizViewSet, QuizAttemptViewSet, MultiplayerRoomViewSet,
    LeaderboardViewSet, ShareableResultViewSet, SubmitQuizAttemptView
)

router = DefaultRouter()
router.register(r'categories', QuizCategoryViewSet)
router.register(r'subcategories', SubCategoryViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'quizzes', QuizViewSet)
router.register(r'attempts', QuizAttemptViewSet)
router.register(r'multiplayer', MultiplayerRoomViewSet)
router.register(r'leaderboard', LeaderboardViewSet)
router.register(r'shareables', ShareableResultViewSet)

urlpatterns = [
    path('', include(router.urls)),
     path('quizzes/<int:quiz_id>/submit/', SubmitQuizAttemptView.as_view(), name='submit-quiz'),
]
