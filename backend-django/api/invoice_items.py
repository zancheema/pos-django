from django.urls import path
from base import views


urlpatterns = [
    path('', views.get_invoice_items),
    path('add', views.add_invoice_item),
]
