from rest_framework import serializers
from .models import QuizCategory, SubCategory, Answer, Question, Quiz, UserAnswer, QuizAttempt, MultiplayerRoom, LeaderboardEntry, ShareableResult
from users.serializers import UserSerializer

# class QuizGroupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = QuizGroup
#         fields = [
#             "id",
#             "name",
#             "description",
#         ]

class QuizCategorySerializer(serializers.ModelSerializer):
    # group_name = serializers.CharField(source="group.name", read_only=True)

    class Meta:
        model = QuizCategory
        fields = ["id", "name",]

class SubCategorySerializer(serializers.ModelSerializer):
    # category = QuizCategorySerializer(read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = SubCategory
        fields = ["id", "name", "category", "category_id"]

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "text"]

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
#     category = QuizCategorySerializer(read_only=True)
#     subcategory = SubCategorySerializer(read_only=True)
#     quiz_ids = serializers.PrimaryKeyRelatedField(
#     many=True,
#     read_only=True,
#     source="quiz"
# )

    class Meta:
        model = Question
        fields = [
            "id",
            "text", 
            "question_type", 
            "answers", 
            "points"]

class QuizListSerializer(serializers.ModelSerializer):
    # creator = UserSerializer(read_only=True)
    # questions = QuestionSerializer(
    # many=True, 
    # read_only=True,
    # source='quiz_questions'
    # )
    category_name = serializers.CharField(source="category.name", read_only=True)
    subcategory_name = serializers.CharField(source="subcategory.name", read_only=True)


    class Meta:
        model = Quiz
        fields = [
            "id",
            "title",
            # "description",
            "category",
            "category_name",
            "subcategory",
            "subcategory_name",
            "difficulty",
            "question_count",
            "is_active",
            # "created_at",
        ]

class QuizDetailSerializer(serializers.ModelSerializer):
    category = QuizCategorySerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)

    class Meta:
        model = Quiz
        fields = "__all__"

class QuizCreateSerializer(serializers.ModelSerializer):
    question_ids = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all(),
        many=True,
        write_only=True
    )

    class Meta:
        model = Quiz
        fields = ["title", "question_ids", "is_public"]

    def create(self, validated_data):
        questions = validated_data.pop("question_ids")
        quiz = Quiz.objects.create(creator=self.context["request"].user, **validated_data)
        quiz.quiz_questions.set(questions)
        return quiz

class UserAnswerSerializer(serializers.ModelSerializer):
    question_text = serializers.CharField(source="question.text", read_only=True)
    selected_answer_text = serializers.CharField(source="selected_answer.text", read_only=True)

    class Meta:
        model = UserAnswer
        fields = [
            "id",
            "question",
             "selected_answer",
             "selected_answer_text", 
             "is_correct",
            "question_text",
            "answered_at",
            ]
        read_only_fields = ["is_correct"]

    def validate(self, data):
        if data['selected_answer'].question != data['question']:
            raise serializers.ValidationError("Selected answer does not belong to the given question")
        return data

class QuestionAdminSerializer(serializers.ModelSerializer):
    answers = serializers.StringRelatedField(many=True)

    class Meta:
        model = Question
        fields = "__all__"

class StartQuizSerializer(serializers.Serializer):
    quiz_id = serializers.IntegerField()
    title = serializers.CharField()
    difficulty = serializers.CharField()
    questions = QuestionSerializer(many=True)

class QuizAttemptSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    # quiz = QuizSerializer(read_only=True)
    # answers = UserAnswerSerializer(many=True, read_only=True)
    quiz_title = serializers.CharField(source="quiz.title", read_only=True)

    class Meta:
        model = QuizAttempt
        fields = [
            "id", 
            "user", 
            "quiz",
            "quiz_title", 
            "score", 
            "total_questions",
              "completed_at", 
              "answers"]

class MultiplayerRoomSerializer(serializers.ModelSerializer):
    # quiz = QuizSerializer(read_only=True)
    host = UserSerializer(read_only=True)
    participants = UserSerializer(many=True, read_only=True)


    class Meta:
        model = MultiplayerRoom
        fields = [
            "id", 
            "quiz", 
            "host", 
            "code", 
            "is_active", 
            "participants", 
            "created_at"
            ]

class LeaderboardEntrySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    # category = QuizCategorySerializer(read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = [
            "id",
            "user", 
            "category", 
            "category_name",
            "best_score", 
            "updated_at"
            ]

class ShareableResultSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    # quiz = QuizSerializer(read_only=True)
    quiz_title = serializers.CharField(source="quiz.title", read_only=True)

    class Meta:
        model = ShareableResult
        fields = ["id", 
                  "user", 
                  "quiz",
                  "quiz_title" 
                  "score", 
                  "share_code", 
                  "created_at"]

class SubmitAnswerSerializer(serializers.Serializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    selected_answer = serializers.PrimaryKeyRelatedField(queryset=Answer.objects.all())

    class Meta:
        model = UserAnswer
        fields = ["question", "selected_answer"]

    def validate(self, data):
        if data['selected_answer'].question != data['question']:
            raise serializers.ValidationError("Answer does not belong to the question")
        return data
