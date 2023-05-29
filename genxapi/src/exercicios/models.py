import uuid
from django.db import models

from account.models import User

# Create your models here.
class Exercicios(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	nome_exercicio = models.TextField(blank=False)
	dt_inicio = models.DateTimeField(auto_now_add=True)
	dt_fim = models.TextField(blank=True)
	codigo_fonte_problema = models.TextField(blank=False)
	saida_privada = models.TextField(blank=False)
	saida_publica = models.TextField(blank=False)
	criado_por = models.ForeignKey(User, related_name="exercicios", on_delete=models.CASCADE)

class ResolucaoExercicio(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	porcentagem_acerto_publico = models.DecimalField(max_digits=5, decimal_places=2)
	porcentagem_acerto_privado = models.DecimalField(max_digits=5, decimal_places=2)
	codigo_fonte_aluno = models.TextField(blank=False)
	saida_privada_aluno = models.TextField(blank=False)
	saida_publica_aluno = models.TextField(blank=False)
	dt_inicio = models.DateTimeField(auto_now_add=True)
	dt_fim = models.TextField(blank=True)
	resolvido_por = models.ForeignKey(User, related_name="resolvido_por", on_delete=models.CASCADE)
	exercicio = models.ForeignKey(Exercicios, related_name="exercicio", on_delete=models.CASCADE)
