# Dashboard (React + Vite + Tailwind + Firebase)

Quick start and setup to run the admin dashboard locally and connect it to Firebase.

## Prerequisites
- Node.js (16+)
- npm
- A Firebase project with Firestore and Authentication enabled

## Files of interest
- `src/firebase.js` — initializes Firebase using Vite env vars (`VITE_FIREBASE_*`).
- `src/main.jsx`, `src/App.jsx` — React entry + router and auth context.
- `src/pages/*` — `Login`, `Dashboard`, `Projects`, `Skills`, `About` (CRUD pages).
- `index.html` — Vite entry (loads `/src/main.jsx`).

## Environment variables
Create a `.env` file in `dashboard/` (NOT committed) with these keys:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

(If you already have an `.env`, ensure the `VITE_` prefixes are present.)

## Firebase console steps
1. In Firebase Console, enable **Authentication → Sign-in method → Email/Password**.
2. Create a user (your email) under **Authentication → Users** (or allow signups).
3. Create Firestore database (in test or locked mode depending on your needs).
4. (Optional) Add sample documents to collections `projects`, `skills`, and a single doc `about/main`.

## Run locally
```powershell
cd dashboard
npm install
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173/` or the next free port). Then open `/login` and sign in with the Firebase user you created.

## Troubleshooting
- Blank page: open DevTools Console — common causes:
  - Missing `.env` values → `firebase` will fail to initialize (check errors in console).
  - Auth errors → make sure Email/Password sign-in is enabled and user exists.
- If you see CORS or permission errors from Firestore, verify Firestore rules and project ID.
- To reset ports, stop running instances of the dev server and restart.

## Notes
- The app uses realtime listeners (`onSnapshot`) so changes in the dashboard reflect immediately in any client reading the same Firestore.
- `src/firebase.js` uses `import.meta.env` — the values are statically injected at dev/build time by Vite.

If you want, I can:
- Add a small `seed.js` to populate sample data locally, or
- Create a one-click script to open the dev URL in the browser.

