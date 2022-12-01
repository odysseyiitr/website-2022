from .models import CustomUserModel, IssueModel, AnnouncementModel, LeaderboardModel
from rest_framework.serializers import ModelSerializer

class CustomUserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = [
            'name',
            'username',
            'field',
            'enrollmentNo',
            'contactNo',
            'email',
            'assignedIssue',
            'completedIssues',
        ]

    def create(self, validated_data):
        user = CustomUserModel.objects.create_user(**validated_data)
        return user

class IssueModelSerializer(ModelSerializer):
    class Meta:
        model = IssueModel
        fields = [
            'issue',
            'mentorName',
            'mentorId',
            'assigneeName',
            'assigneeId',
            'completed',
            'issueName'
        ]

    def create(self, validated_data):
        issue = IssueModel.objects.create(**validated_data)
        return issue

class AnnouncementModelSerializer(ModelSerializer):
    class Meta:
        model = AnnouncementModel
        fields = [
            'title',
            'description',
            'date',
        ]

    def create(self, validated_data):
        announcement = AnnouncementModel.objects.create(**validated_data)
        return announcement
        
class LeaderboardModelSerializer(ModelSerializer):
    class Meta:
        model = LeaderboardModel
        fields = [
            'username',
            'name',
            'easy',
            'medium',
            'hard',
            'points',
        ]

    def create(self, validated_data):
        leaderboard = LeaderboardModel.objects.create(**validated_data)
        return leaderboard
