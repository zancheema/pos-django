from django.urls import path
from base import views


urlpatterns = [
    path('', views.get_categories),
    path('distribution', views.get_category_distribution),
    path('add', views.add_category),
    path('update', views.update_category),
    path('delete/<int:id>', views.delete_category),
]
