# Authentication Backend Overview

This backend is a **Node.js / Express.js API** for a full-featured authentication system, supporting **manual email/password login**, **Google OAuth login**, **OTP-based verification**, and **password recovery**. It uses **MongoDB** for storing users, sessions, and OTPs.

---

## **1. Configuration (src/Config)**

* **Index.js** – Reads environment variables like database URI, JWT secrets, Google OAuth keys, email credentials, and OTP expiration time.
* **Database.js** – Connects to MongoDB using Mongoose and logs connection status.
* **GoogleAuth.js** – Handles Google OAuth token verification.
* **Mailer.js** – Sends emails (verification OTPs or password reset emails) using Gmail OAuth2.

---

## **2. Models (src/Models)**

* **User.model.js** – Stores user info: name, email, password, avatar, Google ID, role, and verification status.
* **Session.model.js** – Tracks user sessions using refresh tokens, device info, IP, and expiration.
* **OTP.model.js** – Stores OTP codes for email verification and password reset. OTPs auto-expire and have attempt limits.

---

## **3. Services (src/Services)**

* **User.service.js** – Functions for creating users, finding users by email or ID, updating passwords, and marking verification.
* **Auth.service.js** – Handles registration, login (manual & Google), email verification, password reset, and token issuance.
* **OTP.service.js** – Creates, sends, and verifies OTPs with attempt and expiry handling.
* **Token.service.js** – Generates JWT access & refresh tokens, verifies tokens, saves sessions, and revokes sessions.

---

## **4. Controllers (src/Controllers)**

Controllers handle API requests and responses:

* **Auth.controller.js** – Routes for register, login, Google login, email verification, refresh token, logout, forgot password, and reset password.
* **User.controller.js** – Routes to get the current user, list all users (admin only), and delete a user (admin only).
* **OTP.controller.js** – Handles resending OTPs for email verification or password reset.

---

## **5. Middleware (src/Middleware)**

Middleware adds extra functionality to requests:

* **Auth.middleware.js** – Protects routes with authentication and role-based authorization.
* **Error.middleware.js** – Handles errors and 404 routes gracefully.
* **RateLimit.middleware.js** – Limits requests for OTPs, authentication attempts, and general API calls to prevent abuse.

---

## **6. Utilities (src/utils)**

* **hash.js** – Handles hashing & comparing passwords and OTPs using bcrypt.
* **emailTemplate.js** – Provides styled HTML templates for OTP emails.
* **logger.js** – Logs info, warnings, and errors using Winston. Different formats for development vs production.

---

## **7. Routes (src/Routes)**

* **auth.routes.js** – Handles registration, login, Google OAuth, password recovery, and token management endpoints.
* **User.routes.js** – Handles user profile and admin-only routes.
* **OTP.routes.js** – Handles resending OTPs.

---

## **8. App Setup (src/App.js)**

* Sets up Express app, global middlewares (CORS, JSON parsing, rate limiting), health check, API routes, and error handling.

---

## **9. Server (Server.js)**

* Connects to MongoDB.
* Starts the Express server on the configured port.
* Logs success or failure.

---

## **10. Key Features**

* **Manual Registration/Login** with email verification.
* **Google OAuth Login**.
* **JWT-based authentication** with access & refresh tokens.
* **Session management** – users can log out and refresh tokens.
* **OTP-based email verification** for registration & password reset.
* **Rate limiting** to prevent brute-force attacks.
* **Admin functionalities** – list and delete users.
* **Secure password storage** using bcrypt.
* **Detailed logging** for debugging & monitoring.

