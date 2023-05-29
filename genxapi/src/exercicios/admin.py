from django.contrib import admin

# Register your models here.
from .models import Exercicios, ResolucaoExercicio

admin.site.register(Exercicios)
admin.site.register(ResolucaoExercicio)
