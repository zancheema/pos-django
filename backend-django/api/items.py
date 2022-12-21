from django.urls import path
from base import views


urlpatterns = [
    path('', views.get_items),
    path('most-bought', views.get_most_bought_items),
    path('sales', views.get_sales),
    path('add', views.add_item),
    path('update', views.update_item),
    path('delete/<str:item_code>', views.delete_item),
    path('recomendations/<str:phone_number>', views.get_recommendations),
]
