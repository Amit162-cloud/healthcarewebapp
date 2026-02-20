-- ============================================
-- UPDATE USER TRIGGER TO HANDLE HOSPITAL_ID
-- ============================================
-- This fixes the issue where hospital name is stored instead of hospital_id
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop the old trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function that converts hospital name to hospital_id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  hosp_id UUID;
BEGIN
  -- Get hospital_id from hospital name if provided
  IF NEW.raw_user_meta_data->>'hospital' IS NOT NULL AND NEW.raw_user_meta_data->>'hospital' != '' THEN
    SELECT id INTO hosp_id 
    FROM public.hospitals 
    WHERE name = NEW.raw_user_meta_data->>'hospital' 
    LIMIT 1;
  END IF;

  -- Insert user profile with hospital_id
  INSERT INTO public.users (id, email, name, phone, role, hospital_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'User'),
    hosp_id  -- This will be NULL if hospital not found or not provided
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- VERIFY THE TRIGGER
-- ============================================

-- Check if trigger exists
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table 
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- ============================================
-- UPDATE EXISTING USERS (if needed)
-- ============================================
-- If you have existing users without hospital_id, run this:

-- Example: Update a specific user
-- UPDATE public.users 
-- SET hospital_id = (SELECT id FROM public.hospitals WHERE name = 'City General Hospital' LIMIT 1)
-- WHERE email = 'your-email@example.com';

-- Or update all users who have a hospital name in metadata but no hospital_id
-- This is a one-time fix for existing users
DO $$
DECLARE
  user_record RECORD;
  hosp_id UUID;
  hosp_name TEXT;
BEGIN
  FOR user_record IN 
    SELECT u.id, au.raw_user_meta_data
    FROM public.users u
    JOIN auth.users au ON u.id = au.id
    WHERE u.hospital_id IS NULL
  LOOP
    -- Get hospital name from metadata
    hosp_name := user_record.raw_user_meta_data->>'hospital';
    
    IF hosp_name IS NOT NULL AND hosp_name != '' THEN
      -- Find hospital_id
      SELECT id INTO hosp_id 
      FROM public.hospitals 
      WHERE name = hosp_name 
      LIMIT 1;
      
      -- Update user with hospital_id
      IF hosp_id IS NOT NULL THEN
        UPDATE public.users 
        SET hospital_id = hosp_id 
        WHERE id = user_record.id;
        
        RAISE NOTICE 'Updated user % with hospital %', user_record.id, hosp_name;
      END IF;
    END IF;
  END LOOP;
END $$;

-- ============================================
-- VERIFY USERS HAVE HOSPITAL_ID
-- ============================================

SELECT 
  u.email,
  u.name,
  u.hospital_id,
  h.name as hospital_name,
  h.city
FROM public.users u
LEFT JOIN public.hospitals h ON u.hospital_id = h.id
ORDER BY u.email;

-- ============================================
-- SUCCESS!
-- ============================================
-- ✅ Trigger updated to convert hospital name → hospital_id
-- ✅ Existing users updated with hospital_id
-- ✅ New signups will automatically get hospital_id
-- 
-- Now run 04-resources-table.sql to create the resources table
-- ============================================
