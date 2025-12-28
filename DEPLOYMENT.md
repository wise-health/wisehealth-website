# WiseHealth Deployment Guide

This guide will help you deploy the WiseHealth website to Netlify.

## Prerequisites

- [ ] GitHub account with repository access
- [ ] Netlify account (free tier is sufficient)
- [ ] MyDr booking URL from MyDr team
- [ ] DNS access for wisehealth.pl domain

## Step-by-Step Deployment

### 1. Prepare Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: WiseHealth website"
   ```

2. Create GitHub repository and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/wisehealth-website.git
   git branch -M main
   git push -u origin main
   ```

### 2. Connect to Netlify

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select the `wisehealth-website` repository

### 3. Configure Build Settings

In Netlify deployment settings:

**Build settings:**
- Build command: `npm run build`
- Publish directory: `build`
- Branch to deploy: `main`

**Environment variables** (click "Add environment variable"):
- `NODE_VERSION` = `18`
- `MYDR_BOOKING_URL` = `[your MyDr booking URL]`

Click **"Deploy site"**

### 4. Verify Deployment

1. Wait for build to complete (2-3 minutes)
2. Click on the generated URL (e.g., `random-name-123.netlify.app`)
3. Test the website:
   - [ ] Homepage loads correctly
   - [ ] All navigation links work
   - [ ] "Umów wizytę" button opens (check console for MyDr URL)
   - [ ] Mobile responsiveness
   - [ ] All pages (Oferta, Zespół, Cennik, FAQ, Kontakt)
   - [ ] Legal pages (Polityka prywatności, RODO)

### 5. Configure Custom Domain

1. In Netlify site dashboard, go to **"Domain management"**
2. Click **"Add custom domain"**
3. Enter: `wisehealth.pl`
4. Netlify will guide you through DNS verification

**DNS Configuration** (at your domain registrar):

For Netlify DNS:
- Add CNAME record: `www` → `[your-site].netlify.app`
- Add A record: `@` → Netlify's IP address (shown in Netlify UI)

Or use Netlify DNS (recommended):
- Transfer DNS management to Netlify
- Netlify will handle everything automatically

5. Wait for DNS propagation (can take 24-48 hours)
6. Netlify will automatically provision SSL certificate

### 6. Final Checks

After domain is live:

- [ ] Visit https://wisehealth.pl - loads correctly
- [ ] HTTPS is working (green padlock)
- [ ] All pages accessible
- [ ] Booking button works end-to-end
- [ ] Mobile and desktop views work
- [ ] Footer links work
- [ ] Contact information is correct

### 7. Set Up Continuous Deployment

✅ Already configured! 

From now on:
- Push to `main` branch → automatic deployment
- Create pull request → preview deployment URL generated
- Merge PR → automatic production deployment

## Monitoring and Maintenance

### Netlify Analytics (Optional)

Enable in Netlify dashboard → Analytics tab
- Track page views, visitors
- See which pages are most popular
- Monitor site performance

### Update Content

To update website content:

1. Edit files in `src/pages/`
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. Netlify automatically rebuilds and deploys

### Update Environment Variables

To change MyDr URL or add new variables:
1. Go to Netlify dashboard
2. Site settings → Environment variables
3. Edit or add variables
4. Trigger new deployment: Deploys → Trigger deploy → Deploy site

### Rollback

If something goes wrong:
1. Go to Deploys tab in Netlify
2. Find the last working deployment
3. Click **"Publish deploy"** to roll back

## Troubleshooting

### Build Fails

1. Check build logs in Netlify
2. Verify Node version is 18+
3. Test build locally: `npm run build`
4. Check for TypeScript errors

### Booking Button Not Working

1. Verify `MYDR_BOOKING_URL` is set in Netlify
2. Check browser console for errors
3. Test with fallback URL first
4. Contact MyDr support if URL is incorrect

### Domain Not Resolving

1. Verify DNS records are correct
2. Check DNS propagation: https://dnschecker.org/
3. Wait 24-48 hours for full propagation
4. Contact Netlify support if issues persist

### SSL Certificate Issues

1. Netlify auto-provisions Let's Encrypt certificates
2. If fails, check domain ownership verification
3. May take up to 24 hours
4. Use Netlify DNS for easier setup

## Performance Optimization

After deployment, run Lighthouse audit:

```bash
npm install -g lighthouse
lighthouse https://wisehealth.pl --view
```

Target scores:
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

If scores are low:
- Optimize images (use WebP, compress)
- Minimize custom JavaScript
- Check third-party scripts (MyDr, analytics)

## Support

- Netlify Docs: https://docs.netlify.com/
- Netlify Support: https://answers.netlify.com/
- Docusaurus Docs: https://docusaurus.io/docs

---

**Important Security Notes:**
- Never commit API keys or secrets to repository
- Always use environment variables for sensitive data
- Keep dependencies updated: `npm audit`
- Monitor Netlify security alerts

**Contact:**
For technical issues with the website, contact your web development team.
For MyDr integration issues, contact MyDr support.
