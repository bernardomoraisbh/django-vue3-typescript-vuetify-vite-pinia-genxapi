from django.shortcuts import render, redirect, get_object_or_404
from django.conf import settings

def home_view(request):
    return render(request, "home.html")
