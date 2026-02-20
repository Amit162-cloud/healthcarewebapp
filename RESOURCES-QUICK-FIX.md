# Resources Not Showing? Quick 2-Minute Fix ⚡

## The Problem
You're on the Resources page but seeing no data.

## The Solution (2 Steps)

### Step 1: Run the Fix SQL (1 minute)

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy and paste the entire contents of: **`FIX-RESOURCES-NOW.sql`**
5. Click **Run** (or press Ctrl+Enter)

✅ This fixes RLS policies and adds you to users/admins tables

---

### Step 2: Check if Resources Table Has Data (30 seconds)

In the same SQL Editor, run:

```sql
SELECT COUNT(*) FROM public.resources;
```

**If result is 0 (empty):**
- Copy and paste the entire contents of: **`04-resources-table.sql`**
- Click **Run**
- This creates the table and adds sample data

**If result is > 0:**
- You already have data! Skip this step.

---

### Step 3: Refresh Your App (10 seconds)

1. Go back to your app
2. Refresh the Resources page (F5)
3. You should now see data! 🎉

---

## Still Not Working?

### Check Browser Console (F12)

Look for error messages:

| Error Message | Solution |
|---------------|----------|
| "No hospital assigned" | Run `FIX-RESOURCES-NOW.sql` again |
| "Permission denied" | Run `FIX-RESOURCES-NOW.sql` again |
| "Table does not exist" | Run `04-resources-table.sql` |
| No errors but no data | Run `DIAGNOSE-RESOURCES-ISSUE.sql` |

---

## What These Files Do

| File | Purpose |
|------|---------|
| `FIX-RESOURCES-NOW.sql` | Fixes RLS policies, adds you to users/admins |
| `04-resources-table.sql` | Creates table and inserts sample data |
| `DIAGNOSE-RESOURCES-ISSUE.sql` | Detailed diagnostics |
| `FIX-RESOURCES-RLS.sql` | Just fixes RLS policies |
| `RESOURCES-NOT-SHOWING-FIX.md` | Complete troubleshooting guide |

---

## Expected Result

After the fix, you should see:

**My Hospital Tab:**
- Beds (General Ward, ICU, Private Room)
- Oxygen (Cylinders)
- Blood Bank (A+, B+, O+, AB-)
- Ventilators

**Network View Tab:**
- Resources from all hospitals in the network
- "Request" button to request resources from other hospitals

---

## Quick Verification

Run this in SQL Editor to verify everything:

```sql
-- Should show your user info
SELECT 
  u.name,
  u.email,
  h.name as hospital,
  EXISTS (SELECT 1 FROM public.admins WHERE user_id = u.id) as is_admin
FROM public.users u
LEFT JOIN public.hospitals h ON u.hospital_id = h.id
WHERE u.id = auth.uid();

-- Should show your resources
SELECT COUNT(*) as my_resources
FROM public.resources
WHERE hospital_id = (SELECT hospital_id FROM public.users WHERE id = auth.uid());
```

Both queries should return results. If not, run `FIX-RESOURCES-NOW.sql` again.

---

## That's It!

Your resources should now be visible. If you're still having issues, check the detailed guide: `RESOURCES-NOT-SHOWING-FIX.md`
