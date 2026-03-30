# Environment Configuration Guide
### Complete `.env` Setup — Step by Step

---

## Overview

This repository is split into six focused README files — one for every section of the `.env` file. Each guide explains exactly what the variable does, why it exists, and how to get its value, broken down into the smallest possible steps.

No prior experience is assumed. Work through them in order.

---

## Reading Order

Work through these in sequence. Some later sections depend on things set up in earlier ones (notably, the Mail section reuses credentials from the Google OAuth section).

---

**README 1 — Server**
File: `README_1_SERVER.md`

Covers `PORT` and `NODE_ENV`. These are values you define yourself with no external service required. Start here.

---

**README 2 — Database**
File: `README_2_DATABASE.md`

Covers `MONGO_URI`. Walks you through creating a free MongoDB Atlas account, setting up a cluster, creating a database user, configuring network access, and copying your connection string.

Reference: https://www.mongodb.com/cloud/atlas/register

---

**README 3 — JWT**
File: `README_3_JWT.md`

Covers `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRES_IN`, and `JWT_REFRESH_EXPIRES_IN`. Explains the two-token authentication pattern and shows you how to generate cryptographically secure secrets from your terminal.

Reference: https://generate-secret.vercel.app/64

---

**README 4 — Google OAuth**
File: `README_4_GOOGLE_OAUTH.md`

Covers `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REDIRECT_URI`. Walks you through creating a Google Cloud project, configuring the OAuth consent screen, and generating credentials.

Reference: https://console.cloud.google.com

---

**README 5 — Mail**
File: `README_5_MAIL.md`

Covers `MAIL_USER`, `MAIL_CLIENT_ID`, `MAIL_CLIENT_SECRET`, and `MAIL_REFRESH_TOKEN`. This section builds on README 4. It shows you how to enable the Gmail API and use the OAuth2 Playground to generate a refresh token so your app can send emails.

Reference: https://developers.google.com/oauthplayground

---

**README 6 — OTP and Client URL**
File: `README_6_OTP_CLIENT.md`

Covers `OTP_EXPIRES_IN_MINUTES` and `CLIENT_URL`. Both are values you set yourself. This guide explains what each one controls and how to update them when moving from local development to production.

---

## Complete `.env` Template

Once you have finished all six guides, your `.env` file should be fully populated. Here is the complete template for reference:

```
# Server
PORT=5000
NODE_ENV=development

# Database (MongoDB)
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?retryWrites=true&w=majority

# JWT
JWT_ACCESS_SECRET=<64-byte hex string>
JWT_REFRESH_SECRET=<64-byte hex string — different from the one above>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# Mail (Gmail OAuth2)
MAIL_USER=youremail@gmail.com
MAIL_CLIENT_ID=<same as GOOGLE_CLIENT_ID>
MAIL_CLIENT_SECRET=<same as GOOGLE_CLIENT_SECRET>
MAIL_REFRESH_TOKEN=<from OAuth2 Playground>

# OTP
OTP_EXPIRES_IN_MINUTES=10

# Client
CLIENT_URL=http://localhost:3000
```

---

## Security Checklist Before Going Live

Before deploying your application, go through each of these:

- Confirm `.env` is listed in your `.gitignore` file and has never been committed to Git.
- Change `NODE_ENV` from `development` to `production` on your hosting platform.
- Restrict your MongoDB Atlas network access to your server's specific IP address only.
- Remove `0.0.0.0/0` from MongoDB Atlas Network Access if you added it during development.
- Update `CLIENT_URL` to your real deployed frontend URL.
- Update `GOOGLE_REDIRECT_URI` to your real deployed backend callback URL.
- Publish your Google OAuth consent screen so all users (not just test users) can sign in.
- Confirm your Gmail OAuth2 refresh token was generated against a published app so it does not expire every 7 days.
