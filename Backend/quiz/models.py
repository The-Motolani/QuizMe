from users.models import CustomUser
from django.db import models
from django.conf import settings
import uuid

QUIZ_CATEGORY_CHOICES = (
    ("science", "Science"),
    ("math", "Math"),
    ("history", "History"),
    ("literature", "Literature"),
    ("fun", "Fun"),
    ("music", "Music"),
    ("sports", "Sports"),
    ("geography", "Geography"),
    ('random', 'Random'),
    ("general", "General Knowledge"),
    ("custom", "Custom"),
    ("movies", "Movies"),
    ('english', 'English'),
)


class QuizCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name
    
class SubCategory(models.Model):
    category = models.ForeignKey(
        QuizCategory,
        related_name="subcategories",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.category.name} - {self.name}"


class Question(models.Model):
    DIFFICULTY_CHOICES = [
        ("easy", "Easy"),
        ("medium", "Medium"),
        ("hard", "Hard"),
    ]

    category = models.ForeignKey(
        QuizCategory,
        on_delete=models.CASCADE,
        related_name="questions"
    )
    subcategory = models.ForeignKey(
        SubCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="questions"
    )

    text = models.TextField()
    difficulty = models.CharField(
        max_length=10,
        choices=DIFFICULTY_CHOICES
    )
    explanation = models.TextField(blank=True)
    time_limit = models.PositiveIntegerField(default=30)

    def __str__(self):
        return self.text[:50]

class Quiz(models.Model):
    creator = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_quizzes"
    )

    title = models.CharField(max_length=150)
    questions = models.ManyToManyField(Question)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Answer(models.Model):
    question = models.ForeignKey(
        Question,
        related_name="answers",
        on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text


class QuizAttempt(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="quiz_attempts"
    )
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE
    )
    score = models.PositiveIntegerField()
    total_questions = models.PositiveIntegerField()
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.quiz}"

class UserAnswer(models.Model):
    attempt = models.ForeignKey(
        QuizAttempt,
        related_name="answers",
        on_delete=models.CASCADE
    )
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )
    selected_answer = models.ForeignKey(
        Answer,
        on_delete=models.CASCADE
    )
    is_correct = models.BooleanField()

    def __str__(self):
        return f"{self.question.id} - {self.is_correct}"

class MultiplayerRoom(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    host = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.code)

class LeaderboardEntry(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.ForeignKey(
        QuizCategory,
        on_delete=models.CASCADE
    )
    best_score = models.PositiveIntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "category")

class ShareableResult(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.PositiveIntegerField()
    share_code = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
