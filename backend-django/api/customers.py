from django.urls import path
from base import views


urlpatterns = [
    path('', views.get_customers),
    path('put', views.put_customer),
]
