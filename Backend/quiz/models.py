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


# class QuizGroup(models.Model):
#     name = models.CharField(max_length=100)
#     description  = models.TextField(blank=True)

#     def __str__(self):
#         return f"{self.name}- {self.description}"

class QuizCategory(models.Model):
    # group = models.ForeignKey(
    #     QuizGroup,
    #     related_name="categories",
    #     on_delete=models.CASCADE,
    #     default='By Topic'
    # )
    name = models.CharField(max_length=100)
    # slug = models.SlugField(unique=True)

    def __str__(self):
        return f"{self.name}"

class SubCategory(models.Model):
    category = models.ForeignKey(
        QuizCategory,
        related_name="subcategories",
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('category', 'name')

    def __str__(self):
        return f"{self.category.name} - {self.name}"

# class Quiz(models.Model):
#     DIFFICULTY_CHOICES = [
#         ("all", "All"),
#         ("easy", "Easy"),
#         ("medium", "Medium"),
#         ("hard", "Hard"),
#     ]
#     # category = models.ForeignKey(QuizCategory, on_delete=models.RESTRICT, related_name="quiz_category")
#     creator = models.ForeignKey(
#         CustomUser,
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#         related_name="created_quizzes"
#     )
#     title = models.CharField(max_length=250)
#     difficulty = models.CharField(
#         max_length=10,
#         choices=DIFFICULTY_CHOICES,
#         default="All"
#         )
#     is_public = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title

class Quiz(models.Model):
    title = models.CharField(max_length=200)
    # description = models.TextField(default="")
    category = models.ForeignKey(
        QuizCategory,
        on_delete=models.PROTECT,
        related_name="quizzes",
        null=True
    )
    subcategory = models.ForeignKey(
        SubCategory,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="quizzes"
    )
    difficulty = models.CharField(
        max_length=20,
        choices=[
            ("Easy", "Easy"),
            ("Medium", "Medium"),
            ("Hard", "Hard"),
        ],
        default="All"
    )
    question_count = models.PositiveIntegerField(default=10)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
         return f"{self.title}"

# class Quiz(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     category = models.ForeignKey(
#         QuizCategory,
#         on_delete=models.PROTECT,
#         related_name="quizzes"
#     )
#     subcategory = models.ForeignKey(
#         SubCategory,
#         on_delete=models.PROTECT,
#         null=True,
#         blank=True,
#         related_name="quizzes"
#     )
#     difficulty = models.CharField(
#         max_length=20,
#         choices=[
#             ("Easy", "Easy"),
#             ("Medium", "Medium"),
#             ("Hard", "Hard"),
#         ]
#     )
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title


# class Question(models.Model):
#     category = models.ForeignKey(
#         QuizCategory,
#         on_delete=models.CASCADE,
#         related_name="quiz_category"
#     )
#     subcategory = models.ForeignKey(
#         SubCategory,
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#         related_name="quiz_subcategory"
#     )
#     quiz = models.ManyToManyField(
#             Quiz, 
#             related_name="quiz_questions",
#             blank=True
#         )
#     text = models.TextField()
#     explanation = models.TextField(blank=True)
#     time_limit = models.PositiveIntegerField(default=30)

#     class Meta:
#         ordering = ['id']

#     def __str__(self):
#         return self.text[:50]

# class Question(models.Model):
#     quiz = models.ForeignKey(
#         Quiz,
#         on_delete=models.CASCADE,
#         related_name="questions"
#     )
#     text = models.TextField()
#     question_type = models.CharField(
#         max_length=30,
#         choices=[
#             ("MCQ", "Multiple Choice"),
#             ("TRUE_FALSE", "True / False"),
#             ("FILL_BLANK", "Fill in the Blank"),
#             ("MATCHING", "Matching"),
#         ]
#     )
#     order = models.PositiveIntegerField()
#     points = models.PositiveIntegerField(default=1)

#     def __str__(self):
#         return f"{self.quiz.title} - Q{self.order}"

class Question(models.Model):
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
    question_type = models.CharField(
        max_length=30,
        choices=[
            ("MCQ", "Multiple Choice"),
            ("TRUE_FALSE", "True / False"),
            ("FILL_BLANK", "Fill in the Blank"),
            ("MATCHING", "Matching"),
        ],
        default="MCQ"  
    )
    points = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.text[:50]}"

class Answer(models.Model):
    question = models.ForeignKey(
        Question,
        related_name="answers",
        on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_correct:
            Answer.objects.filter(
            question=self.question,
            is_correct=True
        ).exclude(pk=self.pk).update(is_correct=False)
        super().save(*args, **kwargs)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['question'],
                condition=models.Q(is_correct=True),
                name='one_correct_answer_per_question'
            )   
        ]

    def __str__(self):
        return f"{self.text}"

class QuizAttempt(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="quiz_attempts"
    )
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.PositiveIntegerField()
    total_questions = models.PositiveIntegerField()
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-completed_at"]
        indexes = [
            models.Index(fields=["user", "quiz", "completed_at"])
        ]

    def __str__(self):
        return f"{self.user} - {self.quiz}"

class UserAnswer(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="answers",
        null=True
    )
    attempt = models.ForeignKey(
        QuizAttempt,
        related_name="answers",
        on_delete=models.CASCADE
    )
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    # answered_at = models.DateTimeField(auto_now_add=True)
    is_correct = models.BooleanField()

    def __str__(self):
        return f"{self.is_correct}"

class MultiplayerRoom(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    host = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="hosted_rooms")
    code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    participants = models.ManyToManyField(CustomUser, related_name="joined_rooms", blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{str(self.code)}"

class LeaderboardEntry(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.ForeignKey(QuizCategory, on_delete=models.CASCADE)
    best_score = models.PositiveIntegerField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "category")

    def __str__(self):
        return f"{self.user} - {self.category} - {self.best_score}"

class ShareableResult(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.PositiveIntegerField()
    share_code = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.quiz} - {self.score}"