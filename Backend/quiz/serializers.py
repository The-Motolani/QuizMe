from rest_framework import serializers
from .models import QuizCategory, SubCategory, Answer, Question, Quiz, UserAnswer, QuizAttempt, MultiplayerRoom, LeaderboardEntry, ShareableResult
from users.serializers import UserSerializer

class QuizCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizCategory
        fields = ["id", "name", "slug"]

class SubCategorySerializer(serializers.ModelSerializer):
    category = QuizCategorySerializer(read_only=True)
    class Meta:
        model = SubCategory
        fields = ["id", "name", "category"]

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "text"]

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    category = QuizCategorySerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)

    class Meta:
        model = Question
        fields = ["id", "text", "difficulty", "time_limit", "category", "subcategory", "answers"]

class QuizSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ["id", "title", "creator", "questions", "is_public", "created_at"]

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
        quiz.questions.set(questions)
        return quiz

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = ["question", "selected_answer", "is_correct"]
        read_only_fields = ["is_correct"]

    def validate(self, data):
        if data['selected_answer'].question != data['question']:
            raise serializers.ValidationError("Selected answer does not belong to the given question")
        return data

class QuizAttemptSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    quiz = QuizSerializer(read_only=True)
    answers = UserAnswerSerializer(many=True, read_only=True)

    class Meta:
        model = QuizAttempt
        fields = ["id", "user", "quiz", "score", "total_questions", "completed_at", "answers"]

class MultiplayerRoomSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(read_only=True)
    host = UserSerializer(read_only=True)

    class Meta:
        model = MultiplayerRoom
        fields = ["id", "quiz", "host", "code", "is_active", "participants", "created_at"]

class LeaderboardEntrySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    category = QuizCategorySerializer(read_only=True)
    class Meta:
        model = LeaderboardEntry
        fields = ["user", "category", "best_score", "updated_at"]

class ShareableResultSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    quiz = QuizSerializer(read_only=True)
    class Meta:
        model = ShareableResult
        fields = ["id", "user", "quiz", "score", "share_code", "created_at"]

class SubmitAnswerSerializer(serializers.Serializer):
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    selected_answer = serializers.PrimaryKeyRelatedField(queryset=Answer.objects.all())

    def validate(self, data):
        if data['selected_answer'].question != data['question']:
            raise serializers.ValidationError("Answer does not belong to the question")
        return data
