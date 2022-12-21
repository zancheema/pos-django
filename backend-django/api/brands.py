from django.urls import path
from base import views


urlpatterns = [
    path('', views.get_brands),
    path('add', views.add_brand),
    path('update', views.update_brand),
    path('delete/<int:id>', views.delete_brand),
]
