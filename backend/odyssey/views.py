from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .serializers import CustomUserModelSerializer, IssueModelSerializer, AnnouncementModelSerializer
from .models import CustomUserModel, IssueModel, AnnouncementModel
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
import requests

class GitHubLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = GitHubOAuth2Adapter
    callback_url = 'https//odyssey.iitr.ac.in'
    client_class = OAuth2Client

@csrf_exempt
def set_custom_user_details(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        post_data = {'access_token': data['access_token'], 'id_token': data['id_token']}
        response = requests.post('https://odyssey.iitr.ac.in/backend/api/github/', data=post_data)
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
        response = requests.post('https://odyssey.iitr.ac.in/backend/api/github/', data=post_data)
        content = response.json()
        user = CustomUserModel.objects.get(username=content['user']['username'])
        serializer = CustomUserModelSerializer(user)
        return JsonResponse(serializer.data, status=200)
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
        response = requests.post('https://odyssey.iitr.ac.in/backend/api/github/', data=post_data)
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
def get_issue(request):
    if request.method == 'GET':
        issues = IssueModel.objects.get(issue=request.GET['issue'])
        serializer = IssueModelSerializer(issues, many=False)
        return JsonResponse(serializer.data, safe=False, status=200)
    return JsonResponse({'message': 'error'}, status=400)