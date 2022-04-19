from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, mixins
from rest_framework import  viewsets
from rest_framework import serializers, status
from .models import Task
from .serializers import  TaskSerializer 
# Create your views here.
class TasksList(viewsets.ModelViewSet):
    #http_method_names = ['get']
    queryset = Task.objects.all()
    serializer_class = TaskSerializer 

    def get_queryset(self):
        return Task.objects.all()

    def get_object(self):
        item = self.kwargs.get('pk')
        return generics.get_object_or_404(Task, id=item)
    
    def create(self, request, *args, **kwargs):
        Task_data = request.data
        
        new_Task = Task.objects.create(TaskName=Task_data["TaskName"], stop=Task_data["stop"], heure_debut=Task_data["heure_debut"] , heure_fin=Task_data["heure_fin"] )

        new_Task.save()
        serializer = TaskSerializer(new_Task)

        return Response(serializer.data)