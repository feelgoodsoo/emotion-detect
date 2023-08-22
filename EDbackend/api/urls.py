from django.urls import path, include
from . import views

urlpatterns = [
    path('chat/post/', views.ChatHandler),
    path('chat/list/', views.ChatView.as_view()),
    path('board/post/create/', views.createBoard),
    path('board/post/update/<int:boardId>', views.updateBoardById),
    path('board/get/list/', views.getBoardList),
    path("board/get/<int:boardId>/", views.getBoardById),
    path("board/get/bywriter/", views.getBoardByWriter),
    path("board/post/delete/<int:boardId>/", views.deleteBoardById),
    path("board/get/searchByKeyword/<str:keyword>/", views.searchByKeyword),
    path("comment/post/create/", views.createComment),
    path("comment/get/list/<int:boardId>/", views.getCommentList)
]
