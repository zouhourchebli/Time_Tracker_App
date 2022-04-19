from django.db import models

# Create your models here.
class Task(models.Model):
    TaskName = models.TextField(null=True, blank=True, max_length=255)
    stop = models.BooleanField(default=False)
    heure_debut  = models.TimeField(default=timezone.now,  verbose_name='heure debut', blank=True,null=True)
    heure_fin  = models.TimeField(default=timezone.now,  verbose_name='heure fin', blank=True,null=True)

    def _str_(self):
        return self.TaskName