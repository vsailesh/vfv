from django.contrib import admin
from .models import Course, Professor, StudyTool, Enrollment

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'level', 'created_at', 'updated_at')
    list_filter = ('level', 'created_at')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)

@admin.register(Professor)
class ProfessorAdmin(admin.ModelAdmin):
    list_display = ('get_full_name', 'specialization')
    list_filter = ('specialization',)
    search_fields = ('user__first_name', 'user__last_name', 'specialization', 'bio')
    filter_horizontal = ('courses',)

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    get_full_name.short_description = 'Name'

@admin.register(StudyTool)
class StudyToolAdmin(admin.ModelAdmin):
    list_display = ('name', 'tool_type', 'created_at')
    list_filter = ('tool_type', 'created_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'enrolled_at', 'completed')
    list_filter = ('completed', 'enrolled_at')
    search_fields = ('user__username', 'course__title')
    readonly_fields = ('enrolled_at',)
    ordering = ('-enrolled_at',)