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

SQLite needs no setup and is fine for a portfolio. To use PostgreSQL, run
`pip install "psycopg[binary]"`, then set `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` in
`najmul.env`, and run `python manage.py migrate` again.

## Deploy (example: Render)

The backend deploys separately from the frontend (Vercel only hosts the React site).

1. Push the whole project to GitHub (the `backend` folder included).
2. On https://render.com create a **Web Service** from the repository and set **Root Directory** to `backend`.
3. Build command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
4. Start command: `gunicorn config.wsgi`
5. Environment variables:
   - `DJANGO_DEBUG=False`
   - `DJANGO_SECRET_KEY=` a long random string (generate one locally)
   - `DJANGO_ALLOWED_HOSTS=your-api.onrender.com`
   - `CORS_ALLOWED_ORIGINS=https://your-site.vercel.app`
   - `CSRF_TRUSTED_ORIGINS=https://your-api.onrender.com`
   - `NUM_PROXIES=1`
6. Important: SQLite files are wiped on redeploy on most free hosts. For a deployed site, create a
   PostgreSQL database on the host and set the `DB_*` variables (and add `psycopg[binary]` to
   `requirements.txt`), or your saved messages will disappear.
7. Create your admin user once with the host's shell: `python manage.py createsuperuser`.
8. In Vercel, add `NEXT_PUBLIC_API_URL=https://your-api.onrender.com` under **Environment Variables** and redeploy
   the frontend.

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
