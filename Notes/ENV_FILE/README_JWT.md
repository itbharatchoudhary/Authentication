# README — JWT Configuration
### Variables: `JWT_ACCESS_SECRET` · `JWT_REFRESH_SECRET` · `JWT_ACCESS_EXPIRES_IN` · `JWT_REFRESH_EXPIRES_IN`

---

## What Is This Section?

JWT stands for JSON Web Token. It is the standard way modern APIs handle authentication — instead of storing sessions on the server, you issue a signed token to the user, and they send it back with every request to prove who they are.

You will need two secrets and two expiry durations. The secrets are strings you generate yourself. The expiry values are already filled in for you in the template.

---

## Understanding the Two Token Types

Your application uses a two-token system:

An **Access Token** is short-lived. It is sent with every API request to verify the user's identity. Because it expires quickly (15 minutes by default), a stolen token has a short window of usefulness.

A **Refresh Token** is long-lived. It is stored securely and used only to request a new access token when the current one expires. This way the user does not have to log in every 15 minutes.

---

## JWT_ACCESS_SECRET

This is a secret string used to sign and verify access tokens. Anyone who knows this string can forge tokens, so keep it private and make it long and random.

**How to generate it:**

Step 1 — Open your terminal (Command Prompt, PowerShell, or any terminal on Mac/Linux).

Step 2 — If you have Node.js installed, run this command:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Step 3 — You will get a long string of random characters output in the terminal. It will look something like this:

```
a3f9c2d17e84b056f3cc19a2471d8e90b6f2134d78901abc23def456789012345...
```

Step 4 — Copy that entire output string.

Step 5 — Paste it into your `.env` file like this:

```
JWT_ACCESS_SECRET=a3f9c2d17e84b056f3cc19a2471d8e90b6f2134d78901abc...
```

> If you do not have Node.js, you can use this online generator: https://generate-secret.vercel.app/64
> That page generates a cryptographically random 64-character hex string. Click "Generate" and copy the result.

---

## JWT_REFRESH_SECRET

This is a separate secret used to sign and verify refresh tokens. It must be different from your access token secret. Using the same secret for both defeats the purpose of having two separate token types.

**How to generate it:**

Step 1 — Run the exact same command again in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Step 2 — You will get a new, completely different random string.

Step 3 — Paste it into your `.env` file:

```
JWT_REFRESH_SECRET=b7e0d3a1f942c867e10245abc8d73e21f5c190de45678012...
```

Make absolutely sure this string is different from the one you used for `JWT_ACCESS_SECRET`.

---

## JWT_ACCESS_EXPIRES_IN

This tells your JWT library how long an access token is valid before it expires.

The value `15m` means 15 minutes. This is already set in your template and is the industry-recommended default. You do not need to change it.

```
JWT_ACCESS_EXPIRES_IN=15m
```

If you want to experiment, the format supports: `s` for seconds, `m` for minutes, `h` for hours, `d` for days. For example: `30m`, `1h`, `2d`.

---

## JWT_REFRESH_EXPIRES_IN

This tells your JWT library how long a refresh token is valid. After this duration, the user must log in again from scratch.

The value `7d` means 7 days. This is already set in your template. You do not need to change it.

```
JWT_REFRESH_EXPIRES_IN=7d
```

---

## Final Result for This Section

```
JWT_ACCESS_SECRET=<your generated 64-byte hex string>
JWT_REFRESH_SECRET=<your second generated 64-byte hex string>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## Important Reminders

- Generate the two secrets separately. Run the command twice and get two different strings.
- Never use a short, guessable string like `secret` or `mysecret` as your JWT secret. This is a serious security vulnerability.
- If you ever suspect your secrets have been exposed or leaked, generate new ones immediately and restart your server. All existing tokens will be invalidated automatically.
- These secrets live only in your `.env` file and your server's environment variables. They are never sent to the client.
