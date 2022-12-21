from django.urls import path
from base import views


urlpatterns = [
    path('', views.get_invoices),
    path('add', views.add_invoice),
]
