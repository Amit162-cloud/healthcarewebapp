# Resources Not Showing - Complete Fix Guide 🔧

## Problem
Resources page is not showing any data.

## Root Causes (Check in Order)

### 1️⃣ User Not in Users Table
**Symptom:** Console shows "No hospital assigned to your profile"

**Check:**
```sql
SELECT * FROM public.users WHERE id = auth.uid();
```

**Fix:**
```sql
-- Get your auth user ID first
SELECT id, email FROM auth.users WHERE id = auth.uid();

-- Get a hospital ID
SELECT id, name FROM public.hospitals LIMIT 5;

-- Add yourself to users table (REPLACE THE VALUES)
INSERT INTO public.users (id, name, email, hospital_id, role)
VALUES (
  auth.uid(),
  'Your Name',  -- CHANGE THIS
  'your.email@example.com',  -- CHANGE THIS
  'paste-hospital-id-here',  -- CHANGE THIS (from query above)
  'Admin'
)
ON CONFLICT (id) DO UPDATE SET
  hospital_id = EXCLUDED.hospital_id,
  role = EXCLUDED.role;
```

---

### 2️⃣ User Not in Admins Table
**Symptom:** Can view resources but can't add/edit/delete them

**Check:**
```sql
SELECT * FROM public.admins WHERE user_id = auth.uid();
```

**Fix:**
```sql
-- Add yourself to admins table
INSERT INTO public.admins (user_id, hospital_id)
VALUES (
  auth.uid(),
  (SELECT hospital_id FROM public.users WHERE id = auth.uid())
)
ON CONFLICT DO NOTHING;
```

---

### 3️⃣ Resources Table Doesn't Exist
**Symptom:** Console shows "Resources table not found"

**Check:**
```sql
SELECT COUNT(*) FROM public.resources;
```

**Fix:**
Run the complete SQL file:
```
04-resources-table.sql
```
This will create the table and insert sample data.

---

### 4️⃣ Conflicting RLS Policies
**Symptom:** Table exists, user is set up, but still no data showing

**Check:**
```sql
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'resources';
```

**Fix:**
Run this file to fix RLS policies:
```
FIX-RESOURCES-RLS.sql
```

---

### 5️⃣ No Data in Resources Table
**Symptom:** Everything is set up but table is empty

**Check:**
```sql
SELECT COUNT(*) FROM public.resources;
```

**Fix:**
The sample data insert is at the bottom of `04-resources-table.sql`. Run just the INSERT section, or run the entire file again (it has `ON CONFLICT DO NOTHING` so it won't duplicate).

---

## 🚀 Quick Fix (All-in-One)

Run these in Supabase SQL Editor in order:

### Step 1: Diagnose
```sql
-- Copy and paste from: DIAGNOSE-RESOURCES-ISSUE.sql
```

### Step 2: Fix RLS Policies
```sql
-- Copy and paste from: FIX-RESOURCES-RLS.sql
```

### Step 3: Add Yourself to Users & Admins
```sql
-- Get your info
SELECT 
  auth.uid() as my_user_id,
  email,
  raw_user_meta_data->>'name' as name
FROM auth.users 
WHERE id = auth.uid();

-- Get a hospital
SELECT id, name, city FROM public.hospitals LIMIT 5;

-- Add to users (REPLACE VALUES)
INSERT INTO public.users (id, name, email, hospital_id, role)
VALUES (
  auth.uid(),
  'Your Name',  -- CHANGE
  'your@email.com',  -- CHANGE
  'hospital-id-from-above',  -- CHANGE
  'Admin'
)
ON CONFLICT (id) DO UPDATE SET
  hospital_id = EXCLUDED.hospital_id,
  role = EXCLUDED.role;

-- Add to admins
INSERT INTO public.admins (user_id, hospital_id)
VALUES (
  auth.uid(),
  (SELECT hospital_id FROM public.users WHERE id = auth.uid())
)
ON CONFLICT DO NOTHING;
```

### Step 4: Verify
```sql
-- Should return your user info
SELECT 
  u.name,
  u.email,
  u.role,
  h.name as hospital,
  EXISTS (SELECT 1 FROM public.admins WHERE user_id = u.id) as is_admin
FROM public.users u
LEFT JOIN public.hospitals h ON u.hospital_id = h.id
WHERE u.id = auth.uid();

-- Should return resources
SELECT 
  h.name as hospital,
  r.type,
  r.name,
  r.available
FROM public.resources r
JOIN public.hospitals h ON r.hospital_id = h.id
WHERE r.hospital_id = (SELECT hospital_id FROM public.users WHERE id = auth.uid())
LIMIT 5;
```

---

## 🔍 Browser Console Debugging

Open browser DevTools (F12) and check the Console tab for errors:

### Common Error Messages:

**"No hospital assigned to your profile"**
→ Fix: Add yourself to users table (Step 3 above)

**"Resources table not found"**
→ Fix: Run `04-resources-table.sql`

**"Permission denied"**
→ Fix: Run `FIX-RESOURCES-RLS.sql` and add yourself to admins table

**"Failed to load resources: relation does not exist"**
→ Fix: Run `04-resources-table.sql`

---

## ✅ Final Verification Checklist

After running all fixes, verify:

- [ ] Resources table exists
- [ ] Resources table has data (at least 5-10 rows)
- [ ] You exist in `users` table with a `hospital_id`
- [ ] You exist in `admins` table
- [ ] RLS policies are correct (4 policies total)
- [ ] Browser console shows no errors
- [ ] Resources page shows data in "My Hospital" tab
- [ ] Resources page shows data in "Network View" tab
- [ ] You can add a new resource
- [ ] You can edit a resource
- [ ] You can delete a resource

---

## 🆘 Still Not Working?

1. **Check Supabase Logs:**
   - Go to Supabase Dashboard
   - Click "Logs" → "Postgres Logs"
   - Look for errors related to resources table

2. **Check Browser Network Tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Refresh the Resources page
   - Look for failed requests (red)
   - Click on them to see error details

3. **Check Auth Status:**
   ```sql
   SELECT 
     auth.uid() as user_id,
     auth.role() as role,
     current_user as db_user;
   ```

4. **Nuclear Option (Reset Everything):**
   ```sql
   -- WARNING: This deletes all resources data!
   DROP TABLE IF EXISTS public.resources CASCADE;
   
   -- Then run 04-resources-table.sql again
   ```

---

## 📝 Summary

Most common issue: **User not in users table with hospital_id**

Quick fix:
1. Run `DIAGNOSE-RESOURCES-ISSUE.sql` to identify the problem
2. Run `FIX-RESOURCES-RLS.sql` to fix policies
3. Add yourself to users and admins tables
4. Refresh the page

Your resources should now appear! 🎉
