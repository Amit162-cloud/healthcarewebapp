# Appointments System - Complete Setup

## ✅ What's Been Done

### 1. Removed Mock Data
- ✅ Removed mock appointments from AppContext
- ✅ Removed mock resources from AppContext
- ✅ All data now comes from Supabase

### 2. Updated Appointments Page
- ✅ Fetches real data from Supabase `appointments` table
- ✅ Shows both WhatsApp and Manual appointments
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Phone number field added
- ✅ Source badge (WhatsApp/Manual)
- ✅ WhatsApp notification placeholder

## Features

### Admin Can:
1. **View All Appointments**
   - WhatsApp bookings (from bot)
   - Manual bookings (created by admin)
   - Badge shows source: 📱 WhatsApp or 🖥️ Manual

2. **Create Manual Appointments**
   - Patient name
   - Phone number (with validation)
   - Date and time
   - Doctor and department
   - Status (confirmed/completed/cancelled/no-show)

3. **Edit Appointments**
   - Update any field
   - Change status
   - Sends WhatsApp notification (when integrated)

4. **Delete Appointments**
   - Remove any appointment
   - Confirmation dialog

### WhatsApp Notifications
The code includes a placeholder function `sendWhatsAppNotification()` that:
- Triggers when appointment is created/updated
- Sends message with appointment details
- Ready for your WhatsApp API integration

## Database Structure

The `appointments` table has:
```sql
- id (bigserial) - Auto-increment ID
- phone_number (text) - Patient phone
- patient_name (text) - Patient name
- appointment_date (text) - Date (YYYY-MM-DD)
- appointment_time (text) - Time (HH:MM)
- status (text) - confirmed/cancelled/completed/no-show
- created_at (timestamp) - Auto timestamp
```

## How to Test

### 1. View Appointments
1. Go to Appointments page
2. Should see all appointments from database
3. Empty if no appointments exist yet

### 2. Create Manual Appointment
1. Click "Add Manual Appointment"
2. Fill in:
   - Patient Name: "John Doe"
   - Phone: "+91 98765 43210"
   - Date: Select date
   - Time: Select time
   - Doctor: Select from dropdown
   - Status: Confirmed
3. Click Save
4. Should see success message
5. Appointment appears in table with "🖥️ Manual" badge

### 3. Edit Appointment
1. Click edit icon (pencil) on any appointment
2. Change any field
3. Click Save
4. Should see updated data

### 4. Delete Appointment
1. Click delete icon (trash) on any appointment
2. Confirm deletion
3. Appointment removed from table

## WhatsApp Integration (TODO)

To add WhatsApp notifications, update the `sendWhatsAppNotification` function in `Appointments.tsx`:

### Option 1: Twilio
```typescript
const sendWhatsAppNotification = async (phoneNumber, patientName, date, time, action) => {
  await fetch('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: 'whatsapp:+14155238886',
      To: `whatsapp:${phoneNumber}`,
      Body: `Hello ${patientName},\n\nYour appointment has been ${action}!\n\nDate: ${date}\nTime: ${time}\n\nThank you!`
    })
  });
};
```

### Option 2: Meta WhatsApp Business API
```typescript
const sendWhatsAppNotification = async (phoneNumber, patientName, date, time, action) => {
  await fetch('https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'text',
      text: {
        body: `Hello ${patientName},\n\nYour appointment has been ${action}!\n\nDate: ${date}\nTime: ${time}\n\nThank you!`
      }
    })
  });
};
```

### Option 3: Your Custom API
```typescript
const sendWhatsAppNotification = async (phoneNumber, patientName, date, time, action) => {
  await fetch('/api/send-whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: phoneNumber,
      message: `Hello ${patientName},\n\nYour appointment has been ${action}!\n\nDate: ${date}\nTime: ${time}\n\nThank you!`
    })
  });
};
```

## Troubleshooting

### No appointments showing?
- Check if `appointments` table exists in Supabase
- Run the SQL you provided to create the table
- Check browser console for errors

### Can't create appointments?
- Check RLS policies on `appointments` table
- Make sure you're logged in
- Check browser console for Supabase errors

### WhatsApp notifications not working?
- The function is a placeholder
- Add your WhatsApp API credentials
- Test with console.log first

## Next Steps

1. ✅ Test creating manual appointments
2. ✅ Test editing appointments
3. ✅ Test deleting appointments
4. ⏳ Add your WhatsApp API integration
5. ⏳ Test WhatsApp notifications
6. ⏳ Add doctor and department fields to appointments table (optional)

## Files Changed
- `src/pages/Appointments.tsx` - Complete rewrite with Supabase
- `src/context/AppContext.tsx` - Removed mock data

## Summary
The appointments system now:
- ✅ Shows real data from Supabase
- ✅ Supports WhatsApp bookings
- ✅ Supports manual bookings
- ✅ Full CRUD operations
- ✅ Ready for WhatsApp notifications
- ✅ No more mock data!
