# Netlify Deployment Guide 🚀

## Quick Fix for Common Issues

### Issue 1: Build Fails
**Error:** "Command failed with exit code 1"

**Solution:**
1. Check that `netlify.toml` exists in your project root
2. Verify Node version is set to 18 or higher
3. Make sure all dependencies are in `package.json`

### Issue 2: 404 on Page Refresh
**Error:** Page not found when refreshing on routes like `/appointments`

**Solution:**
Already fixed! The `netlify.toml` and `_redirects` files handle this.

### Issue 3: Environment Variables Missing
**Error:** "Missing Supabase environment variables"

**Solution:**
Add environment variables in Netlify dashboard (see below)

---

## Step-by-Step Deployment

### 1. Prepare Your Project

Make sure these files exist:
- ✅ `netlify.toml` (created)
- ✅ `_redirects` (created)
- ✅ `.env.example` (exists)

### 2. Push to GitHub

```bash
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

### 3. Deploy to Netlify

#### Option A: Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize
4. Select your repository: `Amit162-cloud/healthcarewebapp`
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18
6. Click "Deploy site"

#### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### 4. Add Environment Variables

In Netlify Dashboard:
1. Go to your site
2. Click "Site settings" → "Environment variables"
3. Add these variables:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Where to find these:**
- Go to your Supabase project
- Click "Settings" → "API"
- Copy "Project URL" and "anon public" key

### 5. Redeploy

After adding environment variables:
1. Go to "Deploys" tab
2. Click "Trigger deploy" → "Deploy site"

---

## Configuration Files Explained

### `netlify.toml`
```toml
[build]
  command = "npm run build"    # Build command
  publish = "dist"              # Output directory

[[redirects]]
  from = "/*"                   # All routes
  to = "/index.html"            # Redirect to index
  status = 200                  # SPA routing

[build.environment]
  NODE_VERSION = "18"           # Node version
```

### `_redirects`
```
/*    /index.html   200
```
This ensures React Router works correctly on Netlify.

---

## Common Build Errors & Solutions

### Error: "Module not found"
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error: "Out of memory"
**Solution:**
Add to `netlify.toml`:
```toml
[build.environment]
  NODE_OPTIONS = "--max_old_space_size=4096"
```

### Error: "Failed to compile"
**Solution:**
1. Check TypeScript errors locally: `npm run build`
2. Fix any errors shown
3. Push changes and redeploy

### Error: "Environment variables not defined"
**Solution:**
1. Add variables in Netlify dashboard
2. Make sure they start with `VITE_`
3. Redeploy after adding variables

---

## Testing Your Deployment

### 1. Check Build Logs
- Go to "Deploys" tab in Netlify
- Click on the latest deploy
- Check build logs for errors

### 2. Test the Site
After deployment, test:
- ✅ Homepage loads
- ✅ Login/Signup works
- ✅ Navigation works
- ✅ Page refresh doesn't cause 404
- ✅ All routes are accessible

### 3. Check Environment Variables
Open browser console and check:
```javascript
// Should NOT show actual values (security)
console.log(import.meta.env.VITE_SUPABASE_URL)
```

---

## Performance Optimization

### 1. Enable Asset Optimization
In Netlify Dashboard:
- Go to "Site settings" → "Build & deploy" → "Post processing"
- Enable:
  - ✅ Bundle CSS
  - ✅ Minify CSS
  - ✅ Minify JS
  - ✅ Compress images

### 2. Add Custom Domain (Optional)
1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration steps

### 3. Enable HTTPS
- Automatically enabled by Netlify
- Free SSL certificate included

---

## Continuous Deployment

### Auto-Deploy on Git Push
Already configured! Every push to `main` branch will:
1. Trigger a new build
2. Run tests (if configured)
3. Deploy automatically
4. Update your live site

### Deploy Previews
- Every pull request gets a preview URL
- Test changes before merging
- Automatic cleanup after merge

---

## Monitoring & Debugging

### 1. Check Deploy Status
```bash
netlify status
```

### 2. View Logs
```bash
netlify logs
```

### 3. Open Site
```bash
netlify open:site
```

### 4. Check Functions (if using)
```bash
netlify functions:list
```

---

## Troubleshooting Checklist

Before asking for help, check:

- [ ] `netlify.toml` exists in project root
- [ ] `_redirects` file exists
- [ ] Environment variables are set in Netlify
- [ ] Build succeeds locally: `npm run build`
- [ ] All dependencies are in `package.json`
- [ ] Node version is 18 or higher
- [ ] Latest code is pushed to GitHub
- [ ] Supabase credentials are correct

---

## Quick Commands

```bash
# Test build locally
npm run build
npm run preview

# Deploy to Netlify
git add .
git commit -m "Deploy to Netlify"
git push origin main

# Check Netlify status
netlify status

# View site
netlify open:site
```

---

## Support

If you're still having issues:

1. **Check Netlify Build Logs:**
   - Go to your site in Netlify
   - Click "Deploys"
   - Click on the failed deploy
   - Read the error message

2. **Common Error Messages:**
   - "Command failed" → Check build command
   - "Module not found" → Check imports
   - "Out of memory" → Increase memory limit
   - "404 on refresh" → Check redirects

3. **Get Help:**
   - Netlify Support: https://answers.netlify.com
   - Netlify Docs: https://docs.netlify.com

---

## Success! 🎉

Your site should now be live at:
```
https://your-site-name.netlify.app
```

You can customize the domain in Netlify settings.

---

## Next Steps

1. ✅ Set up custom domain
2. ✅ Configure analytics
3. ✅ Set up form handling
4. ✅ Add serverless functions (if needed)
5. ✅ Configure build notifications

Your healthcare webapp is now live and accessible to the world! 🚀
