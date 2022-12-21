from django.urls import path
from base import views


urlpatterns = [
    path('', views.get_users),
    path('add', views.add_user),
]
