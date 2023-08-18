from rest_framework import serializers


class ChatSerializer(serializers.Serializer):
    user_id = serializers.CharField()
    content = serializers.CharField(style={'base_template': 'textarea.html'})
