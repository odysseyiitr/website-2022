# Odyssey

## Setup

Kindly follow the following steps to setup,

1. Clone the repository

```
git clone git@github.com:sdslabs/odyssey.git
```

2. Change directory to frontend in odyssey

```
cd odyssey/frontend/
```

3. Create a file `.env.local` from `.env.local.example` and fill in the values

4. Change directory to backend in the directory backend in odyssey

```
cd ../backend/backend
```

5. Create a file `secrets.py` from `secrets.py.example` and fill in the values

6. Go to the root directory of odyssey and start the docker containers

```
cd ../..
docker-compose up --build -d
```

7. Go to `localhost:8000/admin` on a browser and login with the following credentials

```
username: admin
password: password
```

8.  Click on `Social applications` (in the bottom left). Click on add in front of it. Fill the following details

```
Select provider as GitHub
Fill any name of your choice
Add Client id (same as added in .env.local in step 3)
Add Secret key (same as added in .env.local in step 3)
```

9. Then click on `example.com` and click on the right shift arrow, this will be changed during production. Save and exit.

10.  Go to `localhost:3000` in a browser and login with your GitHub account.
