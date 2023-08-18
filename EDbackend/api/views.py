from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChatSerializer
from .models import Chats
from django.utils import timezone
from utils.envHandler import getEnvAttr
import openai
# Create your views here.


@api_view(['POST'])
def ChatHandler(request):

    # front로부터 전달받은 chat 객체 parsing
    chat = ChatSerializer(data=request.data)

    if chat.is_valid():
        print("requested chat: ", chat.data)
        user_id = chat.data['user_id']
        content = chat.data['content']

        # DB에 저장할 객체 생성
        chatObj = Chats(sender_id=user_id, receiver_id="bot",
                        content=content, time_stamp=timezone.now())

        # DB에 저장
        chatObj.save()

        # gpt request
        openai.api_key = getEnvAttr('OPENAI_API_KEY')
        messages = [
            {"role": "user", "content": content}
        ]

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages
        )

        chat_response = completion.choices[0].message.content
        # print(f'ChatGPT: {chat_response}')

        # response 객체 생성
        resObj = Chats(sender_id="bot", receiver_id=user_id,
                       content=chat_response, time_stamp=timezone.now())

        # DB 저장
        resObj.save()

        # response 객체 생성 후 전달. text 수정 필요
        resForFront = {'text': chat_response, 'isUser': False}
        return Response(status=status.HTTP_200_OK, data=resForFront)
