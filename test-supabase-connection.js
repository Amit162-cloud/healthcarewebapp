// Quick test to verify Supabase connection
// Run with: node test-supabase-connection.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zvbpgznlzzzfzwfyhshj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YnBnem5senp6Znp3Znloc2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MDc0MzIsImV4cCI6MjA4NzE4MzQzMn0.1bt_jnqZS-uPX7_U30OISDx9-AJTQwwtGX3UwkQHDlM';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Testing Supabase connection...\n');

// Test 1: Check if we can connect
supabase.auth.getSession()
  .then(({ data, error }) => {
    if (error) {
      console.log('❌ Connection Error:', error.message);
    } else {
      console.log('✅ Connection successful!');
      console.log('📊 Current session:', data.session ? 'Active' : 'No active session');
    }
  })
  .catch(err => {
    console.log('❌ Failed to connect:', err.message);
  });

// Test 2: Check auth settings
setTimeout(() => {
  console.log('\n📋 Supabase URL:', supabaseUrl);
  console.log('🔑 API Key configured:', supabaseKey ? 'Yes ✅' : 'No ❌');
  console.log('\n💡 Next steps:');
  console.log('   1. Start dev server: npm run dev');
  console.log('   2. Go to: http://localhost:5173/signup');
  console.log('   3. Create a test account');
  console.log('   4. You should be logged in automatically!');
}, 1000);
