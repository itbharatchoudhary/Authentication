# README — OTP & Client URL Configuration
### Variables: `OTP_EXPIRES_IN_MINUTES` · `CLIENT_URL`

---

## What Is This Section?

This section has two simple variables that you define yourself — no external service, no account, and no key generation required.

`OTP_EXPIRES_IN_MINUTES` controls how long a one-time password (OTP) remains valid before it expires.

`CLIENT_URL` tells your backend server where your frontend application is running, so it can generate correct links in emails and handle things like CORS properly.

---

## OTP_EXPIRES_IN_MINUTES

An OTP (One-Time Password) is a short, temporary code sent to a user's email or phone to verify their identity. This variable sets how many minutes that code is valid for before it becomes useless.

**How to set it:**

Step 1 — Open your `.env` file.

Step 2 — Decide how long you want OTPs to stay valid. The template already provides `10` minutes as a sensible default. You do not need to change it unless you have a specific reason.

Step 3 — Make sure it is set like this:

```
OTP_EXPIRES_IN_MINUTES=10
```

Step 4 — If you want a shorter window for tighter security, you can reduce it to `5`. If your users report that they do not have enough time to check their email, you can increase it to `15` or `20`.

> This is just a number. There is no website to visit. You type it yourself.

---

## CLIENT_URL

This is the base URL of your frontend application. Your backend uses this in two main ways:

First, when your server sends emails that contain links (like a password-reset link or an email-verification link), it needs to know what domain to build those links with.

Second, many backend frameworks use this URL for CORS (Cross-Origin Resource Sharing) — it tells the server which origin is allowed to make requests to it.

---

**For Local Development:**

Step 1 — Find out which port your frontend runs on. If you are using React (Create React App), it defaults to port `3000`. If you are using Vite, it defaults to `5173`. Check your frontend's startup logs or `package.json` to confirm.

Step 2 — Set `CLIENT_URL` to your local frontend address:

```
CLIENT_URL=http://localhost:3000
```

Replace `3000` with whatever port your frontend uses.

---

**For Production (Deployed App):**

Step 1 — Deploy your frontend to a hosting service. Free and beginner-friendly options include:

- Vercel: https://vercel.com
- Netlify: https://www.netlify.com
- Render (Static Sites): https://render.com

Step 2 — After deploying, your hosting provider will give you a URL. It will look something like `https://my-app.vercel.app` or `https://my-app.netlify.app`.

Step 3 — Go to your backend hosting platform's environment variables settings and update `CLIENT_URL` to that production URL:

```
CLIENT_URL=https://my-app.vercel.app
```

Step 4 — Do not include a trailing slash at the end of the URL. Write `https://my-app.vercel.app` and not `https://my-app.vercel.app/`.

---

## Final Result for This Section

For local development:

```
OTP_EXPIRES_IN_MINUTES=10
CLIENT_URL=http://localhost:3000
```

For production:

```
OTP_EXPIRES_IN_MINUTES=10
CLIENT_URL=https://your-deployed-frontend.vercel.app
```

---

## Important Reminders

- If your backend returns CORS errors in the browser console, the most common cause is that `CLIENT_URL` does not exactly match the URL your frontend is running on — including the protocol and port.
- When moving from development to production, remember to update `CLIENT_URL` on your server. Leaving it as `http://localhost:3000` in production will cause email links to point to nowhere.
- OTP codes should always be hashed before storing them in the database, not stored as plain text. The `OTP_EXPIRES_IN_MINUTES` value should be checked against the stored timestamp in your database logic, not trusted from the client.
