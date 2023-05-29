from django.urls import path

from . import api

urlpatterns = [
		path('', api.exercicios_list, name="exercicios_list")
]
