src/
│
├── app/                         # 1. App Layer
│   ├── App.jsx
│   ├── routes.jsx
│   ├── providers/
│   │   └── AuthProvider.jsx
│   └── store/                  # (optional: Zustand/Redux)
│       └── authStore.js
│
├── pages/                      # 2. Pages Layer
│   ├── Entry/
│   │   └── EntryPage.jsx
│   │
│   ├── Auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   │
│   ├── Home/
│   │   └── HomePage.jsx
│   │
│   ├── Profile/
│   │   └── ProfilePage.jsx
│
├── features/                   # 3. Features Layer
│   └── auth/
│       ├── api.js              # login/register/logout API calls
│       ├── authService.js      # business logic
│       ├── authSlice.js        # (if using Redux)
│       ├── hooks/
│       │   └── useAuth.js
│       └── components/
│           ├── LoginForm.jsx
│           ├── RegisterForm.jsx
│           └── AuthGuard.jsx   # protected routes
│
├── shared/                     # 4. Shared Layer
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Loader.jsx
│   │
│   ├── lib/
│   │   └── axios.js            # API base config
│   │
│   ├── utils/
│   │   └── validators.js
│   │
│   └── constants/
│       └── routes.js
│
└── assets/
    └── images/