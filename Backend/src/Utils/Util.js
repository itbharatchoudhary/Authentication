export function generateOTP(length = 6) {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  return otp;
}
export function getOtpHtml(otp) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Verification Code</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">
    
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          
          <table width="500" style="background:#ffffff; margin-top:40px; border-radius:10px; padding:30px;">
            
            <tr>
              <td align="center">
                <h2 style="color:#333;">Verify Your Email</h2>
                <p style="color:#666; font-size:14px;">
                  Use the verification code below to complete your request.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:20px 0;">
                <div style="
                  display:inline-block;
                  padding:15px 30px;
                  font-size:24px;
                  letter-spacing:5px;
                  background:#f1f3f5;
                  border-radius:8px;
                  font-weight:bold;
                  color:#333;
                ">
                  ${otp}
                </div>
              </td>
            </tr>

            <tr>
              <td align="center">
                <p style="color:#999; font-size:13px;">
                  This code will expire in 5 minutes.
                </p>
                <p style="color:#999; font-size:13px;">
                  If you didn’t request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding-top:20px;">
                <p style="font-size:12px; color:#bbb;">
                  © ${new Date().getFullYear()} Authentication. All rights reserved.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
}