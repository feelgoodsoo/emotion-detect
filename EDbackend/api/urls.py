from django.urls import path, include
from . import views

urlpatterns = [
    path('chat/post/', views.ChatHandler),
    # path('chat/list', views.get_all_messages),
    path('chat/list/', views.ChatView.as_view()),
]
