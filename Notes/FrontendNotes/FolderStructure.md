Frontend/
│
├── public/                         # Static files (favicon, index.html)
│
├── src/
│   │
│   ├── app/                        # App-level setup
│   │   ├── App.jsx
│   │   ├── routes.jsx              # All routes (centralized)
│   │   ├── store.js (optional)     # Redux/Zustand store
│   │   └── providers.jsx           # Context providers
│   │
│   ├── assets/                     # Images, icons, logos
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │
│   ├── Components/                 # Reusable global components
│   │   ├── Ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── AuthLayout.jsx
│   │   │
│   │   └── Common/
│   │       ├── ProtectedRoute.jsx
│   │       └── ErrorBoundary.jsx
│   │
│   ├── features/                   # Feature-based modular structure (BEST PRACTICE)
│   │
│   │   ├── auth/                  # 🔐 Authentication feature
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── VerifyOTP.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── AuthForm.jsx
│   │   │   │   ├── OTPInput.jsx
│   │   │   │   └── SocialLogin.jsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── auth.api.js     # API calls
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js
│   │   │   │
│   │   │   └── authSlice.js (if Redux)
│   │
│   │   ├── user/                  # 👤 User feature
│   │   │   ├── pages/
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   ├── components/
│   │   │   │   └── ProfileCard.jsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── user.api.js
│   │   │   │
│   │   │   └── hooks/
│   │   │       └── useUser.js
│   │
│   │   ├── home/                  # 🏠 Main app after login
│   │   │   ├── pages/
│   │   │   │   └── Home.jsx
│   │   │   │
│   │   │   └── components/
│   │   │       └── HomeHero.jsx
│   │
│   │   └── landing/               # 🌐 First entry page
│   │       ├── pages/
│   │       │   └── Landing.jsx
│   │       │
│   │       └── components/
│   │           ├── HeroSection.jsx
│   │           └── CTAButtons.jsx
│   │
│   ├── services/                  # Global API config
│   │   ├── axios.js
│   │   └── interceptors.js
│   │
│   ├── hooks/                     # Global reusable hooks
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   │
│   ├── utils/                     # Helper functions
│   │   ├── validators.js
│   │   ├── constants.js
│   │   └── formatters.js
│   │
│   ├── styles/                    # Global styles
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── index.js                   # Entry point
│   └── main.jsx (if Vite)
│
├── .env
├── .gitignore
├── package.json
└── README.md