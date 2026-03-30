# Authentication system flow 

##   Manually Registration/login  Flow
User → Register (email, password)
   ↓
Create User (isVerified = false)
   ↓
Generate OTP (store hashed)
   ↓
Send Email OTP
   ↓
User enters OTP
   ↓
Verify OTP
   ↓
User → Enter email + password
   ↓
Find user
   ↓
Check password (bcrypt compare)
   ↓
Check isVerified
   ↓
Generate tokens
   ↓
Login success 

## Google OAuth Login Flow

User → Click "Login with Google"
   ↓
Frontend gets Google ID Token
   ↓
Backend verifies token (Google API)
   ↓
Check user in DB
   ↓
IF exists → Login
ELSE → Create new user (isVerified = true)
   ↓
Generate Access + Refresh Token
   ↓
User Logged In 






