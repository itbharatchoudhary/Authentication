# README — Google OAuth Configuration
### Variables: `GOOGLE_CLIENT_ID` · `GOOGLE_CLIENT_SECRET` · `GOOGLE_REDIRECT_URI`

---

## What Is This Section?

Google OAuth allows your users to sign in with their Google account instead of creating a separate username and password. Google acts as the identity provider — it confirms who the user is and gives your app a token in return.

To use this, you need to register your application with Google and get a Client ID, a Client Secret, and configure a Redirect URI.

---

## What You Will Get

By the end of this guide, your section will look like this:

```
GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-aBcDeFgHiJkLmNoPqRsTuVwXyZ
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

---

## Step-by-Step Guide

**Step 1 — Sign in to Google Cloud Console**

Go to: https://console.cloud.google.com

Sign in with your Google account. If you have never used Google Cloud before, you may be asked to agree to the terms of service. Accept them.

---

**Step 2 — Create a new project**

Step 2a — In the top navigation bar, click the project dropdown. It likely says "Select a project" or shows a previous project name.

Step 2b — A popup appears. Click "New Project" in the top right corner of that popup.

Step 2c — Enter a name for your project. This is just for your own reference — for example, `MyApp` or `AuthProject`.

Step 2d — Leave the Organisation field as-is and click "Create".

Step 2e — Wait a few seconds. Then click the project dropdown again and select your newly created project to make it active.

---

**Step 3 — Navigate to the OAuth consent screen**

Step 3a — In the left sidebar, click "APIs & Services".

Step 3b — Then click "OAuth consent screen".

---

**Step 4 — Configure the consent screen**

Step 4a — You will be asked to choose a User Type. Select "External" (this allows any Google account to sign in, not just accounts within your organisation). Click "Create".

Step 4b — On the next page, fill in the required fields:

- App name: Enter your application's name. Users will see this name on the Google sign-in screen.
- User support email: Select your own email address from the dropdown.
- Developer contact information: Enter your email address again at the bottom of the page.

Step 4c — Click "Save and Continue".

Step 4d — On the "Scopes" page, click "Save and Continue" without adding anything. The default scopes (email and profile) are already sufficient.

Step 4e — On the "Test users" page, click "Save and Continue" again. You can add test users later if you need to.

Step 4f — On the "Summary" page, click "Back to Dashboard".

---

**Step 5 — Create OAuth credentials**

Step 5a — In the left sidebar, click "Credentials".

Step 5b — Click the "Create Credentials" button at the top, then select "OAuth client ID" from the dropdown.

Step 5c — Under "Application type", select "Web application".

Step 5d — Give it a name — for example, `Web Client 1`. This name is just a label for your own reference.

---

**Step 6 — Set the Authorised Redirect URIs**

Step 6a — Scroll down to the section labelled "Authorised redirect URIs".

Step 6b — Click "Add URI".

Step 6c — For local development, enter:

```
http://localhost:5000/api/auth/google/callback
```

Replace `5000` with whatever port number you set in your `PORT` variable. The path `/api/auth/google/callback` must exactly match the route you define in your backend code.

Step 6d — If you also have a deployed URL, click "Add URI" again and enter your production URL as well, for example:

```
https://yourdomain.com/api/auth/google/callback
```

Step 6e — Click "Create".

---

**Step 7 — Copy your credentials**

Step 7a — After clicking Create, a popup appears showing your credentials.

Step 7b — Copy the "Client ID". It ends in `.apps.googleusercontent.com`.

Step 7c — Copy the "Client Secret". It starts with `GOCSPX-`.

Step 7d — Click "OK" to close the popup.

---

**Step 8 — Add everything to your `.env` file**

```
GOOGLE_CLIENT_ID=paste-your-client-id-here
GOOGLE_CLIENT_SECRET=paste-your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

---

## Important Reminders

- The `GOOGLE_REDIRECT_URI` you put in your `.env` must exactly match what you registered in the Google Console — including the protocol (`http` vs `https`), the port number, and the path. Even a single character difference will cause authentication to fail.
- While your app is in "Testing" mode on the consent screen, only accounts you add as test users can sign in. To allow all Google users to sign in, you need to publish your app from the OAuth consent screen settings.
- If you lose your Client Secret, you can go back to "Credentials" in the Google Console, click on your OAuth client, and create a new secret. The old one will stop working.
