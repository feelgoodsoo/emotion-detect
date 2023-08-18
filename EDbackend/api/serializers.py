from .models import Chats
from rest_framework import serializers


class ChatSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    content = serializers.CharField(style={'base_template': 'textarea.html'})


class ChatsListSerializer(serializers.ModelSerializer):
    text = serializers.CharField(source='content')
    isUser = serializers.SerializerMethodField()

    class Meta:
        model = Chats
        fields = ('text', 'isUser')

    def get_isUser(self, obj):
        if self.context.get('user_id') == obj.sender_id:
            return True
        return False
