# Premium Business Website Template

A complete static website template for restaurants, salons, gyms, real estate agencies, medical clinics, law firms, digital agencies, consultants, construction companies, and local service businesses.

## What's Included

- Mobile-first responsive layout
- Sticky navigation, animated hero, scroll reveals, counters, hover states, and loading animation
- Hero, about, services, workflow, portfolio, testimonials, pricing, team, FAQ, contact, newsletter, and footer sections
- WhatsApp, phone, email, Google Forms consultation link, and newsletter conversion paths
- Semantic HTML, Open Graph, Twitter cards, schema markup, sitemap, robots.txt, accessibility-minded UI, and lazy-friendly assets
- Netlify, Vercel, GitHub Pages, Hostinger, and cPanel-ready files

## Customize

1. Replace `Devansh Nigam` in `index.html` with the client brand when adapting this template for another client.
2. Update `https://example.com/` in `index.html`, `robots.txt`, and `sitemap.xml`.
3. Replace phone, email, WhatsApp number, address, pricing, services, testimonials, and team details.
4. Swap colors in `assets/css/styles.css` under `:root`.
5. Replace `assets/img/premium-showcase.svg` with client photography or a custom visual when available.
6. The consultation button links to Google Forms in `index.html`. If you create a new Google Form later, replace the Google Forms URL.

## Deployment

### Netlify

1. Drag the folder into Netlify Drop, or connect the repository.
2. Publish directory: `.`
3. Build command: `npm run build`
4. Newsletter forms can work through Netlify Forms. The consultation CTA currently opens Google Forms.

### Vercel

1. Import the folder or repository into Vercel.
2. Framework preset: `Other`.
3. Output directory: `.`
4. Keep `vercel.json` for headers and clean URLs.

### GitHub Pages

1. Push the folder to a GitHub repository.
2. Go to Settings > Pages.
3. Deploy from branch and select the repository root.
4. Add a `CNAME` file containing your custom domain if needed.

### Hostinger or cPanel

1. Upload all files to `public_html`.
2. Keep `.htaccess` for HTTPS redirects, security headers, and browser caching.
3. Confirm `index.html`, `robots.txt`, and `sitemap.xml` are in the web root.

## Custom Domain and SSL

- Point the domain DNS to the host using the provider instructions.
- Netlify usually uses CNAME or A records and provisions SSL automatically.
- Vercel usually uses CNAME records and provisions SSL automatically.
- GitHub Pages supports a `CNAME` file and HTTPS once DNS verifies.
- Hostinger and cPanel usually enable SSL through AutoSSL or Let's Encrypt in the hosting panel.

## Analytics and Search

### Google Analytics

Create a GA4 property, then paste the provider's `gtag.js` snippet before `</head>` in `index.html`.

### Google Search Console

1. Add the final domain as a property.
2. Verify with DNS or an HTML meta tag.
3. Submit `https://yourdomain.com/sitemap.xml`.
4. Request indexing for the home page after launch.

## Performance Notes

- The template is static, dependency-free at runtime, and optimized for fast hosting.
- SVG assets are lightweight and scalable.
- JavaScript is deferred and limited to navigation, animations, counters, and the hero canvas.
- Respect `prefers-reduced-motion` for accessibility.

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
npm install
npm run dev
```

Then visit the local URL shown in the terminal.

## Google Forms Consultation

The consultation button opens:

```text
https://docs.google.com/forms/d/e/1FAIpQLSd4sMAkkzQojdk0VRLT6uf4MZb0vNljxOPgbJhUqF4L8U1gOQ/viewform
```

Client submissions will appear in Google Forms under **Responses**. Click the green Google Sheets icon in the Responses tab to store every lead in a spreadsheet.
