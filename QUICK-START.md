# WiseHealth Website - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The site will open at http://localhost:3000

### 3. Make Your First Edit

Open `src/pages/index.tsx` and change the hero title. Save and see it update live!

---

## 🎯 Common Tasks

### Update Homepage Content
Edit `src/pages/index.tsx`

### Update Team Page
Edit `src/pages/zespol.tsx` - add/modify team member information

### Update Pricing
Edit `src/pages/cennik.tsx` - modify prices and packages

### Change Colors/Branding
Edit `src/css/custom.css` - update color variables

### Add Images
1. Place images in `static/img/`
2. Reference as `/img/your-image.jpg` in pages

### Test Production Build
```bash
npm run build
npm run serve
```

---

## 📍 MyDr Integration

The booking button reads from environment variable `MYDR_BOOKING_URL`.

### For Local Development:
Create `.env` file (don't commit this!):
```
MYDR_BOOKING_URL=https://mydr.pl/your-clinic-url
```

### For Netlify Production:
Set in Netlify UI: Site Settings → Environment Variables

---

## 🔗 Important Links

- Local dev: http://localhost:3000
- Full documentation: `README-WISEHEALTH.md`
- Deployment guide: `DEPLOYMENT.md`
- Docusaurus docs: https://docusaurus.io/docs

---

## 🆘 Need Help?

**Build errors?**
```bash
npm run clear
npm install
npm run build
```

**Site won't start?**
- Check Node version: `node --version` (should be 18+)
- Delete `node_modules` and `package-lock.json`, then `npm install`

**Booking button not working?**
- Check environment variable is set
- Check browser console for errors
- Verify URL is correct

---

## ✅ Ready to Deploy?

See `DEPLOYMENT.md` for complete deployment instructions.

Quick checklist:
- [ ] All content reviewed and updated
- [ ] MyDr booking URL obtained
- [ ] Images/logos added
- [ ] Contact information verified
- [ ] Build succeeds: `npm run build`
- [ ] Local testing done: `npm start`

Then follow deployment guide to publish to Netlify!
