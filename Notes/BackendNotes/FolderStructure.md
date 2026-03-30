Authentication-Backend/
│
├── Backend/
│   ├── logs/                          # Folder to store server logs
│   │
│   ├── node_modules/                  # Installed npm packages
│   │
│   ├── src/                           # Source code folder
│   │   ├── Config/                    # Configuration files
│   │   │   ├── Database.js            # MongoDB connection setup
│   │   │   ├── GoogleAuth.js          # Google OAuth configuration
│   │   │   ├── Index.js               # Central export for all configs
│   │   │   └── Mailer.js              # Email transporter configuration
│   │   │
│   │   ├── Controllers/               # Handles requests & responses
│   │   │   ├── Auth.controller.js     # Authentication logic (login/register)
│   │   │   ├── OTP.controller.js      # OTP verification logic
│   │   │   └── User.controller.js     # User CRUD operations
│   │   │
│   │   ├── Middleware/                # Express middleware
│   │   │   ├── Auth.middleware.js     # Protect routes and check auth
│   │   │   ├── Error.middleware.js    # Global error handling
│   │   │   └── RateLimit.middleware.js# Rate limiting for endpoints
│   │   │
│   │   ├── Models/                     # Mongoose models
│   │   │   ├── OTP.model.js           # OTP schema
│   │   │   ├── Session.model.js       # Session schema
│   │   │   └── User.model.js          # User schema
│   │   │
│   │   ├── Routes/                     # Route definitions
│   │   │   ├── auth.routes.js         # Routes for login/register/auth
│   │   │   ├── OTP.routes.js          # Routes for OTP verification
│   │   │   └── User.routes.js         # Routes for user management
│   │   │
│   │   ├── Services/                   # Business logic and helpers
│   │   │   ├── Auth.service.js        # Authentication services
│   │   │   ├── OTP.service.js         # OTP services
│   │   │   ├── Token.service.js       # JWT token services
│   │   │   └── User.service.js        # User services
│   │   │
│   │   ├── utils/                      # Utility functions
│   │   │   ├── emailTemplate.js       # Email HTML templates
│   │   │   ├── hash.js                # Hashing utility (passwords, OTP)
│   │   │   └── logger.js              # Logger utility for debug/info
│   │   │
│   │   ├── App.js                      # Express app setup
│   │
│   ├── .env                            # Environment variables
│   ├── .gitignore                      # Git ignore configuration
│   ├── package.json                     # Project dependencies & scripts
│   ├── package-lock.json                # Lock file for npm
│   └── Server.js                        # Entry point: starts the server