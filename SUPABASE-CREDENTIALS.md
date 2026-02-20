# Supabase Credentials - Mint Health Hub

## Project Information

**Project Name:** Mint Health Hub  
**Project URL:** https://zvbpgznlzzzfzwfyhshj.supabase.co

## API Credentials

### Supabase URL
```
https://zvbpgznlzzzfzwfyhshj.supabase.co
```

### Anon/Public Key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YnBnem5senp6Znp3Znloc2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MDc0MzIsImV4cCI6MjA4NzE4MzQzMn0.1bt_jnqZS-uPX7_U30OISDx9-AJTQwwtGX3UwkQHDlM
```

## How to Use These Credentials

### For Frontend Development
Create a `.env` file in the project root with:

```env
VITE_SUPABASE_URL=https://zvbpgznlzzzfzwfyhshj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YnBnem5senp6Znp3Znloc2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MDc0MzIsImV4cCI6MjA4NzE4MzQzMn0.1bt_jnqZS-uPX7_U30OISDx9-AJTQwwtGX3UwkQHDlM
```

### For Supabase Dashboard Access
Your friend will need:
1. **Supabase Account Access** - You need to invite them to the project
2. Go to: https://supabase.com/dashboard/project/zvbpgznlzzzfzwfyhshj
3. Settings → Team → Invite member

## Application Access

### Website URL
```
http://192.168.120.205:5173
```
(Only accessible on your local network)

### Test Accounts
Your friend can create their own account by:
1. Go to the website
2. Click "Sign up"
3. Fill in details and select a hospital
4. After signup, they'll be automatically logged in

## Database Tables

The project has these tables:
- `hospitals` - List of 8 hospitals
- `users` - User profiles
- `admins` - Admin permissions
- `resources` - Hospital resources (beds, oxygen, blood, ventilators)

## Available Hospitals

When signing up, choose from:
1. City General Hospital
2. Metro Care Hospital
3. St. Mary's Medical Center
4. Apollo Healthcare
5. Fortis Hospital
6. Max Super Specialty Hospital
7. AIIMS Delhi
8. Lilavati Hospital

## Important Notes

⚠️ **Security:**
- The Anon Key is safe to share - it's meant to be public
- Never share the Service Role Key (if you have one)
- Users can only access data based on Row Level Security (RLS) policies

⚠️ **Network Access:**
- The website runs on your local IP: `192.168.120.205:5173`
- Your friend must be on the same WiFi/network to access it
- Or you can deploy it to a hosting service for public access

## Setup Instructions for Your Friend

1. **Clone/Get the project files**
2. **Create `.env` file** with the credentials above
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Access the website:**
   - If on same network: `http://192.168.120.205:5173`
   - If running locally: `http://localhost:5173`

## Need Help?

If your friend needs to:
- Run SQL queries → Share access to Supabase Dashboard
- Test the API → Use the credentials above
- Deploy the app → Consider Vercel, Netlify, or similar

---

**Generated:** February 21, 2026  
**Project:** Mint Health Hub - Healthcare Coordination & Crisis Management
