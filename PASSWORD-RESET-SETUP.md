# Password Reset Feature Setup Guide

## ✅ What's Been Added

### New Pages Created:
1. **ForgotPassword.tsx** - Request password reset link
2. **ResetPassword.tsx** - Set new password after clicking email link

### Updated Pages:
1. **Login.tsx** - Added "Forgot password?" link
2. **Signup.tsx** - Added "Reset it here" link
3. **App.tsx** - Added routes for forgot-password and reset-password

## 🔧 Supabase Configuration Required

### Step 1: Configure Email Templates in Supabase Dashboard

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Navigate to **Authentication** → **Email Templates**
4. Find **Reset Password** template

### Step 2: Update the Reset Password Email Template

Make sure the template includes a link like this:
```html
<a href="{{ .SiteURL }}/reset-password?token={{ .Token }}&type=recovery">Reset Password</a>
```

Or use the confirmation URL directly:
```html
<a href="{{ .ConfirmationURL }}">Reset Password</a>
```

### Step 3: Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your application URL:
   - Development: `http://localhost:5173`
   - Production: `https://yourdomain.com`
3. Add **Redirect URLs**:
   - `http://localhost:5173/reset-password`
   - `https://yourdomain.com/reset-password` (for production)

### Step 4: Enable Email Confirmations (Optional)

1. Go to **Authentication** → **Providers** → **Email**
2. Configure:
   - ✅ Enable email provider
   - ✅ Confirm email (optional - for new signups)
   - ✅ Secure email change (recommended)

## 🚀 How It Works

### User Flow:

1. **Request Reset**:
   - User clicks "Forgot password?" on login page
   - Enters their email address
   - Clicks "Send Reset Link"
   - Supabase sends email with reset link

2. **Reset Password**:
   - User clicks link in email
   - Redirected to `/reset-password` page
   - Enters new password (twice for confirmation)
   - Clicks "Reset Password"
   - Redirected to login page

3. **Login with New Password**:
   - User logs in with new credentials

## 🔐 Security Features

- ✅ Token-based authentication via email
- ✅ Automatic token expiration (default: 1 hour)
- ✅ Password validation (minimum 6 characters)
- ✅ Password confirmation matching
- ✅ Secure session handling with PKCE flow
- ✅ Invalid/expired token detection

## 📧 Email Configuration

### Default Supabase Email Service
Supabase provides a default email service for development. For production:

1. **Custom SMTP** (Recommended for production):
   - Go to **Project Settings** → **Auth** → **SMTP Settings**
   - Configure your email provider (SendGrid, AWS SES, etc.)

2. **Email Rate Limits**:
   - Free tier: Limited emails per hour
   - Upgrade for higher limits

## 🧪 Testing

### Test the Flow:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:5173/login`

3. Click "Forgot password?"

4. Enter a valid email address from your users table

5. Check your email inbox for the reset link

6. Click the link and set a new password

7. Login with the new password

### Troubleshooting:

**Email not received?**
- Check spam/junk folder
- Verify email exists in Supabase auth.users table
- Check Supabase logs: Dashboard → Logs → Auth Logs
- Verify Site URL and Redirect URLs are correct

**Invalid token error?**
- Token expires after 1 hour by default
- Request a new reset link
- Check browser console for errors

**Password not updating?**
- Ensure password meets minimum requirements (6+ characters)
- Check Supabase logs for errors
- Verify user session is valid

## 🎨 UI Features

- Responsive design (mobile & desktop)
- Dark mode support
- Loading states
- Error handling with user-friendly messages
- Success notifications
- Password visibility toggle
- Consistent branding with existing pages

## 📝 Code Structure

```
src/
├── pages/
│   ├── ForgotPassword.tsx    # Request reset link
│   ├── ResetPassword.tsx     # Set new password
│   ├── Login.tsx             # Updated with forgot link
│   └── Signup.tsx            # Updated with reset link
├── lib/
│   └── supabase.ts           # Supabase client config
└── App.tsx                   # Routes configuration
```

## 🔄 Next Steps

1. Configure Supabase email templates (see Step 1-4 above)
2. Test the complete flow
3. Customize email templates with your branding
4. Set up custom SMTP for production
5. Monitor auth logs for any issues

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Password Reset Guide](https://supabase.com/docs/guides/auth/auth-password-reset)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
