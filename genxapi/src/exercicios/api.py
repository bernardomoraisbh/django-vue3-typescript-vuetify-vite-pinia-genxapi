from django.shortcuts import render
from django.http import JsonResponse
from .models import Exercicios
from .serializers import ExerciciosSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes

# Create your views here.
@api_view(["GET"])
def exercicios_list(request):
	exercicios = Exercicios.objects.all()
	serializer = Exercicios.ExerciciosSerializer(exercicios, many=True)
	return JsonResponse({"data": serializer.data})
