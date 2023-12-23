from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from rest_framework import serializers
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChatsListSerializer, BoardSerializer, CommentSerializer
from .models import Chats, Board, Comment
from utils.envHandler import getEnvAttr
import openai
from django.db.models import Q
# Create your views here.


@api_view(['POST'])
def ChatHandler(request):

    # front로부터 전달받은 chat 객체 parsing
    chat = request.data

    try:
        # print("requested chat: ", chat)
        user_id = chat['user_id']
        content = chat['content']

        # DB에 저장할 객체 생성
        chatObj = Chats(sender_id=user_id, receiver_id="bot",
                        content=content)  # time_stamp=timezone.now()

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

        chat_response = completion.choices[0].message.content #"hello from jango"
        # print(f'ChatGPT: {chat_response}')

        # response 객체 생성
        resObj = Chats(sender_id="bot", receiver_id=user_id,
                       content=chat_response)  # time_stamp=timezone.now()

        # DB 저장
        resObj.save()

        # response 객체 생성 후 전달. text 수정 필요
        resForFront = {'text': chat_response, 'isUser': False}
        return Response(status=status.HTTP_200_OK, data=resForFront)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


class ChatView(APIView):

    # sender가 userA이면서 receiver가 Bot인 경우와 sender가 Bot이면서 receiver가 userA인경우.. Query
    # (sender == userA && receiver == Bot || sender == Bot && receiver == userA)

    def post(self, request, *args, **kwargs):
        try:
            # print("req data: ", request.data)
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
            # print("sorted_chats: ", combined_chats)

            serializer = ChatsListSerializer(
                combined_chats,
                many=True,
                context={'user_id': user_id}
            )
            return Response(serializer.data)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


@api_view(['GET'])
def getBoardList(request):
    # get one board by board id
    try:
        posts = Board.objects.all()
        serializedData = BoardSerializer(posts, many=True)
        return Response(serializedData.data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(["GET"])
def getBoardById(request, boardId):
    try:
        board = get_object_or_404(Board, id=boardId)
        board = BoardSerializer(board)
        return Response(board.data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['POST'])
def getBoardByWriter(request):
    wrtier = request.data['writer']

    try:
        board = Board.objects.filter(writer=wrtier)

        jsonData = BoardSerializer(board, many=True)
        return Response(jsonData.data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(["POST"])
def createBoard(request):
    try:
        reqData = BoardSerializer(data=request.data)

        if Board.objects.filter(**request.data).exists():
            raise serializers.ValidationError('This data already exists')

        if reqData.is_valid():
            # print("reqData: ", reqData)
            reqData.save()
            return Response(status=status.HTTP_200_OK, data="save success")
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(["POST"])
def updateBoardById(request, boardId):

    board = Board.objects.get(id=boardId)
    reqData = BoardSerializer(instance=board, data=request.data)

    try:
        if reqData.is_valid():
            # print("updated reqData: ", reqData)
            reqData.save()
            return Response(status=status.HTTP_200_OK, data="update success")
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(["POST"])
def deleteBoardById(request, boardId):
    try:
        board = get_object_or_404(Board, id=boardId)
        board.delete()
        return Response("delete success")
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(["GET"])
def searchByKeyword(reuqest, keyword):
    try:
        keyword = keyword.strip()  # 앞뒤 공백을 제거합니다.
        boards = Board.objects.filter(
            Q(title__icontains=keyword) | Q(content__icontains=keyword))

        jsonData = BoardSerializer(boards, many=True)
        return Response(jsonData.data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(["POST"])
def createComment(request):
    try:
        reqData = CommentSerializer(data=request.data)

        if Comment.objects.filter(**request.data).exists():
            raise serializers.ValidationError('This data already exists')

        if reqData.is_valid():
            # print("reqData: ", reqData)
            reqData.save()
            return Response(status=status.HTTP_200_OK, data="save success")
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(["GET"])
def getCommentList(request, boardId):
    try:
        comments = Comment.objects.filter(
            board_id=boardId)

        returnData = CommentSerializer(comments, many=True)
        return Response(returnData.data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


'''
Todo :
comment delete, update
'''
