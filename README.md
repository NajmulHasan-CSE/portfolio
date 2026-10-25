# Md. Najmul Hasan: Portfolio

A responsive, accessible portfolio built with **Next.js + React + Tailwind CSS**, with light/dark themes,
subtle Framer Motion animations (reduced-motion aware) and Lucide icons.

> **Honesty by design.** Nothing in this site is invented. Anything that still needs *your* information
> (email, GitHub, LinkedIn, education, project links, CV, contact-form service) is shown as a clearly
> labelled placeholder with disabled controls, never as a fake link or a pretend feature.

---

## 1. Folder structure

```
najmul-portfolio/
├─ frontend/                  Next.js application
│  ├─ app/                    App Router pages, shared layout and metadata
│  ├─ package.json            frontend scripts and dependencies
│  ├─ next.config.mjs         shared local environment-file support
│  ├─ tailwind.config.js      dark mode = "class", navy palette
│  ├─ postcss.config.js
│  ├─ public/                 favicon and Md_Najmul_Hasan_Resume.pdf
│  └─ src/
│     ├─ App.jsx
│     ├─ index.css
│     ├─ data/                site details and portfolio content
│     ├─ components/         reusable UI components and the Home page directory
│     ├─ portfolio-pages/    page content rendered by the App Router
│     ├─ hooks/               shared React hooks
│     └─ utils/               contact API and configuration helpers
├─ backend/                   Python + Django REST API
│  ├─ manage.py
│  ├─ requirements.txt
│  ├─ config/                 Django project settings and URLs
│  └─ contact/                contact API, model, admin, tests and migrations
├─ najmul.env                 one local config file shared by frontend and backend
├─ .vscode/settings.json      hides dependencies, build output and local database files in Explorer
├─ .gitignore
└─ README.md
```

## 2. Install and run (Windows + VS Code)

