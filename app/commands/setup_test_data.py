from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Course, Professor, StudyTool, Enrollment
from django.db import transaction

class Command(BaseCommand):
    help = 'Populates the database with sample data'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        # Clear existing data
        self.stdout.write('Deleting old data...')
        models = [Course, Professor, StudyTool, Enrollment]
        for m in models:
            m.objects.all().delete()

        # Create sample courses
        self.stdout.write('Creating sample courses...')
        courses = [
            Course.objects.create(
                title='Python Programming',
                description='Learn Python from scratch',
                price='99.99',
                duration='8 weeks',
                level='Beginner'
            ),
            Course.objects.create(
                title='Advanced JavaScript',
                description='Master JavaScript and modern frameworks',
                price='149.99',
                duration='12 weeks',
                level='Advanced'
            ),
        ]

        # Create sample professors
        self.stdout.write('Creating sample professors...')
        for i in range(2):
            user = User.objects.create_user(
                username=f'professor{i}',
                email=f'professor{i}@example.com',
                password='password123'
            )
            professor = Professor.objects.create(
                user=user,
                bio=f'Experienced professor in computer science #{i}',
                specialization='Computer Science'
            )
            professor.courses.add(courses[i])

        # Create sample study tools
        self.stdout.write('Creating sample study tools...')
        study_tools = [
            StudyTool.objects.create(
                name='Code Editor',
                description='Online code editor for practice',
                tool_type='Software',
                url='https://example.com/editor'
            ),
            StudyTool.objects.create(
                name='Flashcards',
                description='Digital flashcards for memorization',
                tool_type='Learning Aid',
                url='https://example.com/flashcards'
            ),
        ]

        self.stdout.write(self.style.SUCCESS('Successfully populated the database'))