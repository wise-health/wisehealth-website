# WiseHealth Website

Production website for WiseHealth - a psychology and psychiatry clinic in Kraków, Poland.

Built with [Docusaurus 3](https://docusaurus.io/) and deployed to [Netlify](https://www.netlify.com/).

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- Git

### Installation

```bash
npm install
# or
yarn install
```

### Local Development

```bash
npm start
# or
yarn start
```

This command starts a local development server at `http://localhost:3000/` and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
# or
yarn build
```

This command generates static content into the `build` directory that can be served using any static contents hosting service.

### Test Production Build Locally

```bash
npm run serve
# or
yarn serve
```

This serves the production build locally to test before deployment.

## 📁 Project Structure

```
wisehealth-website/
├── src/
│   ├── components/          # React components
│   │   └── MyDrBookingButton.tsx
│   ├── css/                # Global styles
│   │   └── custom.css
│   ├── pages/              # Website pages (MDX/TSX)
│   │   ├── index.tsx       # Homepage
│   │   ├── oferta.tsx      # Services
│   │   ├── zespol.tsx      # Team
│   │   ├── cennik.tsx      # Pricing
│   │   ├── faq.tsx         # FAQ
│   │   ├── kontakt.tsx     # Contact
│   │   ├── polityka-prywatnosci.tsx
│   │   └── rodo.tsx
│   └── services/           # Service modules
│       └── mydrApi.ts      # MyDr API integration (placeholder)
├── static/                 # Static assets
│   └── img/
├── docusaurus.config.ts    # Site configuration
├── netlify.toml           # Netlify deployment config
├── package.json
└── tsconfig.json
```

## ⚙️ Configuration

### Environment Variables

Set these in Netlify UI under **Site Settings > Environment Variables**:

#### Required:
- `NODE_VERSION`: `18` (or latest LTS)
- `MYDR_BOOKING_URL`: URL for MyDr booking system (e.g., `https://mydr.pl/clinic/wisehealth`)

#### Optional (for future API integration):
- `MYDR_API_KEY`: API key for MyDr integration
- `MYDR_API_BASE_URL`: Base URL for MyDr API

### Site Configuration

Main configuration is in `docusaurus.config.ts`:
- Site metadata (title, tagline, description)
- URL and base path
- Navigation (navbar, footer)
- Theme settings

## 🎨 Customization

### Colors and Branding

Edit `src/css/custom.css` to change:
- Primary/secondary colors
- Typography (fonts, sizes)
- Spacing and layout
- Component styles

Current color scheme:
- Primary: Calming blue/teal `#3b7ea1` (trust, professionalism)
- Secondary: Soft green `#6ba368` (healing, growth)
- Danger: Red `#ff6b6b` (emergency notices)

### Content Editing

All pages are in `src/pages/` directory:
- Edit existing `.tsx` files to change content
- Add new pages by creating new files in `src/pages/`
- Images go in `static/img/`

### MyDr Integration

The `MyDrBookingButton` component (`src/components/MyDrBookingButton.tsx`) handles booking:
- Reads `MYDR_BOOKING_URL` from environment variables
- Falls back to `https://mydr.pl/welcome` if not set
- Used throughout the site for "Umów wizytę" buttons

For future API integration, see `src/services/mydrApi.ts` - currently contains placeholder functions.

## 🚢 Deployment

### Netlify (Recommended)

1. **Connect Repository:**
   - Go to Netlify dashboard
   - Click "Add new site" > "Import an existing project"
   - Connect to your GitHub repository

2. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Set environment variables (see above)

3. **Deploy:**
   - Netlify will automatically deploy on every push to `main` branch
   - Preview deployments created for pull requests

4. **Custom Domain:**
   - Add `wisehealth.pl` in Netlify domain settings
   - Update DNS records at your registrar:
     - CNAME record pointing to your Netlify subdomain
   - Netlify automatically provisions SSL certificate

### Manual Deployment

If deploying elsewhere:

```bash
npm run build
# Upload contents of 'build/' directory to your hosting
```

## 🔒 Security & Privacy

- HTTPS enforced via Netlify
- Security headers configured in `netlify.toml`
- RODO/GDPR compliant privacy policy included
- Medical data handled via MyDr system (external EDM)

## 📝 TODO List for Production

Before going live, complete these tasks:

### Content:
- [ ] Update team member information in `/zespol`
- [ ] Add real clinic address in `/kontakt`
- [ ] Verify and update pricing in `/cennik`
- [ ] Add Google Maps embed to `/kontakt`
- [ ] Replace placeholder logos/images

### MyDr Integration:
- [ ] Obtain MyDr booking URL
- [ ] Set `MYDR_BOOKING_URL` in Netlify environment variables
- [ ] Test booking flow end-to-end
- [ ] (Optional) Implement API integration if needed

### Deployment:
- [ ] Connect repository to Netlify
- [ ] Set all environment variables
- [ ] Test deployment on Netlify staging URL
- [ ] Configure custom domain `wisehealth.pl`
- [ ] Update DNS records
- [ ] Verify SSL certificate

### Quality Assurance:
- [ ] Run Lighthouse audit (target: Performance ≥90, Accessibility ≥90)
- [ ] Test on mobile devices
- [ ] Test all booking buttons
- [ ] Verify all links work
- [ ] Check SEO meta tags

### Legal:
- [ ] Review privacy policy with legal counsel
- [ ] Ensure RODO compliance
- [ ] Add real contact details in legal pages

## 🆘 Support & Troubleshooting

### Common Issues

**Build fails on Netlify:**
- Check Node version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

**Booking button not working:**
- Verify `MYDR_BOOKING_URL` is set in Netlify
- Check browser console for errors
- Test with fallback URL

**Styles not loading:**
- Clear browser cache
- Rebuild site: `npm run clear && npm run build`
- Check `src/css/custom.css` for syntax errors

### Getting Help

- Docusaurus docs: https://docusaurus.io/docs
- Netlify docs: https://docs.netlify.com/
- Report issues: Create GitHub issue in repository

## 📄 License

© 2025 WiseHealth. All rights reserved.

---

**Last updated:** November 2025
