# Resources Page - CRUD Operations Fixed

## What Was Fixed

### 1. TypeScript Errors Resolved
- Fixed all TypeScript errors in `Resources.tsx` and `DataTable.tsx`
- Changed form state types from `string | number` to just `string` for consistency
- Added `UserProfile` interface to properly type user data from database
- Fixed DataTable to convert unknown types to strings properly

### 2. Database Integration Issues
- **Root Cause**: The `User` type in AuthContext only has `hospital` (name), not `hospital_id` (UUID)
- **Solution**: Added code to fetch user profile from `users` table in Supabase to get `hospital_id`
- Now properly fetches resources filtered by user's hospital
- CRUD operations now use the correct `hospital_id` from database

### 3. Input Field Issues
- Changed all form inputs to use empty strings (`''`) instead of `0`
- Input fields now properly clear and don't show "0" by default
- Better validation for negative numbers and occupied > total

### 4. Better Error Handling
- Clear error messages if resources table doesn't exist
- Helpful message if user has no hospital assigned
- Console logging for debugging Supabase errors

## How It Works Now

### On Page Load:
1. Fetches user profile from `users` table to get `hospital_id`
2. Uses `hospital_id` to fetch only resources for user's hospital
3. Shows loading spinner while fetching
4. Displays helpful messages if table doesn't exist or no resources found

### Adding a Resource:
1. Opens modal with empty form fields (no "0" showing)
2. Validates all inputs (name required, no negatives, occupied ≤ total)
3. Uses user's `hospital_id` from database
4. Inserts into Supabase `resources` table
5. Refreshes the list automatically

### Editing a Resource:
1. Pre-fills form with current values
2. Updates only the changed fields
3. Validates before saving
4. Refreshes the list

### Deleting a Resource:
1. Asks for confirmation
2. Deletes from Supabase
3. Refreshes the list

### Network View:
1. Shows resources from ALL hospitals
2. Displays hospital name and city
3. "Request" button for other hospitals' resources
4. "Your Hospital" badge for own resources

## What You Need to Do

### Step 1: Run the SQL Script
If you haven't already, run `04-resources-table.sql` in Supabase SQL Editor:
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `04-resources-table.sql`
3. Paste and click "Run"
4. This creates the table with sample data for 5 hospitals

### Step 2: Assign Hospital to Your User
Your user profile needs a `hospital_id`. Two options:

**Option A: Update via SQL**
```sql
-- Find your user ID
SELECT id, email, name, hospital_id FROM users WHERE email = 'your-email@example.com';

-- Update with a hospital ID
UPDATE users 
SET hospital_id = (SELECT id FROM hospitals WHERE name = 'City General Hospital' LIMIT 1)
WHERE email = 'your-email@example.com';
```

**Option B: Update via Signup**
The signup process should automatically assign hospital based on the hospital name selected. If you signed up before the users table was created, you'll need to use Option A.

### Step 3: Test CRUD Operations
1. Refresh the page
2. Click "Add Resource"
3. Fill in the form (no "0" should appear in empty fields)
4. Save and verify it appears in the table
5. Try editing and deleting

### Step 4: Check Network View
1. Click "Network View" button
2. Should see resources from other hospitals
3. Try clicking "Request" on a resource from another hospital

## Troubleshooting

### "Resources table not found"
- Run `04-resources-table.sql` in Supabase SQL Editor

### "No hospital assigned to your profile"
- Update your user record in the `users` table with a valid `hospital_id`
- See Step 2 above

### CRUD operations not saving
- Check browser console for Supabase errors
- Verify you're in the `admins` table (required for insert/update/delete)
- Check RLS policies in Supabase

### Input fields showing "0"
- This should be fixed now - they use empty strings
- If still happening, clear browser cache and refresh

## Database Requirements

For CRUD operations to work, you need:
1. ✅ `hospitals` table created (01-hospitals-table.sql)
2. ✅ `users` table created (02-users-table.sql)
3. ✅ `admins` table created (03-admins-table.sql)
4. ✅ `resources` table created (04-resources-table.sql)
5. ✅ Your user has a `hospital_id` in the `users` table
6. ✅ Your user is in the `admins` table (for write permissions)

## Next Steps

After verifying CRUD works:
- Test the Network View functionality
- Try requesting resources from other hospitals
- Check if low stock alerts work (when available < threshold)
- Verify the auto-calculated `available` field updates correctly
