# DesignLab Deployment Guide

This guide covers deploying DesignLab to various platforms and environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Configuration](#environment-configuration)
3. [Vercel Deployment](#vercel-deployment)
4. [Netlify Deployment](#netlify-deployment)
5. [Self-Hosting](#self-hosting)
6. [Docker Deployment](#docker-deployment)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Node.js 18.0 or higher
- npm or yarn package manager
- Git repository (for automated deployments)
- Production build tested locally

### Local Production Build Test

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Verify at http://localhost:3000
```

## Environment Configuration

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Application
NEXT_PUBLIC_APP_NAME=DesignLab
NEXT_PUBLIC_APP_VERSION=0.1.0

# Optional: Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Error Tracking
# NEXT_PUBLIC_SENTRY_DSN=https://...
```

### Production Environment

For production, set these variables in your hosting platform:

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=DesignLab
NEXT_PUBLIC_APP_VERSION=0.1.0
```

## Vercel Deployment

Vercel is the recommended platform for Next.js applications.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Kaneko-KNL/DesignLab)

### Manual Deployment

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### GitHub Integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Add environment variables
6. Click "Deploy"

### Automatic Deployments

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

## Netlify Deployment

### Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Kaneko-KNL/DesignLab)

### Manual Deployment

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Build the Project**

```bash
npm run build
```

3. **Deploy**

```bash
# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### GitHub Integration

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "New site from Git"
3. Choose your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Add environment variables
6. Click "Deploy site"

## Self-Hosting

### Node.js Server

1. **Build the Application**

```bash
npm run build
```

2. **Start the Server**

```bash
# Production mode
npm start

# Or with PM2 for process management
npm install -g pm2
pm2 start npm --name "designlab" -- start
```

3. **Configure Reverse Proxy (Nginx)**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Enable HTTPS with Let's Encrypt**

```bash
sudo certbot --nginx -d yourdomain.com
```

### Static Export (Limited Features)

> **Note**: Static export doesn't support all Next.js features (API routes, ISR, etc.)

```bash
# Add to next.config.ts
output: 'export'

# Build
npm run build

# Serve the 'out' directory
```

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  designlab:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_NAME=DesignLab
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t designlab .

# Run container
docker run -p 3000:3000 designlab

# Or with Docker Compose
docker-compose up -d
```

## Performance Optimization

### Build Optimization

1. **Analyze Bundle Size**

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

2. **Enable Compression**

Already enabled in Next.js by default (gzip).

3. **Image Optimization**

Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

### Runtime Optimization

1. **Enable Caching**

Configure cache headers in `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/:all*(svg|jpg|png|webp)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

2. **CDN Configuration**

Use a CDN for static assets:
- Vercel: Automatic Edge Network
- Netlify: Automatic CDN
- Self-hosted: CloudFlare, AWS CloudFront

## Monitoring and Analytics

### Error Tracking

Integrate Sentry:

```bash
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard -i nextjs
```

### Analytics

Add Google Analytics:

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Troubleshooting

### Build Failures

**Issue**: Build fails with memory error

```bash
# Increase Node.js memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

**Issue**: Module not found errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Runtime Issues

**Issue**: 404 on page refresh

- Ensure your hosting platform supports Next.js routing
- Configure rewrites in hosting platform settings

**Issue**: Environment variables not working

- Prefix client-side variables with `NEXT_PUBLIC_`
- Rebuild after changing environment variables

### Performance Issues

**Issue**: Slow initial load

- Check bundle size with analyzer
- Implement code splitting
- Optimize images
- Enable caching

**Issue**: Slow page transitions

- Use `<Link>` component for navigation
- Implement prefetching
- Optimize component re-renders

## Security Checklist

- [ ] Environment variables are not committed to Git
- [ ] HTTPS is enabled
- [ ] Security headers are configured
- [ ] Dependencies are up to date
- [ ] Error messages don't expose sensitive information
- [ ] Rate limiting is implemented (if applicable)

## Post-Deployment

1. **Verify Deployment**
   - Test all features in production
   - Check responsive design
   - Verify export functionality

2. **Monitor Performance**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Monitor error rates

3. **Set Up Alerts**
   - Uptime monitoring
   - Error tracking
   - Performance degradation

---

For more information, see the [README](../README.md) and [Architecture](ARCHITECTURE.md) documentation.
