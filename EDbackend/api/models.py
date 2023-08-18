from django.db import models

# Create your models here.


class Chats(models.Model):
    sender_id = models.CharField(max_length=100)
    receiver_id = models.CharField(max_length=100)
    content = models.TextField()
    time_stamp = models.DateTimeField()
