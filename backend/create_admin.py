import django
import os
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

django.setup()

User = get_user_model()

user = User.objects.get(username='admin')

if(user is None):
    user = User.objects.create_superuser('admin', 'admin@localhost', 'admin')
    user.save()
    print('Admin created')
