# WiseHealth Website - Production TODO Checklist

Use this checklist to track what needs to be done before going live.

## 📝 Content Updates

### Team Page (`src/pages/zespol.tsx`)
- [ ] Add real names and titles for psychiatrists
- [ ] Add real names and titles for psychologists/therapists
- [ ] Add professional photos (place in `static/img/team/`)
- [ ] Update specializations and bios
- [ ] Verify contact methods (online/in-person)

### Contact Page (`src/pages/kontakt.tsx`)
- [ ] Add real clinic address
- [ ] Add real phone number
- [ ] Add real email address
- [ ] Add Google Maps embed code
- [ ] Verify public transport information
- [ ] Verify parking information
- [ ] Test email links

### Pricing Page (`src/pages/cennik.tsx`)
- [ ] Confirm all service prices
- [ ] Verify package prices and savings
- [ ] Update payment methods if different
- [ ] Confirm cancellation policy
- [ ] Add any missing services

### Homepage (`src/pages/index.tsx`)
- [ ] Review hero text
- [ ] Verify services listed
- [ ] Check "Why WiseHealth" benefits
- [ ] Verify "How it works" steps

### Legal Pages
- [ ] Review privacy policy with legal counsel
- [ ] Review RODO clause with legal counsel
- [ ] Add registered company details
- [ ] Verify data retention periods
- [ ] Add Data Protection Officer contact (if applicable)

### Images & Branding
- [ ] Add clinic logo to `static/img/logo.svg`
- [ ] Add favicon to `static/img/favicon.ico`
- [ ] Add team photos
- [ ] Add clinic interior photos (optional)
- [ ] Optimize all images for web

## 🔌 MyDr Integration

- [ ] Obtain MyDr booking URL from MyDr team
- [ ] Test MyDr booking URL in browser
- [ ] Confirm booking flow works end-to-end
- [ ] Test on mobile devices
- [ ] Optional: Get MyDr API credentials for future features

## 🌐 Deployment

### Repository Setup
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Verify all files are committed
- [ ] Check `.gitignore` excludes sensitive files

### Netlify Configuration
- [ ] Create Netlify account
- [ ] Connect GitHub repository to Netlify
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `build`
- [ ] Set `NODE_VERSION=18` environment variable
- [ ] Set `MYDR_BOOKING_URL` environment variable
- [ ] Verify first deployment succeeds
- [ ] Test staging URL

### Domain Setup
- [ ] Add custom domain `wisehealth.pl` in Netlify
- [ ] Update DNS records at domain registrar
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate is issued
- [ ] Test HTTPS works

## 🧪 Testing

### Functional Testing
- [ ] Test all navigation links
- [ ] Test all "Umów wizytę" buttons
- [ ] Test footer links
- [ ] Test email links (mailto:)
- [ ] Test phone links (tel:)
- [ ] Verify forms work (if any)

### Device Testing
- [ ] Test on Chrome desktop
- [ ] Test on Firefox desktop
- [ ] Test on Safari desktop
- [ ] Test on iPhone (Safari)
- [ ] Test on Android phone (Chrome)
- [ ] Test on iPad/tablet

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Check Performance score ≥ 90
- [ ] Check Accessibility score ≥ 90
- [ ] Check Best Practices score ≥ 90
- [ ] Check SEO score ≥ 90
- [ ] Test page load speed
- [ ] Verify images are optimized

### SEO Verification
- [ ] Verify page titles
- [ ] Verify meta descriptions
- [ ] Check Open Graph tags
- [ ] Test social sharing cards
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt

## 🔐 Security & Compliance

- [ ] Verify HTTPS is enforced
- [ ] Check security headers are set
- [ ] Verify no sensitive data in code
- [ ] Test RODO/GDPR compliance
- [ ] Verify cookie policy (if using analytics)
- [ ] Check external links open in new tab
- [ ] Verify emergency contact info is prominent

## 📊 Analytics & Monitoring (Optional)

- [ ] Set up Google Analytics (if desired)
- [ ] Set up Netlify Analytics
- [ ] Configure error monitoring (e.g., Sentry)
- [ ] Set up uptime monitoring
- [ ] Configure backup strategy

## 📢 Launch Preparation

- [ ] Announce downtime window (if replacing old site)
- [ ] Prepare social media posts
- [ ] Update Google My Business with new website
- [ ] Update Facebook page with new website
- [ ] Notify patients via email (if applicable)
- [ ] Update business cards/printed materials

## ✅ Post-Launch

- [ ] Monitor first 24 hours for errors
- [ ] Check analytics are tracking
- [ ] Verify booking flow with real appointment
- [ ] Collect user feedback
- [ ] Address any urgent issues
- [ ] Schedule weekly review for first month

## 📞 Contacts to Notify

- [ ] MyDr support team (inform of go-live)
- [ ] Domain registrar (if DNS changes)
- [ ] Old hosting provider (if canceling)
- [ ] Marketing team
- [ ] All clinic staff
- [ ] IT support contact

---

## 🎯 Critical Path (Must Do Before Launch)

These items MUST be completed before going live:

1. ✅ Update all placeholder content (team, contact, prices)
2. ✅ Set MyDr booking URL
3. ✅ Configure custom domain with SSL
4. ✅ Test booking flow end-to-end
5. ✅ Run Lighthouse audit and fix critical issues
6. ✅ Review legal pages with counsel
7. ✅ Test on mobile and desktop
8. ✅ Verify all links work

---

**Last Updated:** November 23, 2025

**Note:** Mark items as complete by changing `- [ ]` to `- [x]`
