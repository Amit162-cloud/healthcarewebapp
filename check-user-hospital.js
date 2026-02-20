// Quick script to check if user has hospital_id assigned
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function checkUserHospital() {
  console.log('🔍 Checking user hospital assignments...\n');

  try {
    // Get all users
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, name, hospital_id');

    if (error) {
      console.error('❌ Error fetching users:', error.message);
      return;
    }

    if (!users || users.length === 0) {
      console.log('⚠️  No users found in the database');
      return;
    }

    console.log(`Found ${users.length} user(s):\n`);

    for (const user of users) {
      console.log(`📧 Email: ${user.email}`);
      console.log(`👤 Name: ${user.name}`);
      console.log(`🏥 Hospital ID: ${user.hospital_id || '❌ NOT ASSIGNED'}`);
      
      if (user.hospital_id) {
        // Get hospital name
        const { data: hospital } = await supabase
          .from('hospitals')
          .select('name, city')
          .eq('id', user.hospital_id)
          .single();
        
        if (hospital) {
          console.log(`   Hospital: ${hospital.name} (${hospital.city})`);
        }
      }
      console.log('---\n');
    }

    // Check if any user needs hospital assignment
    const usersWithoutHospital = users.filter(u => !u.hospital_id);
    if (usersWithoutHospital.length > 0) {
      console.log('\n⚠️  ACTION REQUIRED:');
      console.log(`${usersWithoutHospital.length} user(s) need hospital assignment.\n`);
      console.log('Run this SQL in Supabase to assign a hospital:\n');
      console.log('UPDATE users');
      console.log("SET hospital_id = (SELECT id FROM hospitals WHERE name = 'City General Hospital' LIMIT 1)");
      console.log("WHERE email = 'your-email@example.com';\n");
    } else {
      console.log('✅ All users have hospitals assigned!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkUserHospital();
