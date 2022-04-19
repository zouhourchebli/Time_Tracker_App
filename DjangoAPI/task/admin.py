from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('TaskName',  'stop')

# Register your models here.

admin.site.register(Task, TaskAdmin)