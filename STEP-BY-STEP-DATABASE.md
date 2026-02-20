# 🎯 Step-by-Step Database Setup

Follow these steps in order. Each step builds on the previous one.

---

## 📍 STEP 1: Create Hospitals Table

### What it does:
- Stores hospital information (name, address, contact)
- Tracks bed availability
- Includes 8 sample hospitals

### How to run:

1. **Open Supabase SQL Editor**:
   - Go to: https://supabase.com/dashboard/project/zvbpgznlzzzfzwfyhshj
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

2. **Copy & Paste**:
   - Open file: `01-hospitals-table.sql`
   - Copy ALL content (Ctrl+A, Ctrl+C)
   - Paste into SQL Editor
   - Click "Run" button (or Ctrl+Enter)

3. **Verify**:
   - You should see: "Success. No rows returned"
   - Go to "Table Editor" → You should see "hospitals" table
   - Click on it → You should see 8 hospitals

### ✅ Checklist:
- [ ] SQL ran successfully
- [ ] hospitals table exists
- [ ] 8 sample hospitals are visible

---

## 📍 STEP 2: Create Users Table

### What it does:
- Extends auth.users with profile information
- Links users to hospitals
- Auto-creates profile when someone signs up

### How to run:

1. **Open new SQL query** (same as Step 1)

2. **Copy & Paste**:
   - Open file: `02-users-table.sql`
   - Copy ALL content
   - Paste into SQL Editor
   - Click "Run"

3. **Verify**:
   - Go to "Table Editor" → You should see "users" table
   - The table will be empty (users are created when people sign up)

### ✅ Checklist:
- [ ] SQL ran successfully
- [ ] users table exists
- [ ] Table is linked to hospitals

---

## 📍 STEP 3: Create Admins Table

### What it does:
- Stores admin permissions
- Links admins to hospitals
- Tracks what each admin can do

### How to run:

1. **Open new SQL query** (same as before)

2. **Copy & Paste**:
   - Open file: `03-admins-table.sql`
   - Copy ALL content
   - Paste into SQL Editor
   - Click "Run"

3. **Verify**:
   - Go to "Table Editor" → You should see "admins" table
   - The table will be empty (you'll add admins later)

### ✅ Checklist:
- [ ] SQL ran successfully
- [ ] admins table exists
- [ ] Helper functions created

---

## 🧪 Test the Setup

### Test 1: Sign up a new user

1. Go to your app: `http://localhost:5173/signup`
2. Create a test account:
   - Name: Test Admin
   - Email: admin@test.com
   - Password: admin123
   - Hospital: City General Hospital
3. Click "Create Account"

### Test 2: Check if user was created

1. Go to Supabase → Table Editor → users
2. You should see your new user!
3. Note the `id` (you'll need it next)

### Test 3: Make the user an admin

Run this SQL (replace the email):

```sql
-- Make a user an admin
INSERT INTO public.admins (user_id, hospital_id)
VALUES (
  (SELECT id FROM public.users WHERE email = 'admin@test.com'),
  (SELECT id FROM public.hospitals WHERE name = 'City General Hospital')
);
```

### Test 4: Verify admin was created

1. Go to Supabase → Table Editor → admins
2. You should see your admin record!

---

## 📊 What You Have Now

After completing all 3 steps:

1. ✅ **hospitals** table with 8 sample hospitals
2. ✅ **users** table (auto-populated when users sign up)
3. ✅ **admins** table (manually assign admin rights)

### Relationships:
```
hospitals
    ↓
  users (belongs to hospital)
    ↓
  admins (user + hospital + permissions)
```

---

## 🎯 Quick Reference

### View all hospitals:
```sql
SELECT * FROM public.hospitals;
```

### View all users:
```sql
SELECT u.name, u.email, u.role, h.name as hospital
FROM public.users u
LEFT JOIN public.hospitals h ON u.hospital_id = h.id;
```

### View all admins:
```sql
SELECT u.name, u.email, h.name as hospital
FROM public.admins a
JOIN public.users u ON a.user_id = u.id
JOIN public.hospitals h ON a.hospital_id = h.id;
```

### Make someone an admin:
```sql
INSERT INTO public.admins (user_id, hospital_id)
VALUES (
  (SELECT id FROM public.users WHERE email = 'user@example.com'),
  (SELECT id FROM public.hospitals WHERE name = 'Hospital Name')
);
```

---

## ❓ Common Issues

### "relation does not exist"
- You skipped a step! Run the previous SQL files first.

### "duplicate key value violates unique constraint"
- The data already exists. This is fine!

### "permission denied"
- Make sure you're logged into Supabase as the project owner.

---

## ✅ Final Checklist

- [ ] Step 1: hospitals table created ✅
- [ ] Step 2: users table created ✅
- [ ] Step 3: admins table created ✅
- [ ] Tested signup (user auto-created) ✅
- [ ] Made a user an admin ✅

---

## 🎉 Success!

You now have the foundation tables set up!

**Next steps:**
- Create more tables (patients, doctors, appointments, etc.)
- Or start using the app with these 3 tables

**Ready to continue?** Let me know and I'll create the next tables!
