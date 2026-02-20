# 📦 Resources Table Setup Guide

## 🎯 What This Table Does

The **resources** table tracks real-time availability of hospital resources:
- 🛏️ Beds (General Ward, ICU, Private Rooms)
- 💨 Oxygen Cylinders
- 🩸 Blood Units (all types)
- 🫁 Ventilators
- And more...

## ✨ Key Features

1. **Auto-calculated availability** - `available = total - occupied`
2. **Threshold alerts** - Warns when stock is low
3. **Multi-hospital support** - Each hospital has its own resources
4. **Network view** - See resources from other hospitals
5. **Data validation** - Prevents invalid entries

---

## 🚀 How to Create the Table

### Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/zvbpgznlzzzfzwfyhshj
2. Click **"SQL Editor"** in left sidebar
3. Click **"New Query"**

### Step 2: Run the SQL

1. Open file: `04-resources-table.sql`
2. Copy ALL content (Ctrl+A, Ctrl+C)
3. Paste into SQL Editor
4. Click **"Run"** button (or Ctrl+Enter)
5. Wait for success message

### Step 3: Verify

1. Go to **"Table Editor"** → You should see **"resources"** table
2. Click on it → You should see sample data for 5 hospitals
3. Check the data looks correct

---

## 📊 Table Structure

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `id` | UUID | Unique identifier | Auto-generated |
| `hospital_id` | UUID | Which hospital | Links to hospitals |
| `type` | VARCHAR | Category | `bed`, `oxygen`, `blood`, `ventilator` |
| `name` | VARCHAR | Specific name | `ICU Bed`, `O+ Blood` |
| `total` | INTEGER | Total capacity | `30` |
| `occupied` | INTEGER | Currently in use | `27` |
| `available` | INTEGER | **Auto-calculated** | `3` (30 - 27) |
| `threshold` | INTEGER | Alert level | `5` |
| `unit` | VARCHAR | Measurement | `beds`, `units`, `cylinders` |
| `created_at` | TIMESTAMP | When created | Auto |
| `updated_at` | TIMESTAMP | Last updated | Auto |

---

## 🎨 Sample Data Included

### City General Hospital:
- General Ward: 120 beds (95 occupied, 25 available)
- ICU: 30 beds (27 occupied, 3 available) ⚠️
- Oxygen: 200 cylinders (145 occupied, 55 available)
- Blood O+: 60 units (48 occupied, 12 available) ⚠️
- Ventilators: 50 units (38 occupied, 12 available)

### Metro Care Hospital:
- General Ward: 80 beds
- ICU: 40 beds (35 occupied, 5 available) ⚠️
- Oxygen: 150 cylinders
- Blood O+: 45 units
- Ventilators: 35 units

### + 3 more hospitals with full data!

---

## 🔍 Useful Queries

### View all resources:
```sql
SELECT 
  h.name as hospital,
  r.type,
  r.name as resource,
  r.total,
  r.occupied,
  r.available
FROM public.resources r
JOIN public.hospitals h ON r.hospital_id = h.id
ORDER BY h.name, r.type;
```

### Check low stock items:
```sql
SELECT 
  h.name as hospital,
  r.name as resource,
  r.available,
  r.threshold
FROM public.resources r
JOIN public.hospitals h ON r.hospital_id = h.id
WHERE r.available < r.threshold
ORDER BY r.available ASC;
```

### Get resources for specific hospital:
```sql
SELECT * FROM public.resources
WHERE hospital_id = (
  SELECT id FROM public.hospitals 
  WHERE name = 'City General Hospital'
);
```

### Check availability of specific resource type:
```sql
SELECT 
  h.name as hospital,
  r.name,
  r.available
FROM public.resources r
JOIN public.hospitals h ON r.hospital_id = h.id
WHERE r.type = 'bed'
ORDER BY r.available DESC;
```

---

## 🛡️ Security Features

### Row Level Security (RLS):
- ✅ Users can view their own hospital's resources
- ✅ Users can view all hospitals (for network view)
- ✅ Only admins can add/edit/delete resources
- ✅ Admins can only manage their own hospital's resources

### Data Validation:
- ✅ Total must be >= 0
- ✅ Occupied must be >= 0
- ✅ Occupied cannot exceed total
- ✅ Available is auto-calculated (can't be manually set)

---

## 🔧 Helper Functions Included

### 1. Check Resource Availability
```sql
SELECT * FROM public.check_resource_availability(
  'hospital-uuid',
  'bed',
  10
);
```
Returns: Which beds are available and if there are enough

### 2. Get Low Stock Resources
```sql
SELECT * FROM public.get_low_stock_resources('hospital-uuid');
```
Returns: All resources below their threshold

---

## 🎯 How to Use in Your App

### 1. Fetch Resources for Your Hospital:
```typescript
const { data: resources } = await supabase
  .from('resources')
  .select('*')
  .eq('hospital_id', userHospitalId);
```

### 2. Fetch All Resources (Network View):
```typescript
const { data: allResources } = await supabase
  .from('resources')
  .select(`
    *,
    hospitals (
      name,
      city
    )
  `);
```

### 3. Add New Resource:
```typescript
const { data, error } = await supabase
  .from('resources')
  .insert({
    hospital_id: userHospitalId,
    type: 'bed',
    name: 'Emergency Bed',
    total: 20,
    occupied: 5,
    threshold: 3
  });
```

### 4. Update Resource:
```typescript
const { data, error } = await supabase
  .from('resources')
  .update({ occupied: 28 })
  .eq('id', resourceId);
// 'available' will auto-update!
```

### 5. Check Low Stock:
```typescript
const { data: lowStock } = await supabase
  .from('resources')
  .select('*')
  .lt('available', supabase.raw('threshold'));
```

---

## 📈 Real-time Updates (Optional)

Enable real-time subscriptions to get instant updates:

```typescript
const subscription = supabase
  .channel('resources-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'resources'
    },
    (payload) => {
      console.log('Resource updated:', payload);
      // Update your UI
    }
  )
  .subscribe();
```

---

## ✅ Checklist

- [ ] Ran `04-resources-table.sql` in Supabase
- [ ] Verified `resources` table exists
- [ ] Checked sample data is present
- [ ] Tested viewing resources in Table Editor
- [ ] Verified auto-calculated `available` field works
- [ ] Checked low stock resources query

---

## 🎉 What's Next?

Now that you have the resources table:

1. **Update your frontend** to fetch real data from Supabase
2. **Replace mock data** in Resources page
3. **Enable real-time updates** for live resource tracking
4. **Add resource management** features (add/edit/delete)
5. **Create alerts** for low stock items

---

## 🐛 Troubleshooting

### "relation does not exist"
- Make sure you created hospitals table first
- Run `01-hospitals-table.sql` before this

### "permission denied"
- You need to be project owner
- Check you're logged into correct Supabase project

### "duplicate key value"
- Sample data already exists
- This is fine! Skip the error

### Available field not updating
- It's auto-calculated, don't try to set it manually
- Just update `total` or `occupied`, `available` updates automatically

---

## 📚 Resources

- [Supabase Generated Columns](https://supabase.com/docs/guides/database/tables#generated-columns)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

---

**Ready to create the table?** Run the SQL and watch the magic happen! 🚀
