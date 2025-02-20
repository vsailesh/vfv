from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)
    level = models.CharField(max_length=50)
    image = models.ImageField(upload_to='courses/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Professor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    specialization = models.CharField(max_length=200)
    image = models.ImageField(upload_to='professors/', null=True, blank=True)
    courses = models.ManyToManyField(Course, related_name='professors')

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

class StudyTool(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    tool_type = models.CharField(max_length=100)
    url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ['user', 'course'] 