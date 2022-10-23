# Odyssey

## Setup

Kindly follow the following steps to setup

1. Clone the repository.

```
git clone git@github.com:sdslabs/odyssey.git
```

2. Change directory to frontend in odyssey

```
cd odyssey/frontend/
```

3. Create a file `.env.local` if not present and write the following things in it

```
NEXTAUTH_URL=Your GitHub OAuth callback url
GITHUB_ID= Your GitHub OAuth Id
GITHUB_SECRET=Your GitHub OAuth Secret
NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY=Your Google Sheets Service Account private key
NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL=Your Google Sheets Service Account Email Id
NEXT_PUBLIC_SPREADSHEET_ID=Your SpreadSheet Id
NEXT_PUBLIC_MENTOR_SHEET_ID=Your Mentor Sheet Id
NEXT_PUBLIC_ORGANIZERS_SHEET_ID=Your Organizers Sheet Id
NEXT_PUBLIC_DEVELOPERS_AND_DESIGNERS_SHEET_ID=Your Designers and Developers Sheet Id
```

4. Next, change the directory to `odyssey/` and run the following command to enter python's virtual environment.

```
source bin/activate
```

5. Change directory to backen and install the requirements using `pip install`.

```
pip install -r requirements.txt
```

6. Next, run the following commands,

```
python manage.py makemigrations
python manage.py migrate odyssey
python manage.py migrate
python manage.py createsuperuser
```

7. Then create a superuser by filling the required details (username, email, password).

8. Start the server.

```
python manage.py runserver
```

9. Go to `localhost:8000/admin` on a browser.

10. Click on `Social applications` (in the bottom left). Click on add in front of it.

```
Select provider as GitHub
Fill any name of your choice
Add Client id (same as added in .env.local in step 3)
Add Secret key (same as added in .env.local in step 3)
```

11. Then click on `example.com` and click on the right shift arrow, this will be changed during production.

12. Change directory to `odyssey/frontend` and run,

```
npm i && npm run dev
```

13. Go to `localhost:3000` in a browser.
