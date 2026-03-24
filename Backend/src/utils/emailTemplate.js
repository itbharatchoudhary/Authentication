export const otpEmailTemplate = ({ name, otp, purpose, expiresInMinutes }) => {
  const title =
    purpose === "registration"
      ? "Verify Your Email"
      : "Reset Your Password";

  const action =
    purpose === "registration"
      ? "complete your registration"
      : "reset your password";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 500px; margin: 40px auto; background: #fff;
                       border-radius: 8px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .otp { font-size: 36px; font-weight: bold; letter-spacing: 8px;
                 color: #4f46e5; text-align: center; padding: 16px 0; }
          .footer { font-size: 12px; color: #999; margin-top: 24px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>${title}</h2>
          <p>Hi ${name || "there"},</p>
          <p>Use the OTP below to ${action}. It expires in <strong>${expiresInMinutes} minutes</strong>.</p>
          <div class="otp">${otp}</div>
          <p>If you did not request this, please ignore this email.</p>
          <div class="footer">This is an automated message. Do not reply.</div>
        </div>
      </body>
    </html>
  `;
};