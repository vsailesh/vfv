from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from .models import Course, Professor, StudyTool, Enrollment
from .serializers import (
    UserSerializer, CourseSerializer, ProfessorSerializer, 
    StudyToolSerializer, EnrollmentSerializer
)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Course.objects.all()
        level = self.request.query_params.get('level', None)
        if level is not None:
            queryset = queryset.filter(level=level)
        return queryset

class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Professor.objects.all()
        specialization = self.request.query_params.get('specialization', None)
        if specialization is not None:
            queryset = queryset.filter(specialization=specialization)
        return queryset

class StudyToolViewSet(viewsets.ModelViewSet):
    queryset = StudyTool.objects.all()
    serializer_class = StudyToolSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = StudyTool.objects.all()
        tool_type = self.request.query_params.get('tool_type', None)
        if tool_type is not None:
            queryset = queryset.filter(tool_type=tool_type)
        return queryset

class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 