Requires [Node.js](https://nodejs.org) 18.18 or newer (the LTS version is fine).

The single local settings file is `najmul.env` in the project root. Edit it to configure both the
frontend and Django backend.

Open the project folder in VS Code, open a terminal (**Ctrl + `**), and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open the address it prints (normally http://localhost:3000).

The Home page includes a directory of cards linking to each portfolio page. Each page has its own URL: `/`, `/about`, `/skills`, `/projects`,
`/career-journey`, `/services`, `/education` and `/contact`. The QR code opens `/links`,
which lists the configured contact and social profiles and includes the CV download option.
Next.js serves every route directly, including on refresh.

Other commands:

```bash
cd frontend
npm run build      # create a production build
npm start          # serve the production build locally
```

> **PowerShell says "running scripts is disabled"?** Either switch the VS Code terminal to
> *Command Prompt*, or run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## 3. Portfolio content

| Item | While unfilled | Once filled |
|---|---|---|
| **Contact and social profiles** (`siteConfig.js`) | Unconfigured social accounts are not shown as links. | Add a real GitHub or LinkedIn URL; it appears automatically on the contact and `/links` pages. |
| **QR code** | Always points to this site's `/links` page. | The QR stays the same when profile URLs change; the page shows the latest configured links after redeployment. |
| **Projects** (`projects.js`) | Project names are shown without placeholder descriptions. | Add the real GitHub URL to `repoUrl` and deployment URL to `liveUrl`; their buttons appear automatically. |
| **Education** (`education.js`) | A short note appears until education details are added. | Add real details to display them on the Education page. |
| **CV** | **Download CV** opens a short availability message. | Add `frontend/public/Md_Najmul_Hasan_Resume.pdf` to enable **View Resume** and **Download CV**. |
| **Contact form** | Validates input and reports that it is not connected; nothing is sent. | Connect the Django backend to save messages and send Web3Forms email notifications; SMS alerts are optional. |
| **Availability badge** | Hidden. | Set `availability.show: true` in `siteConfig.js` only while it is accurate. |

## 4. Customise your details

### Contact details and social profiles
Edit `frontend/src/data/siteConfig.js`:

```js
contact: {
  email: 'you@yourdomain.com',
  mobile: '+8801XXXXXXXXX',
  github: 'https://github.com/your-real-username',
  linkedin: 'https://www.linkedin.com/in/your-real-profile',
},
```

The QR code on the Home page opens `/links`. Update the URLs above and redeploy; the same QR
will show the new links without needing to generate or print another code.
The small profile photo used in the navbar and QR is `frontend/public/najmul picture.jpeg`;
replace that image to update both.

### Education
Edit `frontend/src/data/education.js` with your real education details.

### Project links
Edit `frontend/src/data/projects.js` and add the real repository and deployment URLs:

```js
{
  id: 'insightflow',
  title: 'InsightFlow — Business Analytics Dashboard',
  liveUrl: 'https://your-deployment-url',
  repoUrl: 'https://github.com/your-username/your-repository',
}
```

### Skills, career journey, "What I can build"
Edit `frontend/src/data/skills.js`, `frontend/src/data/journey.js` and `frontend/src/data/services.js`. Keep "Currently Learning" items under the learning category so they stay visually distinct.

## 5. Add your CV

1. Export your CV as a PDF.
2. Name it `Md_Najmul_Hasan_Resume.pdf` and put it in `frontend/public/` (`frontend/public/Md_Najmul_Hasan_Resume.pdf`).
3. Refresh the page. The site checks that the file exists and really is a PDF, then the buttons switch to a real download.

To use another name, change `resume.url` in `frontend/src/data/siteConfig.js`.

## 6. Connect the contact form

The frontend and Django backend use the single project-root `najmul.env` file. Configure the form there, then restart the frontend with `npm run dev`.
The form submits to the Django backend, which saves each message, then sends an email notification
through Web3Forms directly from the browser. The visitor's email address is included as the reply-to
address.

1. Follow `backend/README.md` to run the API (it listens on http://localhost:8000).
2. Set `NEXT_PUBLIC_API_URL=http://localhost:8000` in the root `najmul.env` for local development.
3. Configure `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `najmul.env`; Web3Forms sends to the verified
   email address associated with that key.
4. To also enable SMS alerts, set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`
   and `SMS_NOTIFY_PHONE` in `najmul.env`. Use Twilio E.164 phone numbers (for example,
   `+15551234567`).
5. Messages are saved in the database and visible in Django admin at `/admin/`. SMS alerts contain
   the submitter's name, email, subject and message.

For production, the root `render.yaml` deploys the frontend, API and database together through
Render. Enter `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` when Render prompts for the frontend's environment.
For Vercel hosting, deploy the Django backend separately and set both `NEXT_PUBLIC_API_URL` and
`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in Vercel's **Project Settings > Environment Variables**.

## 7. SEO

The Next.js root layout provides a title, meta description, Open Graph/Twitter tags and a favicon.
After deployment, set `metadataBase` and the Open Graph URL and image in `frontend/app/layout.jsx`.
Use a real 1200x630 **PNG** at `frontend/public/og-image.png`.

## 8. Upload to GitHub

1. Create an empty repository at https://github.com/new (no README, no .gitignore).
2. In the VS Code terminal, inside the project folder:

```bash
git init
git add .
git commit -m "Initial commit: portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

`najmul.env` is in `.gitignore`, so your form keys are not uploaded. On a fresh setup, create this file once in the project root and add the needed settings. Later updates:

```bash
git add .
git commit -m "Describe your change"
git push
```

## 9. Deploy the complete website to Vercel

The root `vercel.json` deploys the Next.js frontend and Django API as services in one Vercel
project, sharing a domain. The contact API needs a persistent PostgreSQL database because Vercel
Functions do not provide a persistent local filesystem.

1. Import `NajmulHasan-CSE/portfolio` on Vercel with the repository root (`./`) as **Root
   Directory**. Vercel detects the services in `vercel.json`.
2. Connect a persistent PostgreSQL database to the Vercel project and set `DATABASE_URL`.
   The API service applies migrations on deployment when this variable is present.
3. Configure the project's `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`,
   `DJANGO_ALLOWED_HOSTS` (the Vercel production hostname), and `NUM_PROXIES=1`.
4. Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in the project's Vercel environment settings. The frontend
   calls `/api/contact/` on the same domain; set `NEXT_PUBLIC_API_URL` only if you use a separate API
   host. Add secret values directly in Vercel; never commit or share them in chat.
5. Check the API's `/api/health/`, then send a test contact message and verify that it is saved
   and the Web3Forms notification arrives.
6. Copy the frontend's live URL into `frontend/src/data/projects.js` (portfolio card `liveUrl`) and
   into the SEO tags above.

The root `render.yaml` is an alternative for deploying the frontend, API and database on Render.

## 10. Testing checklist

**Desktop (width of 1024px or more)**
- [ ] Page loads with no errors in the browser console (F12)
- [ ] Every navbar link opens the correct page and marks the current page
- [ ] Hero buttons: View Projects and Contact Me open the matching pages
- [ ] Hover and focus states are visible on buttons, cards and links

**Mobile / tablet (use DevTools device mode, Ctrl+Shift+M; test 320px, 375px, 768px)**
- [ ] No horizontal scrolling
- [ ] Menu button opens and closes the menu; tapping a link closes it; Escape closes it
- [ ] Code-editor graphic scrolls sideways inside its box instead of breaking the layout
- [ ] Project cards, skills and timeline stack neatly

**Theme**
- [ ] Toggle switches between dark and light on every section
- [ ] The choice persists after a refresh, with no flash of the wrong theme
- [ ] Text stays readable in both themes

**Keyboard and accessibility**
- [ ] Tab reaches every link and button in a sensible order, with a visible outline
- [ ] The "Skip to main content" link appears on the first Tab press
- [ ] With the OS "reduce motion" setting on, animations are minimal and scrolling is not smooth

**Links**
- [ ] Contact and social links show only configured details and open correctly
- [ ] The Home page QR opens `/links`; changing social URLs updates that page without changing the QR
- [ ] Project links appear only when a real URL is configured
- [ ] Footer links and Back to top work

**CV**
- [ ] Without `frontend/public/Md_Najmul_Hasan_Resume.pdf`: Download CV opens the "CV coming soon" dialog
- [ ] With the file added: Download CV downloads your PDF

**Contact form**
- [ ] Submitting empty fields shows an error under each field and focuses the first one
- [ ] An invalid email and a message shorter than 10 characters are rejected
- [ ] Not connected: shows the "not connected, message was not sent" notice
- [ ] Connected: shows "Sending...", then a success message and a cleared form
- [ ] With the backend: the message appears in the Django admin under "Contact messages"
- [ ] Sending a 6th message within an hour shows the "throttled" error from the backend
- [ ] Offline / wrong endpoint: shows the error message

**Production**
- [ ] From `frontend/`, `npm run build` completes without errors and `npm run preview` looks the same as dev
