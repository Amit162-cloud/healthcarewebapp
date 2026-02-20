# How to Create a User in Supabase

Since you're getting "Invalid credentials" when logging in, you need to create a user account in your Supabase project first.

## Steps to Create a User:

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `zvbpgznlzzzfzwfyhshj`

2. **Navigate to Authentication**
   - Click on "Authentication" in the left sidebar
   - Click on "Users" tab

3. **Add a New User**
   - Click the "Add User" button (top right)
   - Choose "Create new user"
   - Fill in the form:
     - **Email**: `admin@healthcare.com` (or any email you want)
     - **Password**: Choose a secure password (remember it!)
     - **Auto Confirm User**: ✅ Check this box (important!)
   - Click "Create User"

4. **Optional: Add User Metadata**
   - After creating the user, click on the user in the list
   - Scroll to "User Metadata" section
   - Click "Edit" and add:
     ```json
     {
       "name": "Dr. Admin",
       "role": "Hospital Admin",
       "hospital": "City General Hospital",
       "phone": "+91 98765 43210"
     }
     ```
   - Click "Save"

### Option 2: Using SQL (Advanced)

If you prefer SQL, go to the SQL Editor in Supabase and run:

```sql
-- Create a user with email and password
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@healthcare.com',
  crypt('your-password-here', gen_salt('bf')),
  NOW(),
  '{"name": "Dr. Admin", "role": "Hospital Admin", "hospital": "City General Hospital"}'::jsonb,
  NOW(),
  NOW()
);
```

## Test Your Login

After creating the user:

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to the login page

3. Enter the credentials you just created:
   - **Email**: The email you used
   - **Password**: The password you set

4. Click "Sign In"

You should now be logged in successfully! 🎉

## Troubleshooting

### Still getting "Invalid credentials"?

1. **Check Email Confirmation**
   - Make sure you checked "Auto Confirm User" when creating the user
   - Or verify the user's email in the Supabase dashboard

2. **Check Password**
   - Passwords are case-sensitive
   - Make sure there are no extra spaces

3. **Check Supabase Connection**
   - Verify your `.env` file has the correct credentials
   - Restart your dev server after any `.env` changes

4. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for any error messages in the Console tab

### Need More Help?

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase User Management](https://supabase.com/docs/guides/auth/managing-user-data)
