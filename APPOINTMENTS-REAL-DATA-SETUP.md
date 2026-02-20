# Appointments Real Data Setup ✅

## What's Been Updated

### 1. Appointments Page (`src/pages/Appointments.tsx`)
Already fetching real data from Supabase with:
- ✅ Patient names displayed
- ✅ Phone numbers with country codes
- ✅ Appointment dates and times
- ✅ Status tracking (confirmed, completed, cancelled, no-show)
- ✅ Source badges (WhatsApp vs Manual)
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ WhatsApp notification placeholders

### 2. Dashboard (`src/pages/Index.tsx`)
Now fetching and displaying real appointment data:
- ✅ Real appointment count for today
- ✅ Live appointment status statistics
- ✅ Pie chart with actual data (Scheduled, Completed, Cancelled, No-Show)
- ✅ Recent appointments section with patient names
- ✅ Phone numbers and appointment times
- ✅ Status badges with color coding
- ✅ Link to view all appointments

### 3. Database Setup (`05-appointments-table.sql`)
Complete SQL setup file with:
- ✅ Appointments table with all fields
- ✅ User states table (for WhatsApp conversation flow)
- ✅ User languages table (for language preferences)
- ✅ Indexes for performance
- ✅ RLS policies for security
- ✅ Sample data (10 appointments)
- ✅ Helper functions for upcoming appointments and reminders

## Database Schema

### Appointments Table:
```sql
CREATE TABLE appointments (
  id BIGSERIAL PRIMARY KEY,
  phone_number TEXT NOT NULL,
  patient_name TEXT,
  patient_age INTEGER,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed',
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Fields:
- `id` - Auto-incrementing primary key
- `phone_number` - Patient phone with country code (e.g., +91 98765 43210)
- `patient_name` - Full patient name
- `patient_age` - Patient age in years
- `appointment_date` - Date in YYYY-MM-DD format
- `appointment_time` - Time in 12-hour format (e.g., 10:00 AM)
- `status` - confirmed | completed | cancelled | no-show
- `reminder_sent` - Boolean flag for WhatsApp reminders
- `created_at` - Timestamp when appointment was created
- `updated_at` - Auto-updated timestamp

## Setup Instructions

### Step 1: Run SQL Setup
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy and paste entire contents of `05-appointments-table.sql`
4. Click Run
5. Verify sample data is inserted

### Step 2: Verify Data
Run this query to check:
```sql
SELECT * FROM appointments ORDER BY appointment_date DESC;
```

You should see 10 sample appointments.

### Step 3: Test the Frontend
1. Go to `/appointments` page
2. You should see all appointments with patient names
3. Try adding a new appointment
4. Try editing an existing appointment
5. Check the dashboard for appointment statistics

## Features

### Appointments Page Features:
- ✅ View all appointments in a table
- ✅ Filter and search (via DataTable component)
- ✅ Add manual appointments
- ✅ Edit existing appointments
- ✅ Delete appointments
- ✅ Source badges (WhatsApp vs Manual)
- ✅ Phone number display with icon
- ✅ Status badges with colors
- ✅ Date and time formatting

### Dashboard Features:
- ✅ Today's appointment count (KPI card)
- ✅ Appointment status pie chart (real data)
- ✅ Recent appointments section showing:
  - Patient names
  - Phone numbers
  - Appointment dates and times
  - Status badges
- ✅ Link to view all appointments
- ✅ Auto-refresh on data changes

## Sample Data Included

### 10 Sample Appointments:
1. Rajesh Kumar - Feb 22, 10:00 AM - Confirmed
2. Priya Sharma - Feb 22, 11:30 AM - Confirmed
3. Amit Patel - Feb 22, 02:00 PM - Confirmed (Reminder sent)
4. Sneha Reddy - Feb 23, 09:00 AM - Confirmed
5. Vikram Singh - Feb 23, 10:30 AM - Completed
6. Anita Desai - Feb 21, 03:00 PM - Completed
7. Rahul Verma - Feb 21, 11:00 AM - Cancelled
8. Kavita Joshi - Feb 20, 04:00 PM - No-Show
9. John Smith - Feb 24, 01:00 PM - Confirmed
10. Sarah Johnson - Feb 24, 02:30 PM - Confirmed

## Helper Functions

### Get Upcoming Appointments:
```sql
SELECT * FROM get_upcoming_appointments(7); -- Next 7 days
```

### Get Appointments Needing Reminders:
```sql
SELECT * FROM get_appointments_needing_reminders();
```

## Dashboard Statistics

The dashboard now shows:

### KPI Card:
- "Appointments Today" - Shows count of confirmed appointments for today's date

### Pie Chart:
- Scheduled (Confirmed) - Blue
- Completed - Green
- Cancelled - Red
- No-Show - Orange

### Recent Appointments Section:
- Shows last 5 appointments
- Patient name and phone number
- Date and time
- Status badge
- Link to view all appointments

## Data Flow

### Appointments Page:
1. Component mounts → `fetchAppointments()` called
2. Supabase query fetches all appointments
3. Data formatted and displayed in table
4. User can add/edit/delete → Updates Supabase
5. Table refreshes automatically

### Dashboard:
1. Component mounts → `fetchAppointments()` called
2. Supabase query fetches all appointments
3. Statistics calculated from real data
4. Pie chart updated with actual counts
5. Recent appointments displayed with patient info

## WhatsApp Integration

The appointments table is designed to work with WhatsApp booking:

### WhatsApp Bookings:
- Have `patient_name` filled
- Source badge shows "📱 WhatsApp"
- Can track `reminder_sent` status

### Manual Bookings:
- Created through the UI
- Source badge shows "🖥️ Manual"
- All fields can be edited

## Status Workflow

### Appointment Lifecycle:
1. **Confirmed** - Initial state when created
2. **Completed** - After patient visit
3. **Cancelled** - If patient cancels
4. **No-Show** - If patient doesn't show up

### Status Colors:
- Confirmed: Blue
- Completed: Green
- Cancelled: Red
- No-Show: Gray/Orange

## API Integration Points

### WhatsApp Notifications:
The `sendWhatsAppNotification()` function is a placeholder for:
- Appointment confirmations
- Appointment updates
- Reminders

Add your WhatsApp API integration here (Twilio, WhatsApp Business API, etc.)

## Troubleshooting

### No appointments showing?
1. Check if table exists: `SELECT * FROM appointments;`
2. Run `05-appointments-table.sql` to create table and insert data
3. Check RLS policies are enabled
4. Verify you're authenticated in Supabase

### Dashboard not updating?
1. Check browser console for errors
2. Verify Supabase connection
3. Check if `fetchAppointments()` is being called
4. Refresh the page

### Can't add appointments?
1. Check RLS policies allow INSERT
2. Verify all required fields are filled
3. Check phone number format (must include country code)
4. Check browser console for errors

## Next Steps

1. ✅ Run `05-appointments-table.sql` in Supabase
2. ✅ Verify sample data is inserted
3. ✅ Test appointments page
4. ✅ Check dashboard statistics
5. ✅ Add real appointments
6. 🔄 Integrate WhatsApp API (optional)
7. 🔄 Set up automated reminders (optional)

---

**Your appointments system is now using real data from Supabase!** 🎉

Both the Appointments page and Dashboard are connected to the database and showing live data with patient names, phone numbers, and all appointment details.
