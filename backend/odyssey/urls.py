from django.urls import path
from odyssey import views

urlpatterns = [
    path('github/', views.GitHubLogin.as_view(), name='github'),
    path('update-user/', views.set_custom_user_details, name='update-user'),
    path('get-user/', views.get_custom_user_details, name='get-user'),
    path('set-user/', views.set_custom_user_details, name='set-issue'),
    path('get-all-issues/', views.get_all_issues, name='get-all-issues'),
    path('get-issue/', views.get_issue, name='get-issue'),
    path('get-announcements/', views.get_announcements, name='get-announcements'),
    path('claim-issue/', views.claim_issue, name='claim_issue'),
]