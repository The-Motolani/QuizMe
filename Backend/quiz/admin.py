from django.contrib import admin
from .models import QuizCategory, SubCategory, Question, Answer, Quiz, QuizAttempt, UserAnswer, MultiplayerRoom, LeaderboardEntry, ShareableResult

admin.site.register(QuizCategory)
admin.site.register(SubCategory)
admin.site.register(Quiz)
admin.site.register(QuizAttempt)
admin.site.register(UserAnswer)
admin.site.register(MultiplayerRoom)
admin.site.register(LeaderboardEntry)
admin.site.register(ShareableResult)

class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 4

class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]
    list_display = ('text', 'category', 'subcategory', 'difficulty', 'time_limit')
    list_filter = ('category', 'subcategory', 'difficulty')

admin.site.register(Question, QuestionAdmin)
