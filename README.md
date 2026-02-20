# Mint Health Hub

Healthcare Coordination & Crisis Management Dashboard

## About

Mint Health Hub is a comprehensive healthcare management system designed to streamline hospital operations, manage patient care, coordinate resources, and handle crisis situations effectively.

## Features

- 🏥 **Patient Management** - Track patient records, visits, and status
- 👨‍⚕️ **Doctor Management** - Manage doctor schedules and availability
- 📅 **Appointment System** - Schedule and manage appointments
- 🚨 **Emergency Queue** - Handle emergency cases with priority
- 💊 **Resource Management** - Track beds, oxygen, blood units, ventilators
- 🔔 **Real-time Notifications** - Stay updated with critical alerts
- 📊 **Reports & Analytics** - Generate insights and reports
- 🔐 **Secure Authentication** - Powered by Supabase
- 🌙 **Dark Mode Support** - Easy on the eyes

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mint-health-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up Supabase**
   
   See `SUPABASE_SETUP.md` and `CREATE_USER_GUIDE.md` for detailed instructions.

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at:
- Local: `http://localhost:5173`
- Network: `http://YOUR_IP:5173` (accessible from other devices on your network)

Your local IP will be displayed in the terminal when you start the dev server.

## Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
mint-health-hub/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Layout components (Navbar, Sidebar)
│   │   ├── shared/      # Shared components (DataTable, KPICard)
│   │   └── ui/          # shadcn/ui components
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configs
│   ├── pages/           # Page components
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── ...config files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Access from Other Devices

To access the app from other devices on your network:

1. Start the dev server: `npm run dev`
2. Note your local IP address from the terminal output
3. On another device, open: `http://YOUR_IP:5173`

Make sure:
- Both devices are on the same network
- Your firewall allows connections on port 5173

## Documentation

- `SUPABASE_SETUP.md` - Supabase integration guide
- `CREATE_USER_GUIDE.md` - How to create users for login

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, please contact the development team.
