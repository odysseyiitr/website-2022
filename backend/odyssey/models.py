from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from uuid import uuid4

class CustomUserModelManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(
            username=username,
            email=email,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    userId = models.CharField(max_length = 32, default = uuid4, primary_key = True, editable = False)
    name = models.CharField(max_length=50, null = True)
    username = models.CharField(max_length=32, unique=True, null = False, blank = False)
    email = models.EmailField(max_length = 100, null = False, blank = False)
    enrollmentNo = models.CharField(max_length = 8)
    contactNo = models.CharField(max_length = 10)
    field = models.CharField(max_length = 20)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    active = models.BooleanField(default = True)

    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)

    created_on = models.DateTimeField(auto_now_add = True, blank = True, null = True)
    updated_on = models.DateTimeField(auto_now = True)

    objects = CustomUserModelManager()

    class Meta:
        verbose_name = 'Custom User'


class IssueModel(models.Model):
    issue = models.CharField(max_length = 100, primary_key = True, editable = True)
    mentorName = models.CharField(max_length = 50)
    mentorId = models.CharField(max_length = 32)
    assigneeName = models.CharField(max_length = 50, null = True, blank = True)
    assigneeId = models.CharField(max_length = 32, null = True, blank = True)
    completed = models.BooleanField(default = False)

    class Meta:
        verbose_name = 'Issue'

class AnnouncementModel(models.Model):
    title = models.CharField(max_length = 100)
    description = models.CharField(max_length = 500)
    date = models.DateField()

    class Meta:
        verbose_name = 'Announcement'
        
