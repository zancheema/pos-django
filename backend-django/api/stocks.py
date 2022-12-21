from django.urls import path
from base import views


urlpatterns = [
    path('', views.get_stocks),
    path('add', views.add_stock),
    path('update', views.update_stock),
    path('delete/<int:id>', views.delete_stock),
]
