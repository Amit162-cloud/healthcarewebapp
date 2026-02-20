# Complete Fix for Resources Page

## The Problem
The resources page wasn't loading because:
1. Signup stores hospital **NAME** in user metadata
2. Resources table needs hospital **ID** (UUID)
3. The trigger that creates user profiles wasn't converting name → ID

## The Solution (3 Steps)

### Step 1: Update the User Trigger
Run `UPDATE-USER-TRIGGER.sql` in Supabase SQL Editor.

This will:
- ✅ Update the trigger to convert hospital name → hospital_id automatically
- ✅ Fix all existing users who don't have hospital_id
- ✅ Make future signups work correctly

```sql
-- Just copy and paste the entire UPDATE-USER-TRIGGER.sql file
-- into Supabase SQL Editor and click "Run"
```

### Step 2: Delete Old Resources Table (if exists)
Run `DELETE-RESOURCES.sql` in Supabase SQL Editor.

```sql
-- This cleans up any old/broken resources table
DROP TABLE IF EXISTS public.resources CASCADE;
```

### Step 3: Create Resources Table
Run `04-resources-table.sql` in Supabase SQL Editor.

This creates the resources table with sample data for 5 hospitals.

## Verify Everything Works

### Check 1: Verify Users Have Hospital IDs
Run this in Supabase SQL Editor:

```sql
SELECT 
  u.email,
  u.name,
  u.hospital_id,
  h.name as hospital_name
FROM public.users u
LEFT JOIN public.hospitals h ON u.hospital_id = h.id;
```

You should see:
- ✅ Each user has a hospital_id (UUID)
- ✅ Hospital name is displayed correctly

### Check 2: Verify Resources Exist
Run this in Supabase SQL Editor:

```sql
SELECT 
  h.name as hospital,
  r.type,
  r.name as resource,
  r.total,
  r.occupied,
  r.available
FROM public.resources r
JOIN public.hospitals h ON r.hospital_id = h.id
ORDER BY h.name, r.type;
```

You should see resources for multiple hospitals.

### Check 3: Test the Frontend
1. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
2. Go to Resources page
3. You should see:
   - ✅ Resources loading (not stuck on spinner)
   - ✅ Beds, Oxygen, Blood Bank, Ventilators tabs
   - ✅ Data in the tables
   - ✅ "Add Resource" button works
   - ✅ Edit/Delete buttons work

## How It Works Now

### Signup Flow:
1. User selects hospital name from dropdown (e.g., "City General Hospital")
2. Signup stores hospital name in auth.users metadata
3. **Trigger automatically converts name → hospital_id**
4. User profile created with correct hospital_id

### Resources Page Flow:
1. Fetches user profile from `users` table
2. Gets hospital_id (UUID)
3. Queries resources filtered by hospital_id
4. Displays resources for user's hospital

### Network View:
1. Fetches ALL resources from all hospitals
2. Joins with hospitals table to show hospital names
3. Shows "Request" button for other hospitals
4. Shows "Your Hospital" badge for own resources

## Troubleshooting

### Still stuck on "Loading resources..."?
**Check browser console (F12)** for errors:

1. **"No hospital assigned to your profile"**
   - Run UPDATE-USER-TRIGGER.sql again
   - Check if your user has hospital_id:
     ```sql
     SELECT * FROM users WHERE email = 'your-email@example.com';
     ```

2. **"Resources table not found"**
   - Run DELETE-RESOURCES.sql
   - Then run 04-resources-table.sql

3. **"Permission denied" or error code 42501**
   - Add yourself to admins table:
     ```sql
     INSERT INTO admins (user_id, hospital_id, role)
     VALUES (
       (SELECT id FROM users WHERE email = 'your-email@example.com'),
       (SELECT hospital_id FROM users WHERE email = 'your-email@example.com'),
       'Super Admin'
     );
     ```

### CRUD operations not working?
Make sure you're in the admins table:

```sql
-- Check if you're an admin
SELECT * FROM admins WHERE user_id = (SELECT id FROM users WHERE email = 'your-email@example.com');

-- If not, add yourself
INSERT INTO admins (user_id, hospital_id, role)
VALUES (
  (SELECT id FROM users WHERE email = 'your-email@example.com'),
  (SELECT hospital_id FROM users WHERE email = 'your-email@example.com'),
  'Super Admin'
);
```

### Input fields showing "0"?
This is fixed in the latest code. Clear browser cache:
- Chrome: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete
- Edge: Ctrl+Shift+Delete

Then refresh the page.

## Quick Test Commands

### Test 1: Check Your User
```sql
SELECT 
  u.id,
  u.email,
  u.name,
  u.hospital_id,
  h.name as hospital_name,
  CASE WHEN a.user_id IS NOT NULL THEN 'Yes' ELSE 'No' END as is_admin
FROM users u
LEFT JOIN hospitals h ON u.hospital_id = h.id
LEFT JOIN admins a ON a.user_id = u.id
WHERE u.email = 'your-email@example.com';
```

### Test 2: Check Resources for Your Hospital
```sql
SELECT 
  r.type,
  r.name,
  r.total,
  r.occupied,
  r.available,
  h.name as hospital
FROM resources r
JOIN hospitals h ON r.hospital_id = h.id
WHERE r.hospital_id = (SELECT hospital_id FROM users WHERE email = 'your-email@example.com')
ORDER BY r.type, r.name;
```

### Test 3: Add a Test Resource
```sql
INSERT INTO resources (hospital_id, type, name, total, occupied, threshold)
VALUES (
  (SELECT hospital_id FROM users WHERE email = 'your-email@example.com'),
  'bed',
  'Test Bed',
  10,
  5,
  2
);
```

## Summary

The fix ensures:
- ✅ Hospital names are automatically converted to IDs during signup
- ✅ Existing users are updated with hospital_id
- ✅ Resources page loads correctly
- ✅ CRUD operations work
- ✅ Network view shows all hospitals
- ✅ No more "0" in input fields

## Files Changed
1. `UPDATE-USER-TRIGGER.sql` - Fixes the user creation trigger
2. `DELETE-RESOURCES.sql` - Cleans up old resources table
3. `src/pages/Resources.tsx` - Better error handling and fallback logic
4. `FIX-RESOURCES-COMPLETE.md` - This guide

## Next Steps
After everything works:
1. Test adding a new resource
2. Test editing a resource
3. Test deleting a resource
4. Test Network View
5. Test requesting resources from other hospitals
