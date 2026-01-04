# from django.contrib import admin
# from .models import QuizCategory, SubCategory, Question, Answer, Quiz, QuizAttempt, UserAnswer, MultiplayerRoom, LeaderboardEntry, ShareableResult, QuizGroup



# class AnswerInline(admin.TabularInline):
#     model = Answer
#     extra = 4

# class QuestionAdmin(admin.ModelAdmin):
#     inlines = [AnswerInline]
#     list_display = ('text', 'category', 'subcategory', 'time_limit')
#     list_filter = ('category', 'subcategory')

# admin.site.register(Question, QuestionAdmin)
# admin.site.register(QuizCategory)
# admin.site.register(SubCategory)
# admin.site.register(Quiz)
# admin.site.register(QuizAttempt)
# admin.site.register(UserAnswer)
# admin.site.register(MultiplayerRoom)
# admin.site.register(LeaderboardEntry)
# admin.site.register(ShareableResult)
# admin.site.register(QuizGroup)
import json
from django.contrib import admin, messages
from django import forms
from django.shortcuts import render, redirect
from django.urls import path
from django.contrib import admin
from .models import (
    # QuizGroup,
    QuizCategory,
    SubCategory,
    Quiz,
    Question,
    Answer,
    QuizAttempt,
    UserAnswer,
    MultiplayerRoom,
    LeaderboardEntry,
    ShareableResult
)

# -----------------------------
# Quiz Group
# -----------------------------
# @admin.register(QuizGroup)
# class QuizGroupAdmin(admin.ModelAdmin):
#     list_display = ("id", "name", "description")
#     search_fields = ("name",)


# -----------------------------
# Quiz Category
# -----------------------------
@admin.register(QuizCategory)
class QuizCategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    # list_filter = ("group",)
    search_fields = ("name",)


# -----------------------------
# Sub Category
# -----------------------------
@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "category")
    list_filter = ("category", "name")
    search_fields = ("name",)


# -----------------------------
# Quiz
# -----------------------------
@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "subcategory",
        "difficulty",
        "question_count",
        "is_active",
        "created_at",
    )
    list_filter = ("category", "subcategory", "difficulty", "is_active")
    search_fields = ("title", )
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)


# -----------------------------
# Answer Inline (inside Question)
# -----------------------------
class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 4
    # min_num = 2


# -----------------------------
# Question
# -----------------------------
@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "short_text",
        "category",
        "subcategory",
        "question_type",
        "points",
    )
    list_filter = ("category", "subcategory", "question_type")
    search_fields = ("text",)
    inlines = [AnswerInline]

    def short_text(self, obj):
        return obj.text[:50]

    short_text.short_description = "Question"

    change_list_template = "admin/quiz/question_changelist.html"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "import-json/",
                self.admin_site.admin_view(self.import_json),
                name="question-import-json",
            )
        ]
        return custom_urls + urls
    
    def import_json(self, request):
        if request.method == "POST":
            form = QuestionImportForm(request.POST, request.FILES)
            if form.is_valid():
                try:
                    data = json.load(form.cleaned_data["json_file"])
                except json.JSONDecodeError:
                    self.message_user(
                        request,
                        "Invalid JSON file",
                        level=messages.ERROR,
                    )
                    return redirect("..")

                category_name = data.get("category")
                subcategory_name = data.get("subcategory")
                questions_data = data.get("questions", [])

                if not category_name or not questions_data:
                    self.message_user(
                        request,
                        "Category and questions are required",
                        level=messages.ERROR,
                    )
                    return redirect("..")

                try:
                    category = QuizCategory.objects.get(name=category_name)
                except QuizCategory.DoesNotExist:
                    self.message_user(
                        request,
                        f"Category '{category_name}' not found",
                        level=messages.ERROR,
                    )
                    return redirect("..")

                subcategory = None
                if subcategory_name:
                    try:
                        subcategory = SubCategory.objects.get(
                            category=category,
                            name=subcategory_name
                        )
                    except SubCategory.DoesNotExist:
                        self.message_user(
                            request,
                            f"Subcategory '{subcategory_name}' not found",
                            level=messages.ERROR,
                        )
                        return redirect("..")

                created_questions = 0

                for q in questions_data:
                    answers = q.get("answers", [])
                    correct_count = sum(1 for a in answers if a.get("is_correct"))

                    if correct_count != 1:
                        self.message_user(
                            request,
                            f"Question '{q.get('text')}' must have exactly one correct answer",
                            level=messages.ERROR,
                        )
                        return redirect("..")

                    question = Question.objects.create(
                        category=category,
                        subcategory=subcategory,
                        text=q.get("text"),
                        points=q.get("points", 1),
                    )

                    Answer.objects.bulk_create([
                        Answer(
                            question=question,
                            text=a["text"],
                            is_correct=a["is_correct"]
                        )
                        for a in answers
                    ])

                    created_questions += 1

                self.message_user(
                    request,
                    f"Successfully imported {created_questions} questions",
                    level=messages.SUCCESS,
                )
                return redirect("..")

        else:
            form = QuestionImportForm()

        return render(
            request,
            "admin/quiz/import_questions.html",
            {"form": form},
        )

# -----------------------------
# Quiz Attempt
# -----------------------------
@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "quiz",
        "score",
        "total_questions",
        "completed_at",
    )
    list_filter = ("quiz", "completed_at")
    search_fields = ("user__username", "quiz__title")
    readonly_fields = ("completed_at",)


# -----------------------------
# User Answer
# -----------------------------
@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "attempt",
        "question",
        "selected_answer",
        "is_correct",
        # "answered_at",
    )
    list_filter = ("is_correct",)
    search_fields = ("user__username", "question__text")
    # readonly_fields = ("answered_at",)


# -----------------------------
# Multiplayer Room
# -----------------------------
@admin.register(MultiplayerRoom)
class MultiplayerRoomAdmin(admin.ModelAdmin):
    list_display = (
        "code",
        "quiz",
        "host",
        "is_active",
        "created_at",
    )
    list_filter = ("is_active",)
    search_fields = ("code", "host__username")
    filter_horizontal = ("participants",)
    readonly_fields = ("code", "created_at")


# -----------------------------
# Leaderboard
# -----------------------------
@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "category",
        "best_score",
        "updated_at",
    )
    list_filter = ("category",)
    search_fields = ("user__username",)
    ordering = ("-best_score",)


# -----------------------------
# Shareable Result
# -----------------------------
@admin.register(ShareableResult)
class ShareableResultAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "quiz",
        "score",
        "share_code",
        "created_at",
    )
    search_fields = ("user__username", "quiz__title", "share_code")
    readonly_fields = ("share_code", "created_at")

class QuestionImportForm(forms.Form):
    json_file = forms.FileField()
