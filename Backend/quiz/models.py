from django.db import models
from django.conf import settings

DIFFICULTY_CHOICES = (
("easy", "Easy"),
("medium", "Medium"),
("hard", "Hard"),
)

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

class Quiz(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default="easy")
    category = models.ForeignKey('QuizCategory', on_delete=models.SET_NULL, null=True, blank=True, choices=QUIZ_CATEGORY_CHOICES)
    
    def __str__(self):
        return self.title


class QuizCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    time_limit = models.PositiveIntegerField(default=1)
    explanation = models.TextField(blank=True, null=True)
    is_public = models.BooleanField(default=True)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default="easy")

    def __str__(self):
        return self.text
    
class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

class UserScore(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='scores')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.FloatField()
    date_taken = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - {self.score}"