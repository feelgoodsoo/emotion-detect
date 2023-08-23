from django.db import models

# Create your models here.


class Chats(models.Model):
    sender_id = models.CharField(max_length=100)
    receiver_id = models.CharField(max_length=100)
    content = models.TextField()
    time_stamp = models.DateTimeField(auto_now_add=True)


class Board(models.Model):
    writer = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    content = models.TextField()
    time_stamp = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    commenter = models.CharField(max_length=100)
    comment = models.TextField()
    board_id = models.IntegerField()
    time_stamp = models.DateTimeField(auto_now_add=True)
