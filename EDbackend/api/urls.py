from django.urls import path, include
from . import views

urlpatterns = [
    path('chat/post/', views.ChatHandler),
    path('chat/list/', views.ChatView.as_view()),
    path('board/post/write/', views.writeBoard),
    path('board/get/list/', views.getBoardList),
    path("board/get/<int:boardId>/", views.getBoardById),
    path("board/get/bywriter/", views.getBoardByWriter),
    path("board/delete/<int:boardId>/", views.deleteBoardById)
]
