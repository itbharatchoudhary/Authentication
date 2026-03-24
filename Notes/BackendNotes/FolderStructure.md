Backend/
│
├── node_modules/
├── logs/
│
├── src/
│   │
│   ├── config/                 # All configuration files
│   │   ├── config.js
│   │   ├── database.js
│   │   ├── googleAuth.js
│   │   ├── mailer.js
│   │   └── index.js
│   │
│   ├── controllers/            # Handle request & response
│   │   ├── auth.controller.js
│   │   ├── otp.controller.js
│   │   └── user.controller.js
│   │
│   ├── services/               # Business logic
│   │   ├── auth.service.js
│   │   ├── otp.service.js
│   │   ├── token.service.js
│   │   └── user.service.js
│   │
│   ├── models/                 # Database schemas
│   │   ├── user.model.js
│   │   ├── otp.model.js
│   │   └── session.model.js
│   │
│   ├── routes/                 # API routes
│   │   ├── auth.routes.js
│   │   ├── otp.routes.js
│   │   └── user.routes.js
│   │
│   ├── middleware/             # Middlewares
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── rateLimit.middleware.js
│   │
│   ├── utils/                  # Helper functions
│   │   ├── hash.js
│   │   ├── logger.js
│   │   └── emailTemplate.js
│   │
│   ├── app.js                  # Express app setup
│   │
│   └── server.js               # Server start file
│
├── .env                        # Environment variables
├── .gitignore
├── package.json
└── package-lock.json