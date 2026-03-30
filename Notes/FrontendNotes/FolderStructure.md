Authentication/
└── Frontend/
    ├── node_modules/                 # Installed npm dependencies (auto-generated)
    ├── public/                      # Static assets (images, icons, etc.)
    │
    ├── src/
    │   ├── App/
    │   │   ├── App.jsx              # Root React component that wraps the entire application
    │   │   └── App.Routes.jsx       # Defines all application routes using React Router
    │   │
    │   ├── Features/
    │   │   ├── Auth/
    │   │   │   ├── Components/
    │   │   │   │   ├── AuthLayout.jsx   # Layout wrapper for authentication pages (login/register UI structure)
    │   │   │   │   └── Protected.jsx    # Route guard component to restrict access to authenticated users only
    │   │   │   │
    │   │   │   ├── Context/
    │   │   │   │   └── AuthContext.jsx  # Global authentication state management using React Context API
    │   │   │   │
    │   │   │   ├── Hooks/
    │   │   │   │   └── UseAuth.js       # Custom hook to access and manage authentication logic easily
    │   │   │   │
    │   │   │   ├── Pages/
    │   │   │   │   ├── EntryPage.jsx    # Entry/landing page for authentication (choose login/register)
    │   │   │   │   ├── LoginPage.jsx    # User login page with email/password and Google login
    │   │   │   │   ├── RegisterPage.jsx # User registration page for creating a new account
    │   │   │   │   └── VerifyOtpPage.jsx# OTP verification page after registration
    │   │   │   │
    │   │   │   ├── Services/
    │   │   │   │   ├── Auth.Api.js      # Handles API calls related to authentication (Axios requests)
    │   │   │   │   └── AuthService.js   # Business logic layer for authentication operations
    │   │   │
    │   │   ├── Home/
    │   │   │   ├── Components/
    │   │   │   │   ├── Footer.jsx       # Footer UI component for the application
    │   │   │   │   └── Navbar.jsx       # Navigation bar with links and user actions
    │   │   │   │
    │   │   │   └── Pages/
    │   │   │       └── HomePage.jsx     # Main landing/home page after user login
    │   │
    │   ├── Styles/
    │   │   ├── index.css               # Global styles and base CSS rules
    │   │   └── variables.css           # CSS variables (themes, colors, dark/light mode)
    │   │
    │   └── main.jsx                   # Application entry point (React DOM rendering)
    │
    ├── .env                          # Environment variables (API URLs, keys)
    ├── .gitignore                    # Files/folders ignored by Git
    ├── eslint.config.js              # ESLint configuration for code quality and linting
    ├── index.html                    # Main HTML template used by Vite
    ├── package.json                  # Project metadata and dependencies
    ├── package-lock.json             # Dependency lock file for consistent installs
    └── vite.config.js                # Vite configuration for fast development and build