import django
import os
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

django.setup()

User = get_user_model()

try:
    User.objects.create_superuser('admin', 'admin@localhost', 'admin')
    print('Admin created')
except:
    print('Admin already exists')
