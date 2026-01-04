# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import *
# # (
# #     QuizCategoryViewSet, SubCategoryViewSet, QuestionViewSet,
# #     QuizViewSet, QuizAttemptViewSet, MultiplayerRoomViewSet,
# #     LeaderboardViewSet, ShareableResultViewSet, SubmitQuizAttemptView
# # )

# router = DefaultRouter()
# router.register(r'categories', QuizCategoryListView)
# router.register(r'subcategories', SubCategoryViewSet)
# router.register(r'questions', QuestionViewSet)
# router.register(r'quizzes', QuizListView)
# router.register(r'attempts', QuizAttemptViewSet)
# router.register(r'multiplayer', MultiplayerRoomViewSet)
# router.register(r'leaderboard', LeaderboardViewSet)
# router.register(r'shareables', ShareableResultViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
#      path('quizzes/<int:quiz_id>/submit/', SubmitQuizView.as_view(), name='submit-quiz'),
# ]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    # QuizGroupListView,
    QuizCategoryListView,
    SubCategoryViewSet,
    QuestionViewSet,
    QuizListView,
    QuizDetailView,
    StartQuizView,
    SubmitQuizView,
    QuizAttemptViewSet,
    MultiplayerRoomViewSet,
    LeaderboardViewSet,
    ShareableResultViewSet,
)

router = DefaultRouter()
router.register(r'subcategories', SubCategoryViewSet, basename='subcategory')
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'attempts', QuizAttemptViewSet, basename='attempt')
router.register(r'multiplayer', MultiplayerRoomViewSet, basename='multiplayer')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')
router.register(r'shareables', ShareableResultViewSet, basename='shareable')

urlpatterns = [
    # --- Read-only / list views ---
    # path('quiz-groups/', QuizGroupListView.as_view(), name='quiz-groups'),
    path('categories/', QuizCategoryListView.as_view(), name='quiz-categories'),
    path('quizzes/', QuizListView.as_view(), name='quiz-list'),
    path('quizzes/<int:pk>/', QuizDetailView.as_view(), name='quiz-detail'),

    # --- Quiz flow ---
    path('quizzes/start/', StartQuizView.as_view(), name='start-quiz'),
    path('quizzes/submit/', SubmitQuizView.as_view(), name='submit-quiz'),

    # --- Router-based ---
    path('', include(router.urls)),
]
