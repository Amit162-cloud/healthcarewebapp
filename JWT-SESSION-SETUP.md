# 🔐 JWT Token & 7-Day Session Setup

## ✅ What's Already Done

Your app is already configured to:
- ✅ Store JWT tokens automatically (Supabase handles this)
- ✅ Persist sessions in localStorage
- ✅ Auto-refresh tokens before expiry
- ✅ Keep users logged in across browser restarts

## 🎯 Configure 7-Day Session in Supabase

### Step 1: Open Supabase Settings

1. Go to: https://supabase.com/dashboard/project/zvbpgznlzzzfzwfyhshj
2. Click **"Authentication"** in the left sidebar
3. Click **"Settings"** tab (or "Configuration")

### Step 2: Update JWT Settings

Look for these settings and update them:

#### JWT Expiry (Access Token)
- **Setting**: "JWT expiry limit"
- **Change to**: `604800` (7 days in seconds)
- **Default**: Usually 3600 (1 hour)

#### Refresh Token Expiry
- **Setting**: "Refresh token expiry"
- **Change to**: `604800` (7 days in seconds)
- **Or**: Keep it longer like `2592000` (30 days)

### Step 3: Save Changes

1. Scroll to bottom
2. Click **"Save"** button
3. Wait for confirmation

---

## 📊 How It Works

### JWT Token Flow:

```
User Signs Up/Logs In
        ↓
Supabase creates JWT token (expires in 7 days)
        ↓
Token stored in localStorage (key: 'mint-health-hub-auth')
        ↓
Every API request includes the token
        ↓
Token auto-refreshes before expiry
        ↓
User stays logged in for 7 days
```

### What Happens:

1. **Sign Up/Login**: 
   - User enters credentials
   - Supabase validates and creates JWT token
   - Token stored in browser localStorage
   - User profile loaded from database

2. **Session Persistence**:
   - Token saved with key: `mint-health-hub-auth`
   - Survives browser close/reopen
   - Survives page refresh
   - Lasts 7 days

3. **Auto-Refresh**:
   - Before token expires, Supabase auto-refreshes it
   - User never notices
   - Seamless experience

4. **Logout**:
   - Manual logout clears token
   - Or token expires after 7 days of inactivity

---

## 🔍 Verify It's Working

### Test 1: Sign Up

1. Go to: `http://localhost:5173/signup`
2. Create account:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Create Account"
4. ✅ You should be logged in automatically

### Test 2: Check localStorage

1. Press F12 (open DevTools)
2. Go to "Application" tab
3. Click "Local Storage" → `http://localhost:5173`
4. Look for key: `mint-health-hub-auth`
5. ✅ You should see a JSON object with tokens

### Test 3: Check Database

1. Go to Supabase → Table Editor → users
2. ✅ Your new user should be there!

### Test 4: Session Persistence

1. Close the browser completely
2. Reopen and go to: `http://localhost:5173`
3. ✅ You should still be logged in!

### Test 5: Check Token Expiry

1. Open DevTools → Application → Local Storage
2. Find `mint-health-hub-auth`
3. Look for `expires_at` field
4. ✅ Should be 7 days from now (604800 seconds)

---

## 🔒 Security Features

### What's Stored:

```json
{
  "access_token": "eyJhbGc...", // JWT token
  "refresh_token": "v1.MR...", // Refresh token
  "expires_at": 1234567890,     // Expiry timestamp
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "name": "User Name",
      "role": "User"
    }
  }
}
```

### Security Measures:

- ✅ Tokens are signed and encrypted
- ✅ Can't be tampered with
- ✅ Validated on every request
- ✅ Auto-refresh prevents expiry
- ✅ Secure HTTPS transmission
- ✅ Row Level Security (RLS) enforced

---

## 📝 Current Configuration

Your `src/lib/supabase.ts` is configured with:

```typescript
{
  auth: {
    autoRefreshToken: true,      // Auto-refresh before expiry
    persistSession: true,         // Save to localStorage
    detectSessionInUrl: true,     // Handle OAuth redirects
    storage: window.localStorage, // Where to store
    storageKey: 'mint-health-hub-auth', // Storage key
    flowType: 'pkce',            // Secure auth flow
  }
}
```

---

## 🎯 User Flow Examples

### New User Signup:

1. User fills signup form
2. App calls `supabase.auth.signUp()`
3. Supabase creates user in `auth.users`
4. Trigger auto-creates profile in `public.users`
5. JWT token generated (7-day expiry)
6. Token stored in localStorage
7. User redirected to dashboard
8. ✅ Logged in for 7 days

### Returning User Login:

1. User fills login form
2. App calls `supabase.auth.signInWithPassword()`
3. Supabase validates credentials
4. JWT token generated (7-day expiry)
5. Token stored in localStorage
6. User profile loaded from `public.users`
7. User redirected to dashboard
8. ✅ Logged in for 7 days

### Session Persistence:

1. User closes browser
2. Token remains in localStorage
3. User reopens browser
4. App checks localStorage for token
5. Token is valid (not expired)
6. User profile loaded automatically
7. ✅ Still logged in!

### Token Refresh:

1. User is active in app
2. Token nearing expiry (e.g., 6 days 23 hours)
3. Supabase auto-refreshes token
4. New token stored in localStorage
5. User never notices
6. ✅ Session extended!

---

## 🐛 Troubleshooting

### User gets logged out immediately

**Check:**
1. Supabase JWT expiry setting (should be 604800)
2. Browser localStorage is enabled
3. No browser extensions blocking storage

### User gets logged out after browser close

**Check:**
1. `persistSession: true` in supabase.ts ✅ (already set)
2. localStorage not being cleared by browser
3. Not in incognito/private mode

### Token not refreshing

**Check:**
1. `autoRefreshToken: true` in supabase.ts ✅ (already set)
2. Internet connection is stable
3. Supabase project is active

---

## 📊 Quick Reference

### Check if user is logged in:
```typescript
const { data: { session } } = await supabase.auth.getSession();
if (session) {
  console.log('User is logged in:', session.user);
}
```

### Get current user:
```typescript
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);
```

### Manually refresh token:
```typescript
const { data, error } = await supabase.auth.refreshSession();
```

### Logout:
```typescript
await supabase.auth.signOut();
```

---

## ✅ Final Checklist

- [ ] Updated JWT expiry in Supabase to 604800 seconds
- [ ] Updated refresh token expiry in Supabase
- [ ] Saved Supabase settings
- [ ] Tested signup (user created in database)
- [ ] Tested login (user stays logged in)
- [ ] Tested browser close/reopen (still logged in)
- [ ] Checked localStorage has token
- [ ] Verified token expiry is 7 days

---

## 🎉 You're All Set!

Your authentication system now:
- ✅ Stores data in Supabase database
- ✅ Uses JWT tokens for security
- ✅ Keeps users logged in for 7 days
- ✅ Auto-refreshes tokens
- ✅ Persists across browser restarts
- ✅ Secure and production-ready

**Ready to test it?** Try signing up and see the magic happen! 🚀
