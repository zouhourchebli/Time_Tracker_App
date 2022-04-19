from django.contrib import admin
from django.urls import path, include
from .views import TasksList
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'task/list/', TasksList, basename='tasks-lis')
router.register(r'task/ajout/', TasksList, basename='tasks-ajout')

urlpatterns = [
    path('', include(router.urls)),
] 