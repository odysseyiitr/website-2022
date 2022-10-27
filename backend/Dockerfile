FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

RUN python3 manage.py makemigrations
RUN python3 manage.py migrate odyssey
RUN python3 manage.py migrate
RUN echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@myproject.com', 'password')" | python3 manage.py shell

EXPOSE 8000

CMD ["python3", "manage.py", "runserver","0.0.0.0:8000"]