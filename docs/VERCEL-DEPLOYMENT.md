# Vercel Deployment Configuration

## Environment Variables

Vercel automatically uses `.env.production` when deploying to production.

### Setup in Vercel Dashboard

Go to your project settings → Environment Variables and add:

```
NEXT_PUBLIC_ENABLE_ADS=true
```

Or let Vercel use the `.env.production` file automatically.

### Build Command

The default build command works:

```bash
pnpm build
```

### Environment Variable Priority

1. Vercel Dashboard variables (highest priority)
2. `.env.production` (used automatically in production builds)
3. `.env.local` (development only, not deployed)
4. `.env.example` (template only)

## Testing Production Build Locally

To test the production build with ads enabled:

```bash
# Build with production env
pnpm build

# Start production server
pnpm start
```

Make sure `.env.production` has `NEXT_PUBLIC_ENABLE_ADS=true`.
