from django.shortcuts import render
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChatSerializer, ChatsListSerializer
from .models import Chats
from django.utils import timezone
from utils.envHandler import getEnvAttr
import openai
import json
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

        # completion.choices[0].message.content
        chat_response = "hello from jango"
        # print(f'ChatGPT: {chat_response}')

        # response 객체 생성
        resObj = Chats(sender_id="bot", receiver_id=user_id,
                       content=chat_response, time_stamp=timezone.now())

        # DB 저장
        resObj.save()

        # response 객체 생성 후 전달. text 수정 필요
        resForFront = {'text': chat_response, 'isUser': False}
        return Response(status=status.HTTP_200_OK, data=resForFront)


@api_view(['GET'])
def get_all_messages(request):

    # sender가 userA이면서 receiver가 Bot인 경우와 sender가 Bot이면서 receiver가 userA인경우.. Query
    # (sender == userA && receiver == Bot || sender == Bot && receiver == userA)

    user_id = request.data['user_id']
    print("user_id: ", user_id)
    # return Response(status=status.HTTP_200_OK, data="id test")

    # sender가 userA이면서 receiver가 Bot인 경우 데이터 가져오기
    user_to_bot_chats = Chats.objects.filter(
        sender_id=user_id, receiver_id='bot')

    # sender가 Bot이면서 receiver가 userA인 경우 데이터 가져오기
    bot_to_user_chats = Chats.objects.filter(
        sender_id='bot', receiver_id=user_id)

    # 두 QuerySet을 하나로 합치기
    combined_chats = user_to_bot_chats | bot_to_user_chats

    # 시간순으로 정렬
    sorted_chats = combined_chats.order_by('time_stamp')
    print("sorted_chats: ", sorted_chats)

    # [
    # { "text" : "i am hungry", "isUser" : true },
    # { "text" : "what can i help you?", "isUser" : false}
    # ]
    return Response(status=status.HTTP_200_OK, data="hello")


class ChatView(APIView):
    def post(self, request, *args, **kwargs):
        print("req data: ", request.data)
        user_id = request.data['user_id']  # 클라이언트 사용자의 ID
        # print("user_id: ", user_id)

        user_to_bot_chats = Chats.objects.filter(
            sender_id=user_id, receiver_id='bot')
        # print("user_to_bot_chats: ", user_to_bot_chats)

        # sender가 Bot이면서 receiver가 userA인 경우 데이터 가져오기
        bot_to_user_chats = Chats.objects.filter(
            sender_id='bot', receiver_id=user_id)

        # print("sender_bot: ", bot_to_user_chats)

        # 두 QuerySet을 하나로 합치기
        combined_chats = user_to_bot_chats | bot_to_user_chats

        # 시간순으로 정렬
        # sorted_chats = combined_chats.order_by('time_stamp')
        print("sorted_chats: ", combined_chats)

        serializer = ChatsListSerializer(
            combined_chats,
            many=True,
            context={'user_id': user_id}
        )
        return Response(serializer.data)
