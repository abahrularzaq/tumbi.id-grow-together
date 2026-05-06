## Deploy ke Vercel

1. Push ke GitHub:

```bash
git add .
git commit -m "feat: complete landing page with validation features"
git push origin main
```

2. Di vercel.com:
   - Import repository dari GitHub
   - Framework: Vite (auto-detect)
   - Build command: npm run build
   - Output directory: dist

3. Environment Variables di Vercel:
   - VITE_GA_MEASUREMENT_ID = [dari GA4 dashboard]
   - VITE_FORMSPREE_ID = [dari Formspree dashboard]

4. Custom domain (opsional):
   - Vercel dashboard → Domains
   - Tambahkan tumbi.id atau landing.tumbi.id

5. Setelah deploy:
   - Update Formspree dengan production URL
   - Test form submission end-to-end
   - Verify GA events di GA4 DebugView

Estimasi total waktu deploy: 15 menit

