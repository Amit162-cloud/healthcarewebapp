# Supabase Setup Guide

## Configuration Complete ✅

Your Mint Health Hub is now connected to Supabase!

## What Was Set Up:

1. **Supabase Client** (`src/lib/supabase.ts`)
   - Configured with your project credentials
   - Ready to use throughout the app

2. **Authentication** (`src/context/AuthContext.tsx`)
   - Integrated Supabase Auth
   - Supports email/password login
   - Auto-syncs user sessions
   - Profile updates

3. **Environment Variables** (`.env`)
   - Stored securely (not committed to git)
   - TypeScript types added for autocomplete

## How to Use:

### Authentication Example:
```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Login
  await login('user@example.com', 'password');
  
  // Check auth status
  if (isAuthenticated) {
    console.log('User:', user);
  }
  
  // Logout
  await logout();
}
```

### Database Queries Example:
```typescript
import { supabase } from '@/lib/supabase';

// Fetch data
const { data, error } = await supabase
  .from('patients')
  .select('*')
  .limit(10);

// Insert data
const { data, error } = await supabase
  .from('appointments')
  .insert({ patient_id: '123', date: '2024-01-01' });

// Update data
const { data, error } = await supabase
  .from('doctors')
  .update({ status: 'active' })
  .eq('id', doctorId);
```

## Next Steps:

1. **Create Database Tables** in Supabase Dashboard
2. **Set up Row Level Security (RLS)** policies
3. **Create user accounts** for testing
4. **Update your components** to fetch real data

## Testing the Connection:

Run your dev server:
```bash
npm run dev
```

The app will now use Supabase for authentication!

## Need Help?

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
