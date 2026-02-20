-- ============================================
-- QUICK FIX - Assign Hospital to Your User
-- ============================================
-- Replace 'your-email@example.com' with your actual email
-- Replace 'City General Hospital' with the hospital you want
-- ============================================

-- Step 1: Check your current user data
SELECT 
  u.id,
  u.email,
  u.name,
  u.hospital_id,
  au.raw_user_meta_data->>'hospital' as hospital_from_signup
FROM public.users u
JOIN auth.users au ON u.id = au.id
WHERE u.email = 'your-email@example.com';  -- ⚠️ CHANGE THIS TO YOUR EMAIL

-- Step 2: Update your user with hospital_id
UPDATE public.users 
SET hospital_id = (
  SELECT id 
  FROM public.hospitals 
  WHERE name = 'City General Hospital'  -- ⚠️ CHANGE THIS TO YOUR HOSPITAL
  LIMIT 1
)
WHERE email = 'your-email@example.com';  -- ⚠️ CHANGE THIS TO YOUR EMAIL

-- Step 3: Make yourself an admin (so you can add/edit/delete resources)
INSERT INTO public.admins (user_id, hospital_id, role)
VALUES (
  (SELECT id FROM public.users WHERE email = 'your-email@example.com'),  -- ⚠️ CHANGE THIS
  (SELECT hospital_id FROM public.users WHERE email = 'your-email@example.com'),  -- ⚠️ CHANGE THIS
  'Super Admin'
)
ON CONFLICT (user_id, hospital_id) DO NOTHING;

-- Step 4: Verify everything is set up correctly
SELECT 
  u.email,
  u.name,
  u.hospital_id,
  h.name as hospital_name,
  h.city,
  CASE WHEN a.user_id IS NOT NULL THEN '✅ Admin' ELSE '❌ Not Admin' END as admin_status
FROM public.users u
LEFT JOIN public.hospitals h ON u.hospital_id = h.id
LEFT JOIN public.admins a ON a.user_id = u.id
WHERE u.email = 'your-email@example.com';  -- ⚠️ CHANGE THIS TO YOUR EMAIL

-- ============================================
-- AVAILABLE HOSPITALS (choose one):
-- ============================================
-- 1. City General Hospital
-- 2. Metro Care Hospital
-- 3. St. Mary's Medical Center
-- 4. Apollo Healthcare
-- 5. Fortis Hospital
-- 6. Max Super Specialty Hospital
-- 7. AIIMS Delhi
-- 8. Lilavati Hospital
-- ============================================

-- After running this:
-- 1. Refresh your browser (Ctrl+F5)
-- 2. Try adding a resource again
-- 3. It should work now!
-- ============================================
