# Network Access Guide

## Running on Your Local Network

Your Mint Health Hub is now configured to be accessible from any device on your local network!

## Starting the Server

```bash
npm run dev
```

When you start the dev server, Vite will display all available network addresses:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ➜  Network: http://10.x.x.x:5173/
```

## Finding Your IP Address

### Windows (PowerShell)
```powershell
ipconfig
```
Look for "IPv4 Address" under your active network adapter (usually WiFi or Ethernet).

### Windows (Command Prompt)
```cmd
ipconfig | findstr IPv4
```

### Linux/Mac
```bash
ifconfig
# or
ip addr show
```

## Accessing from Other Devices

1. **Start the dev server** on your laptop:
   ```bash
   npm run dev
   ```

2. **Note your IP address** from the terminal output (e.g., `192.168.1.100`)

3. **On another device** (phone, tablet, another computer):
   - Make sure it's connected to the **same WiFi network**
   - Open a browser
   - Go to: `http://YOUR_IP:5173`
   - Example: `http://192.168.1.100:5173`

## Troubleshooting

### Can't access from other devices?

1. **Check Firewall**
   - Windows: Allow Node.js through Windows Firewall
   - Go to: Windows Security → Firewall & network protection → Allow an app through firewall
   - Find Node.js and check both Private and Public networks

2. **Check Network**
   - Both devices must be on the same WiFi network
   - Some public/guest WiFi networks block device-to-device communication

3. **Check Port**
   - Make sure port 5173 is not blocked
   - Try a different port by editing `vite.config.ts`:
     ```typescript
     server: {
       host: "0.0.0.0",
       port: 3000, // Change to any available port
     }
     ```

4. **Restart the dev server**
   - Stop the server (Ctrl+C)
   - Start it again: `npm run dev`

## Security Notes

- The dev server is only accessible on your local network
- It's not exposed to the internet
- For production deployment, use proper hosting services
- Never expose development servers to the public internet

## Production Deployment

For production, consider:
- Vercel
- Netlify
- AWS Amplify
- Your own server with proper security

Build for production:
```bash
npm run build
```

The `dist` folder will contain your production-ready files.
