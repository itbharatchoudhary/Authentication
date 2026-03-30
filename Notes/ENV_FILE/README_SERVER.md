# README — Server Configuration
### Variables: `PORT` · `NODE_ENV`

---

## What Is This Section?

This section tells your Node.js application two fundamental things — which network port to listen on, and what environment it is running in. Neither of these values requires any external service or account. You define them yourself.

---

## PORT

`PORT` is the network port your server will bind to when it starts. Think of it like a door number on a building — clients knock on that door to reach your app.

**How to set it:**

Step 1 — Open your `.env` file in any text editor.

Step 2 — Decide which port number you want your server to run on. The most common choices for local development are `3000`, `4000`, `5000`, or `8080`. None of these are wrong; pick whichever is not already occupied on your machine.

Step 3 — Write it like this:

```
PORT=5000
```

Step 4 — If you later get an error that says "port already in use", simply change this number to something else and restart the server.

> There is no website to visit for this. It is just a number you choose.

---

## NODE_ENV

`NODE_ENV` tells your application which mode it is operating in. Libraries, frameworks, and your own code often behave differently depending on this value — for example, showing detailed error messages only when in development mode, or turning on performance optimisations only in production.

**How to set it:**

Step 1 — Open your `.env` file.

Step 2 — There are exactly three accepted values for this variable. Choose the one that matches your situation:

- Use `development` when you are coding and testing locally on your own machine.
- Use `test` when you are running automated tests.
- Use `production` when the application is deployed and live for real users.

Step 3 — For local development (which is where you are starting), write it like this:

```
NODE_ENV=development
```

Step 4 — When you deploy your application to a hosting platform like Render, Railway, or Heroku, go to that platform's environment variables settings and change this value to `production`.

> This is also just a word you type yourself. No account or key is needed.

---

## Final Result for This Section

```
PORT=5000
NODE_ENV=development
```

---

## Notes

- Never set `NODE_ENV=production` on your local machine during development. Many tools skip helpful debugging output when they detect production mode.
- The `PORT` value on cloud hosting platforms is usually set automatically by the platform itself. On Render or Railway, they inject `PORT` for you, so you may not need to set it manually there.
