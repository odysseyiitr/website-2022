from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .serializers import CustomUserModelSerializer, IssueModelSerializer, AnnouncementModelSerializer, LeaderboardModelSerializer
from .models import CustomUserModel, IssueModel, AnnouncementModel, LeaderboardModel
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
import sys
sys.path.append("..")
from backend.secrets import GITHUB_URL, BACKEND_URL
import requests

class GitHubLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = GitHubOAuth2Adapter
    callback_url = GITHUB_URL
    client_class = OAuth2Client

@csrf_exempt
def set_custom_user_details(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        post_data = {'access_token': data['access_token'], 'id_token': data['id_token']}
        response = requests.post(BACKEND_URL+'api/github/', data=post_data)
        content = response.json()
        user = CustomUserModel.objects.get(username=content['user']['username'])
        user.name = data['name']
        user.email = data['email']
        user.enrollmentNo = data['enrollmentNo']
        user.contactNo = data['contactNo']
        user.field = data['field']
        user.save()
        return JsonResponse({'message': 'success'}, status=200)
    return JsonResponse({'message': 'error'}, status=400)

@csrf_exempt
def get_custom_user_details(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        post_data = {'access_token': data['access_token'], 'id_token': data['id_token']}
        response = requests.post(BACKEND_URL+'api/github/', data=post_data)
        content = response.json()
        user = CustomUserModel.objects.get(username=content['user']['username'])
        serializer = CustomUserModelSerializer(user)
        leaderboard = LeaderboardModel.objects.all().order_by('-points')
        serializer_leaderboard = LeaderboardModelSerializer(leaderboard, many=True)
        rank = 1
        for i in serializer_leaderboard.data:
            if i['username'] == user.username:
                break
            rank += 1
        return JsonResponse({'user': serializer.data, 'rank': rank}, status=200)
    return JsonResponse({'message': 'error'}, status=400)

@csrf_exempt
def get_all_issues(request):
    if request.method == 'GET':
        issues = IssueModel.objects.all()
        serializer = IssueModelSerializer(issues, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    return JsonResponse({'message': 'error'}, status=400)

@csrf_exempt
def get_announcements(request):
    if request.method == 'GET':
        announcements = AnnouncementModel.objects.all()
        serializer = AnnouncementModelSerializer(announcements, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    return JsonResponse({'message': 'error'}, status=400)
    
@csrf_exempt
def claim_issue(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        issue = IssueModel.objects.get(issue=data['issue'])
        post_data = {'access_token': data['access_token'], 'id_token': data['id_token']}
        response = requests.post(BACKEND_URL+'api/github/', data=post_data)
        content = response.json()
        user = CustomUserModel.objects.get(username=content['user']['username'])
        if(user.assignedIssue is None):
            issue.assigneeName = content['user']['name']
            issue.assigneeId = content['user']['username']
            issue.save()
            user.assignedIssue = issue
            user.save()
        return JsonResponse({'message': 'success'}, status=200)
    return JsonResponse({'message': 'error'}, status=400)

@csrf_exempt
def unclaim_issue(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        issue = IssueModel.objects.get(issue=data['issue'])
        post_data = {'access_token': data['access_token'], 'id_token': data['id_token']}
        response = requests.post(BACKEND_URL+'api/github/', data=post_data)
        content = response.json()
        user = CustomUserModel.objects.get(username=content['user']['username'])
        if(user.assignedIssue is not None):
            issue.assigneeName = None
            issue.assigneeId = None
            issue.save()
            user.assignedIssue = None
            user.save()
        return JsonResponse({'message': 'success'}, status=200)
    return JsonResponse({'message': 'error'}, status=400)

@csrf_exempt
def get_issue(request):
    if request.method == 'GET':
        issues = IssueModel.objects.get(issue=request.GET['issue'])
        serializer = IssueModelSerializer(issues, many=False)
        return JsonResponse(serializer.data, safe=False, status=200)
    return JsonResponse({'message': 'error'}, status=400)

@csrf_exempt
def get_leaderboard(request, page):
    if request.method == 'GET':
        if(page < 1):
            return JsonResponse({'message': 'error'}, status=400)
        number_of_users_per_page = 10
        users = LeaderboardModel.objects.all().order_by('-points')[(page - 1) * number_of_users_per_page : page * number_of_users_per_page]
        serializer = LeaderboardModelSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    return JsonResponse({'message': 'error'}, status=400)

@csrf_exempt
def get_search_leaderboard(request):
    if request.method == 'GET':
        users = LeaderboardModel.objects.filter(name__icontains=request.GET['query'])
        serializer = LeaderboardModelSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    return JsonResponse({'message': 'error'}, status=400)

@csrf_exempt
def complete_issue(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        if data['action'] == 'closed' and data['issue'] is not None:
            issue = IssueModel.objects.get(issue=data['issue']['html_url'])
            issue.completed = True
            issue.save()
            user = CustomUserModel.objects.get(username=issue.assigneeId)
            user.assignedIssue = None
            user.completedIssues.add(issue)
            user.save()
            leaderboard = LeaderboardModel.objects.filter(username=issue.assigneeId).first()
            if leaderboard is None:
                leaderboard = LeaderboardModel(username=issue.assigneeId, name=issue.assigneeName or issue.assigneeId, points=0)
            points = 0
            if issue.issueDifficulty == 'Easy':
                leaderboard.easy += 1
                points = 5
            elif issue.issueDifficulty == 'Medium':
                leaderboard.medium += 1
                points = 10
            elif issue.issueDifficulty == 'Hard':
                leaderboard.hard += 1
                points = 20
            leaderboard.points += points
            leaderboard.save()
        return JsonResponse({'message': 'success'}, status=200)
    return JsonResponse({'message': 'error'}, status=400)
