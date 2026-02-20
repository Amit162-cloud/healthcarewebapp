-- ============================================
-- SIMPLE FIX - RUN EACH QUERY ONE BY ONE
-- ============================================
-- Copy and paste each section separately into Supabase SQL Editor
-- ============================================

-- ============================================
-- QUERY 1: Fix RLS Policies
-- ============================================
-- Copy from here to the next section

DROP POLICY IF EXISTS "Users can view own hospital resources" ON public.resources;
DROP POLICY IF EXISTS "Users can view all resources for network" ON public.resources;
DROP POLICY IF EXISTS "Admins can insert hospital resources" ON public.resources;
DROP POLICY IF EXISTS "Admins can update hospital resources" ON public.resources;
DROP POLICY IF EXISTS "Admins can delete hospital resources" ON public.resources;

CREATE POLICY "authenticated_users_can_view_all_resources" 
ON public.resources FOR SELECT TO authenticated USING (true);

CREATE POLICY "admins_can_insert_resources" 
ON public.resources FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND hospital_id = resources.hospital_id)
);

CREATE POLICY "admins_can_update_resources" 
ON public.resources FOR UPDATE TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND hospital_id = resources.hospital_id)
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND hospital_id = resources.hospital_id)
);

CREATE POLICY "admins_can_delete_resources" 
ON public.resources FOR DELETE TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid() AND hospital_id = resources.hospital_id)
);

-- ✅ RLS Policies Fixed!

-- ============================================
-- QUERY 2: Add Yourself to Users Table
-- ============================================
-- Copy from here to the next section

INSERT INTO public.users (id, name, email, hospital_id, role)
SELECT 
  auth.uid(),
  COALESCE(
    (SELECT raw_user_meta_data->>'name' FROM auth.users WHERE id = auth.uid()),
    'Admin User'
  ),
  (SELECT email FROM auth.users WHERE id = auth.uid()),
  (SELECT id FROM public.hospitals ORDER BY name LIMIT 1),
  'Admin'
WHERE auth.uid() IS NOT NULL
ON CONFLICT (id) DO UPDATE SET
  hospital_id = COALESCE(EXCLUDED.hospital_id, users.hospital_id),
  role = COALESCE(EXCLUDED.role, users.role),
  updated_at = NOW();

-- ✅ Added to Users Table!

-- ============================================
-- QUERY 3: Add Yourself to Admins Table
-- ============================================
-- Copy from here to the next section

INSERT INTO public.admins (user_id, hospital_id)
SELECT 
  auth.uid(),
  (SELECT hospital_id FROM public.users WHERE id = auth.uid())
WHERE auth.uid() IS NOT NULL
  AND EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid())
ON CONFLICT DO NOTHING;

-- ✅ Added to Admins Table!

-- ============================================
-- QUERY 4: Verify Your User Info
-- ============================================
-- Copy from here to the next section

SELECT 
  '✅ YOUR USER INFO' as status,
  u.id,
  u.name,
  u.email,
  u.role,
  h.name as hospital,
  h.city
FROM public.users u
LEFT JOIN public.hospitals h ON u.hospital_id = h.id
WHERE u.id = auth.uid();

-- ============================================
-- QUERY 5: Verify Your Admin Status
-- ============================================
-- Copy from here to the next section

SELECT 
  '✅ YOUR ADMIN STATUS' as status,
  a.id as admin_id,
  h.name as hospital,
  'You are an admin' as message
FROM public.admins a
LEFT JOIN public.hospitals h ON a.hospital_id = h.id
WHERE a.user_id = auth.uid();

-- ============================================
-- QUERY 6: Check Your Hospital Resources
-- ============================================
-- Copy from here to the next section

SELECT 
  '✅ YOUR HOSPITAL RESOURCES' as status,
  r.type,
  r.name,
  r.total,
  r.occupied,
  r.available,
  h.name as hospital
FROM public.resources r
JOIN public.hospitals h ON r.hospital_id = h.id
WHERE r.hospital_id = (SELECT hospital_id FROM public.users WHERE id = auth.uid())
ORDER BY r.type, r.name;

-- ============================================
-- QUERY 7: Check Total Resources Count
-- ============================================
-- Copy from here to the next section

SELECT 
  COUNT(*) as total_resources,
  CASE 
    WHEN COUNT(*) = 0 THEN '⚠️ EMPTY - Run 04-resources-table.sql'
    ELSE '✅ Has Data'
  END as status
FROM public.resources;

-- ============================================
-- QUERY 8: Final Summary
-- ============================================
-- Copy from here to end

SELECT 
  'SETUP COMPLETE! 🎉' as message,
  (SELECT COUNT(*) FROM public.users WHERE id = auth.uid()) as user_exists,
  (SELECT COUNT(*) FROM public.admins WHERE user_id = auth.uid()) as is_admin,
  (SELECT COUNT(*) FROM public.resources WHERE hospital_id = (SELECT hospital_id FROM public.users WHERE id = auth.uid())) as my_resources,
  (SELECT COUNT(*) FROM public.resources) as total_resources;

-- ============================================
-- DONE!
-- ============================================
-- If total_resources = 0, run: 04-resources-table.sql
-- Then refresh your app!
-- ============================================
