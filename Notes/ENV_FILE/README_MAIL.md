# README — Mail Configuration (Gmail OAuth2)
### Variables: `MAIL_USER` · `MAIL_CLIENT_ID` · `MAIL_CLIENT_SECRET` · `MAIL_REFRESH_TOKEN`

---

## What Is This Section?

This section configures your application to send emails — for things like password resets, OTP codes, and welcome messages — using your Gmail account via OAuth2.

Why OAuth2 and not just your Gmail password? Because Google no longer allows apps to sign in with a plain Gmail password. OAuth2 is the secure, approved method. You will generate a special refresh token that your app uses to send email on your behalf.

---

## What You Will Get

By the end of this guide, your section will look like this:

```
MAIL_USER=youremail@gmail.com
MAIL_CLIENT_ID=123456789012-abcdefgh.apps.googleusercontent.com
MAIL_CLIENT_SECRET=GOCSPX-aBcDeFgH...
MAIL_REFRESH_TOKEN=1//04xAbCdEfGhIjKlMnOpQrStUvWxYz...
```

---

## Before You Begin

You will need the same Google Cloud project you created for Google OAuth (README_4_GOOGLE_OAUTH). If you have not done that yet, complete that README first, then come back here.

You will reuse the same Client ID and Client Secret — so `MAIL_CLIENT_ID` and `MAIL_CLIENT_SECRET` will have the same values as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

---

## MAIL_USER

This is simply the Gmail address you want to send emails from.

Step 1 — Decide which Gmail account your application will use as its sender. This can be your personal Gmail or a dedicated one you create just for the app.

Step 2 — Add it to your `.env` file:

```
MAIL_USER=youremail@gmail.com
```

---

## MAIL_CLIENT_ID and MAIL_CLIENT_SECRET

These come from the same OAuth credentials you created in the Google Console for your Google Sign-In setup.

Step 1 — Go to: https://console.cloud.google.com/apis/credentials

Step 2 — Click on the OAuth 2.0 Client ID you created previously.

Step 3 — Copy the "Client ID" and "Client Secret" from that page.

Step 4 — Add them to your `.env` file:

```
MAIL_CLIENT_ID=paste-your-client-id-here
MAIL_CLIENT_SECRET=paste-your-client-secret-here
```

---

## MAIL_REFRESH_TOKEN

This is the most involved part. A refresh token is a long-lived credential that lets your app silently get a new access token whenever it needs to send an email, without requiring a user to be present and click anything.

You will use Google's OAuth2 Playground to generate it.

---

**Step 1 — Enable the Gmail API for your project**

Step 1a — Go to: https://console.cloud.google.com/apis/library/gmail.googleapis.com

Step 1b — Make sure your project is selected in the top dropdown.

Step 1c — Click "Enable". If it already says "Manage", it is already enabled and you can skip this step.

---

**Step 2 — Add the OAuth Playground as an authorised redirect URI**

Step 2a — Go to: https://console.cloud.google.com/apis/credentials

Step 2b — Click on your OAuth 2.0 Client ID.

Step 2c — Scroll down to "Authorised redirect URIs".

Step 2d — Click "Add URI" and enter exactly this:

```
https://developers.google.com/oauthplayground
```

Step 2e — Click "Save".

---

**Step 3 — Open the OAuth2 Playground**

Go to: https://developers.google.com/oauthplayground

---

**Step 4 — Configure the Playground to use your own credentials**

Step 4a — In the top-right corner of the page, click the gear icon (Settings).

Step 4b — Check the box that says "Use your own OAuth credentials".

Step 4c — Two new fields appear. Enter your Client ID and Client Secret in those fields.

Step 4d — Close the settings panel by clicking the X.

---

**Step 5 — Authorise the Gmail API scope**

Step 5a — In the left panel, you will see a list of Google APIs. Scroll down and find "Gmail API v1".

Step 5b — Click on it to expand it.

Step 5c — Select the scope: `https://mail.google.com/`

Step 5d — Click the blue "Authorise APIs" button.

---

**Step 6 — Sign in and grant permission**

Step 6a — A Google sign-in popup appears. Sign in with the Gmail account you set as `MAIL_USER` — the one you want to send emails from.

Step 6b — You may see a warning saying "Google hasn't verified this app". This is expected because your app is still in Testing mode. Click "Continue".

Step 6c — Grant the permission to access Gmail. Click "Allow".

Step 6d — You will be redirected back to the OAuth Playground.

---

**Step 7 — Exchange the authorisation code for tokens**

Step 7a — You are now on Step 2 of the Playground. Click the blue "Exchange authorisation code for tokens" button.

Step 7b — After a moment, the right panel will fill in with a JSON response.

Step 7c — Find the field labelled "Refresh token". Copy that entire value. It starts with `1//` and is a long string.

---

**Step 8 — Add the refresh token to your `.env` file**

```
MAIL_REFRESH_TOKEN=paste-your-refresh-token-here
```

---

## Final Result for This Section

```
MAIL_USER=youremail@gmail.com
MAIL_CLIENT_ID=123456789012-abcdefgh.apps.googleusercontent.com
MAIL_CLIENT_SECRET=GOCSPX-aBcDeFgH...
MAIL_REFRESH_TOKEN=1//04xAbCdEfGhIjKlMnOpQrStUvWxYz...
```

---

## Important Reminders

- The Gmail account you use in `MAIL_USER` must be the exact same account you signed into during Step 6. If you sign in as a different account in the Playground, the refresh token will not work.
- Refresh tokens can expire if they are not used for 6 months, or if your app is in Testing mode and the token is older than 7 days. If your emails stop sending, come back to the Playground and generate a new refresh token.
- To make refresh tokens last longer than 7 days, you need to publish your OAuth app. Go to the OAuth consent screen in Google Console and click "Publish App".
- Never share your refresh token. It grants the ability to send emails as you.
