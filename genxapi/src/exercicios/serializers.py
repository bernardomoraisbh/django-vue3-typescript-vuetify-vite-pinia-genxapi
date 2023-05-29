from .models import Exercicios
from rest_framework import serializers

class ExerciciosSerializer(serializers.ModelSerializer):
	class meta:
		model = Exercicios
		fields = ("id", "nome_exercicio", "dt_inicio", "codigo_fonte_problema", "saida_publica")
