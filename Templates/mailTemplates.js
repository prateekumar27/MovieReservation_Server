export const emailVerificationTemplate = ({ userName, verifyUrl }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f0f2f5;">

  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 6px 16px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background-color: #2c3e50; color: #ffffff; padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 28px;">Welcome to <span style="color: #f39c12;">Cinemax</span>, ${userName}!</h1>
    </div>

    <div style="padding: 20px 30px; color: #333;">
      <p style="font-size: 16px;">Welcome to the cinemax family – we're glad you're here! 🎉</p>
      <p style="font-size: 15px;">Cinemax is your ultimate hub for exploring, reserving, and experiencing the newest hits at theaters near you.</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">

      <p style="font-size: 15px;">To get started, please verify your email by clicking the button below:</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${verifyUrl}" style="background-color: #e67e22; color: white; text-decoration: none; padding: 12px 24px; font-size: 16px; border-radius: 6px;">Verify Your Email</a>
      </div>

      <p style="font-size: 14px;">If you didn’t sign up for a Cinemax account, feel free to disregard this message.</p>
    </div>

    <div style="background-color: #f9f9f9; padding: 15px 20px; text-align: center; font-size: 13px; color: #888;">
      <p>Need help? Just reply to this email and we’re here to help anytime.</p>
      <p>— The Cinemax Team</p>
    </div>
  </div>

</body>
</html>
`;


//otp verification

export const otpVerificationTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset OTP</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">

  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 30px; text-align: center;">

    <h2 style="color: #333333; margin-top: 0;">Verify Your Email Address</h2>
    <p style="font-size: 16px; color: #555555; line-height: 1.5;">
     Your OTP is
    </p>

    <p style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">{otp}</p>

   

    <p style="font-size: 14px; color: #999999; margin-top: 30px;">
      If you didn’t create an account, you can ignore this email.
    </p>
  </div>

  <!-- Footer -->
  <div style="max-width: 600px; margin: 0 auto; text-align: center; font-size: 12px; color: #888888; padding: 15px;">
    &copy; 2025 Your Company. All rights reserved.
  </div>

</body>
</html>

`;
