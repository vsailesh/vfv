from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Course, Professor, StudyTool, Enrollment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')
        read_only_fields = ('id',)

class CourseSerializer(serializers.ModelSerializer):
    professors = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    enrolled_students_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'title', 'description', 'price', 'duration', 
                 'level', 'image', 'created_at', 'updated_at', 
                 'professors', 'enrolled_students_count')
        read_only_fields = ('created_at', 'updated_at')

    def get_enrolled_students_count(self, obj):
        return obj.enrollment_set.count()

class ProfessorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    courses = CourseSerializer(many=True, read_only=True)
    course_count = serializers.SerializerMethodField()

    class Meta:
        model = Professor
        fields = ('id', 'user', 'bio', 'specialization', 'image', 
                 'courses', 'course_count')

    def get_course_count(self, obj):
        return obj.courses.count()

class StudyToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyTool
        fields = ('id', 'name', 'description', 'tool_type', 
                 'url', 'created_at')
        read_only_fields = ('created_at',)

class EnrollmentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        write_only=True,
        source='course'
    )

    class Meta:
        model = Enrollment
        fields = ('id', 'user', 'course', 'course_id', 
                 'enrolled_at', 'completed')
        read_only_fields = ('enrolled_at',)

    def validate(self, data):
        # Check if user is already enrolled in the course
        user = self.context['request'].user
        course = data.get('course')
        if Enrollment.objects.filter(user=user, course=course).exists():
            raise serializers.ValidationError(
                "You are already enrolled in this course."
            )
        return data