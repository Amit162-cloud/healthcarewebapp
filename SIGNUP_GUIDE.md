# Signup Feature Guide

## ✅ What's New

You now have a complete user registration system!

## 🎯 Features

### Signup Page (`/signup`)
- ✅ Full name input
- ✅ Email address
- ✅ Password with strength requirement (min 6 characters)
- ✅ Confirm password validation
- ✅ Role selection (Doctor, Nurse, Admin, etc.)
- ✅ Hospital/Organization
- ✅ Phone number
- ✅ Show/hide password toggles
- ✅ Real-time validation
- ✅ Error handling
- ✅ Success messages

### Integration
- ✅ Supabase authentication
- ✅ User metadata stored (name, role, hospital, phone)
- ✅ Auto-login after successful signup
- ✅ Email confirmation support (if enabled in Supabase)
- ✅ Link from Login page to Signup
- ✅ Link from Signup page to Login

## 🚀 How to Use

### For Users:

1. **Go to Signup Page**
   - Visit: `http://localhost:5173/signup`
   - Or click "Sign up" link on the login page

2. **Fill in the Form**
   - Full Name (required)
   - Email (required)
   - Password (required, min 6 characters)
   - Confirm Password (required, must match)
   - Role (optional, e.g., "Doctor", "Nurse", "Admin")
   - Hospital (optional)
   - Phone (optional)

3. **Submit**
   - Click "Create Account"
   - Wait for confirmation
   - You'll be automatically logged in and redirected to the dashboard

### Email Confirmation

Depending on your Supabase settings:

**If email confirmation is DISABLED** (default):
- User is created and auto-logged in immediately
- Redirected to dashboard

**If email confirmation is ENABLED**:
- User receives a confirmation email
- Must click the link in the email to activate account
- Then can login normally

## ⚙️ Supabase Configuration

### To Disable Email Confirmation (Easier for Testing):

1. Go to your Supabase Dashboard
2. Navigate to: Authentication → Settings
3. Find "Enable email confirmations"
4. Toggle it OFF
5. Save changes

This allows users to signup and login immediately without email verification.

### To Enable Email Confirmation (More Secure):

1. Go to your Supabase Dashboard
2. Navigate to: Authentication → Settings
3. Find "Enable email confirmations"
4. Toggle it ON
5. Configure your email templates (optional)
6. Save changes

Users will need to verify their email before they can login.

## 🔒 Security Features

- ✅ Password minimum length (6 characters)
- ✅ Password confirmation matching
- ✅ Email format validation
- ✅ Secure password storage (handled by Supabase)
- ✅ User metadata encryption
- ✅ Protected routes (authenticated users only)

## 📝 User Metadata Stored

When a user signs up, the following information is stored in their Supabase profile:

```json
{
  "name": "Dr. John Doe",
  "role": "Doctor",
  "hospital": "City General Hospital",
  "phone": "+91 98765 43210"
}
```

This data is accessible throughout the app via the `useAuth()` hook:

```typescript
const { user } = useAuth();
console.log(user.name);     // "Dr. John Doe"
console.log(user.role);     // "Doctor"
console.log(user.hospital); // "City General Hospital"
```

## 🎨 UI Features

- Responsive design (works on mobile, tablet, desktop)
- Dark mode support
- Loading states
- Error messages
- Success confirmations
- Password visibility toggles
- Form validation feedback
- Branded with Mint Health Hub theme

## 🔗 Navigation

- **From Login to Signup**: Click "Sign up" link
- **From Signup to Login**: Click "Sign in" link
- **After Signup**: Auto-redirect to dashboard (if no email confirmation needed)

## 🐛 Troubleshooting

### "Email already registered"
- This email is already in use
- Try logging in instead
- Or use a different email

### "Password too weak"
- Password must be at least 6 characters
- Consider using a mix of letters, numbers, and symbols

### "Passwords don't match"
- Make sure both password fields are identical
- Check for extra spaces

### "Failed to create account"
- Check your internet connection
- Verify Supabase credentials in `.env`
- Check Supabase dashboard for any issues

### Email confirmation not received
- Check spam/junk folder
- Verify email settings in Supabase dashboard
- Consider disabling email confirmation for testing

## 🧪 Testing

### Test Signup Flow:

1. Start the dev server: `npm run dev`
2. Go to: `http://localhost:5173/signup`
3. Fill in the form with test data
4. Submit
5. Verify you're logged in and redirected

### Test Data Example:

```
Name: Dr. Test User
Email: test@example.com
Password: test123
Role: Doctor
Hospital: Test Hospital
Phone: +91 98765 43210
```

## 📱 Access from Network

The signup page is also accessible from other devices:

- **Your laptop**: `http://localhost:5173/signup`
- **Other devices**: `http://192.168.120.205:5173/signup`

## 🎉 Summary

You now have a complete authentication system with:
- ✅ Login page
- ✅ Signup page
- ✅ User profile management
- ✅ Secure authentication
- ✅ User metadata storage
- ✅ Email confirmation support
- ✅ Beautiful UI

Users can now create their own accounts without needing admin intervention!
