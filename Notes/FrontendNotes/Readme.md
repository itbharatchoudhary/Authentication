# Authentication Frontend Overview

## **1. App Entry & Routing**

* **`App.jsx`** wraps the entire app in `AuthProvider` so authentication state is accessible throughout.
* **`App.Routes.jsx`** handles routing:

  * Conditional redirects if `isLoggedIn`.
  * Navbar and Footer are only rendered when logged in.
  * Uses `BrowserRouter`, `Routes`, `Route`, and `Navigate` properly.

**Improvement:**
`Navbar.jsx` uses `navigate("/")` but `navigate` is never imported there. You need:

```js
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
```

---

## **2. Authentication Context**

* **`AuthContext.jsx`** manages:

  * `isLoggedIn`, `user`, `token` states.
  * LocalStorage persistence.
  * Theme (`dark`) persistence and toggle.
  * Functions: `login`, `register`, `logout`, `loginWithGoogle`.

**Good:** Async functions properly store token & user in localStorage.
**Improvement:** For security, consider storing JWT in `httpOnly` cookies instead of localStorage. Also, `register` function returns raw API response but doesn’t update auth state — this is fine if OTP verification is required.

---

## **3. Auth Pages**

* **`EntryPage.jsx`**: Landing page with buttons to navigate login/register.
* **`LoginPage.jsx`**:

  * Handles manual login and Google login via `@react-oauth/google`.
  * Proper form validation and API integration.
* **`RegisterPage.jsx`**:

  * Handles manual registration & Google signup.
  * Redirects to OTP verification after manual registration.
* **`VerifyOtpPage.jsx`**:

  * Accepts OTP verification and can resend OTP.
  * Uses `location.state?.email` to prefill email.

✅ Well-structured and uses `AuthLayout` for consistent UI.

---

## **4. Protected Routes**

* **`Protected.jsx`** is set up but uses `useSelector`:

```js
const loading = useSelector((state) => state.auth.loading);
```

* **Issue:** You are not using Redux in this setup, so `useSelector` will fail.
  **Fix:** Remove `useSelector` or implement a `loading` state in your context.

```js
const { user, isLoggedIn } = useAuth();
if (!isLoggedIn) return <Navigate to="/login" replace />;
```

---

## **5. API Layer**

* `Auth.Api.js` wraps `fetch` requests.
* `AuthService.js` provides `loginUser` and `registerUser`.
* `apiRequest` allows passing token in headers.

✅ Solid setup for future expansion.

---

## **6. Theme Handling**

* `AuthLayout.jsx` and `Navbar.jsx` handle dark/light themes with `localStorage`.
* Smooth transitions with Tailwind.

**Observation:**
You have `dark` state in both `AuthLayout` and `AuthContext`. Might want to consolidate to only `AuthContext` for global theme management.

---

## **7. Home Page**

* `HomePage.jsx` is simple, centered, and styled nicely.
* Explains project purpose in 30 words.

---

## **8. Footer & Navbar**

* Both components are styled and responsive.
* Navbar shows live time.
* Footer includes social links and navigation.

