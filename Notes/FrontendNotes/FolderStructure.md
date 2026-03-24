Frontend/
│
├── public/ # Static files (favicon, index.html)
│
├── src/
│ │
│ ├── app/ # App-level setup
│ │ ├── App.jsx
│ │ ├── routes.jsx # All routes (centralized)
│ │ ├── store.js (optional) # Redux/Zustand store
│ │ └── providers.jsx # Context providers
│ │
│ ├── assets/ # Images, icons, logos
│ │ ├── images/
│ │ ├── icons/
│ │ └── styles/
│ │
│ ├── Components/ # Reusable global components
│ │ ├── Ui/
│ │ │ ├── Button.jsx
│ │ │ ├── Input.jsx
│ │ │ ├── Loader.jsx
│ │ │ └── Modal.jsx
│ │ │
│ │ ├── Layout/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ └── AuthLayout.jsx
│ │ │
│ │ └── Common/
│ │ ├── ProtectedRoute.jsx
│ │ └── ErrorBoundary.jsx
│ │
│ ├── Features/ # Feature-based modular structure
│ │
│ │ ├── Auth/ # 🔐 Authentication feature
│ │ │ ├── Pages/
│ │ │ │ ├── Login.jsx
│ │ │ │ ├── Register.jsx
│ │ │ │ ├── VerifyOTP.jsx
│ │ │ │ └── ForgotPassword.jsx
│ │ │ │
│ │ │ ├── Components/
│ │ │ │ ├── AuthForm.jsx
│ │ │ │ ├── OTPInput.jsx
│ │ │ │ └── SocialLogin.jsx
│ │ │ │
│ │ │ ├── Services/
│ │ │ │ └── Auth.api.js # API calls
│ │ │ │
│ │ │ ├── Hooks/
│ │ │ │ └── UseAuth.js
│ │ │ │
│ │ │ └── AuthSlice.js (if Redux)
│ │
│ │ ├── User/ # 👤 User feature
│ │ │ ├── Pages/
│ │ │ │ └── Profile.jsx
│ │ │ │
│ │ │ ├── Components/
│ │ │ │ └── ProfileCard.jsx
│ │ │ │
│ │ │ ├── Services/
│ │ │ │ └── User.api.js
│ │ │ │
│ │ │ └── Hooks/
│ │ │ └── UseUser.js
│ │
│ │ ├── Home/ # 🏠 Main app after login
│ │ │ ├── Pages/
│ │ │ │ └── Home.jsx
│ │ │ │
│ │ │ └── Components/
│ │ │ └── HomeHero.jsx
│ │
│ │ └── Landing/ # 🌐 First entry page
│ │ ├── Pages/
│ │ │ └── Landing.jsx
│ │ │
│ │ └── Components/
│ │ ├── HeroSection.jsx
│ │ └── CTAButtons.jsx
│ │
│ ├── Services/ # Global API config
│ │ ├── Axios.js
│ │ └── Interceptors.js
│ │
│ ├── Hooks/ # Global reusable hooks
│ │ ├── UseDebounce.js
│ │ └── UseLocalStorage.js
│ │
│ ├── Utils/ # Helper functions
│ │ ├── Validators.js
│ │ ├── Constants.js
│ │ └── Formatters.js
│ │
│ ├── Styles/ # Global styles
│ │ ├── Globals.css
│ │ └── Variables.css
│ │
│ ├── Index.js # Entry point
│ └── Main.jsx (if Vite)
│
├── .env
├── .gitignore
├── package.json
└── README.md
