# Portfolio backend (Django REST API)

A small Django + Django REST framework API that receives the portfolio's contact-form messages,
validates them, saves them to a database, and can send optional SMS notifications through Twilio.
Messages can also be read in the Django admin panel. The frontend sends email notifications through Web3Forms after the backend has saved a message.

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/contact/` | `POST` | Save a contact message. JSON body: `name`, `email`, `subject`, `message`. Returns `201` with `{"detail": "Message received."}`, `400` with field errors, or `429` when throttled. |
| `/api/health/` | `GET` | Returns `{"status": "ok"}`. Handy for hosting health checks. |
| `/admin/` | browser | Django admin: read messages, mark them read/unread. |

Built-in protections: server-side validation (same rules as the frontend), a hidden honeypot field
for bots, a limit of **5 messages per hour per visitor**, and CORS limited to the sites you list.

Requires **Python 3.10 or newer**.

## Run it locally (Windows + VS Code)

Open a **second terminal** (keep the frontend running in the first one):

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

- In PowerShell, activate with `.venv\Scripts\Activate.ps1` (if it is blocked, use Command Prompt or run
  `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once).
- The API is now at http://localhost:8000 and the admin at http://localhost:8000/admin/.
- Check it: open http://localhost:8000/api/health/ and you should see `{"status": "ok"}`.

### Connect the frontend

The frontend and backend share one `najmul.env` file in the project root. Set the API URL in that file:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

From the `frontend` folder, restart the frontend. The contact form now saves messages to this backend. Submit one, then look at
**Contact messages** in the admin panel.

### Run the tests

```bash
python manage.py test
```

## Email notifications

The frontend sends email through Web3Forms directly from the browser after the Django API saves the
message. Configure the Web3Forms access key in the project-root `najmul.env`:

```text
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=
```

Web3Forms sends notifications to the verified email address associated with that access key. The key
is intended for browser-side form submissions and is included in the frontend bundle. In production,
set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in the frontend host (for example, Vercel). If email delivery
fails, the form shows the provider error; the saved message remains available in Django admin.

## SMS notifications (optional)

SMS alerts are sent through Twilio after a contact message is saved. Add these values to the
project-root `najmul.env`; keep credentials private and use E.164 phone numbers (for example,
`+15551234567`) for both Twilio's sender and the notification recipient:

```text
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
SMS_NOTIFY_PHONE=
```

When all four settings are present, each new message triggers an SMS. If Twilio is unavailable,
the message remains saved and the failure is logged. The SMS includes the visitor's name, email,
subject and message. The frontend must use the Django API (`NEXT_PUBLIC_API_URL`) for SMS
notifications to be sent.

## Use PostgreSQL instead of SQLite (optional)

SQLite needs no setup for local development. To use PostgreSQL, set `DATABASE_URL` to a PostgreSQL
connection URL, or set `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_PORT` in `najmul.env`,
then run `python manage.py migrate` again. The PostgreSQL driver is included in `requirements.txt`.

## Deploy (Render Blueprint)

The root `render.yaml` deploys the frontend, backend and PostgreSQL database together.

1. Push the project to GitHub.
2. Sign in at https://dashboard.render.com with GitHub, choose **New > Blueprint**, and select the
   repository.
3. Enter `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` when prompted, then deploy the Blueprint.
4. Render provisions PostgreSQL, applies migrations, and configures the frontend/API URLs.
5. Verify `/api/health/`, then submit a test contact form and check the verified inbox.

The Blueprint uses free resources by default. Free web services may sleep while idle, and the free
PostgreSQL database expires after 30 days. Upgrade the database plan for long-term message storage.
To access Django admin, create a superuser using the API service's shell:
`python manage.py createsuperuser`.

Railway, Fly.io and similar hosts work the same way: root directory `backend`, the same build/start
commands and variables.

## Folder layout

```
backend/
├─ manage.py
├─ requirements.txt
├─ config/            settings.py, urls.py, wsgi.py, asgi.py
└─ contact/
   ├─ models.py       ContactMessage
   ├─ serializers.py  validation rules + honeypot
   ├─ views.py        POST /api/contact/, GET /api/health/, email and SMS notifications
   ├─ urls.py
   ├─ admin.py
   ├─ tests.py
   └─ migrations/     (generated by `makemigrations`)
```
