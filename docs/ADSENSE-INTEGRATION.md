# Google AdSense Integration

This project integrates Google AdSense for monetization with multiple ad
placements optimized for user experience.

## Toggle Ads (Development vs Production)

Ads are controlled by the `NEXT_PUBLIC_ENABLE_ADS` environment variable:

- **Development**: Ads disabled by default (`.env.local` has
  `NEXT_PUBLIC_ENABLE_ADS=false`)
- **Production**: Ads enabled automatically (`.env.production` has
  `NEXT_PUBLIC_ENABLE_ADS=true`)

### Environment Files

```bash
# .env.local (Development - ads disabled)
NEXT_PUBLIC_ENABLE_ADS=false

# .env.production (Production - ads enabled)
NEXT_PUBLIC_ENABLE_ADS=true
```

### Testing Ads in Development

To test ads locally, set in `.env.local`:

```bash
NEXT_PUBLIC_ENABLE_ADS=true
```

Then restart your dev server:

```bash
pnpm dev
```

## Configuration

All AdSense configuration is centralized in `src/lib/ads-config.ts`:

```typescript
export const adsConfig = {
  publisherId: 'ca-pub-5492779415521723',
  slots: {
    sidebar: '3031877461',
    header: '3552119194',
    footer: '5152366666',
    inline: '2715180325', // Horizontal format
  },
} as const;
```

## Ad Placements

### 1. Header Ad (Horizontal - 3552119194)

- **Location**: Below header, top of pages
- **Format**: Horizontal banner
- **Usage**: Automatically included in marketing layout

```tsx
import { HeaderAd } from '@/components/ads';

<HeaderAd />;
```

### 2. Footer Ad (Horizontal - 5152366666)

- **Location**: Above footer content
- **Format**: Horizontal banner
- **Usage**: Automatically included in footer component

```tsx
import { FooterAd } from '@/components/ads';

<FooterAd />;
```

### 3. Sidebar Ad (Vertical - 3031877461)

- **Location**: Editor page sidebar (desktop only)
- **Format**: Vertical banner
- **Behavior**: Sticky positioning
- **Usage**: Hidden on mobile/tablet, visible on lg+ screens

```tsx
import { SidebarAd } from '@/components/ads';

<SidebarAd />;
```

### 4. Inline Ad (Horizontal - 2715180325)

- **Location**: Between content sections
- **Format**: Horizontal banner
- **Usage**: Place between sections in long-form content

```tsx
import { InlineAd } from '@/components/ads';

<InlineAd />;
```

## Components

### Server Components (Default)

For use in Server Components (recommended):

```tsx
import { HeaderAd, FooterAd, SidebarAd, InlineAd } from '@/components/ads';
```

### Client Components

For use within Client Components:

```tsx
'use client';

import { AdUnitClient } from '@/components/ads/AdUnitClient';
import { adsConfig } from '@/lib/ads-config';

<AdUnitClient
  publisherId={adsConfig.publisherId}
  slotId={adsConfig.slots.sidebar}
  format='vertical'
/>;
```

## Implementation Details

### AdSense Script

The AdSense script is loaded in the root layout (`src/app/layout.tsx`):

```tsx
import { AdSenseScript } from '@/components/ads/AdSenseScript';

<head>
  <meta name="google-adsense-account" content="ca-pub-5492779415521723" />
</head>
<body>
  <AdSenseScript />
  {children}
</body>
```

### Performance Optimization

- **Strategy**: `afterInteractive` - Script loads after page becomes interactive
- **SSR-First**: Ad components are Server Components by default for better
  performance
- **Client Fallback**: `AdUnitClient` available for Client Component contexts
- **Lazy Loading**: Ads load progressively without blocking initial render

### Best Practices

1. **Server Components First**: Use Server Component ads (`HeaderAd`,
   `FooterAd`, etc.) when possible
2. **Strategic Placement**: Balance user experience with monetization:
   - Header: Visible but not intrusive
   - Footer: Natural end of page content
   - Inline: Between substantial content sections
   - Sidebar: Desktop-only, non-blocking
3. **Responsive Design**: Sidebar ads hidden on mobile to maintain UX
4. **Performance**: All ads use `data-full-width-responsive="true"` for optimal
   sizing

## Current Integration

### Marketing Pages

- ✅ Header Ad: Below header in layout
- ✅ Footer Ad: Above footer content
- ✅ Inline Ad: Between "How It Works" and "Perfect For" sections on landing
  page

### Editor Page

- ✅ Header Ad: Below header
- ✅ Sidebar Ad: Left column (desktop only, sticky)

## Troubleshooting

### Ads Not Showing

1. **AdSense Approval**: Ensure your AdSense account is approved
2. **Ad Review**: New ad units may take 24-48 hours for approval
3. **Ad Blockers**: Test with ad blockers disabled
4. **Console Errors**: Check browser console for AdSense errors

### Testing

To test ads in development:

1. Build for production: `pnpm build`
2. Run production server: `pnpm start`
3. AdSense scripts may not serve ads in development mode

### Verification

The `ads.txt` file is located in `public/ads.txt` for verification with Google.

## Files Structure

```
src/
├── lib/
│   └── ads-config.ts                 # Central configuration
├── components/
│   └── ads/
│       ├── AdSenseScript.tsx         # Script loader (Server)
│       ├── AdUnit.tsx                # Generic ad unit (Server)
│       ├── AdUnitClient.tsx          # Client Component version
│       └── index.tsx                 # Specific ad components
└── app/
    ├── layout.tsx                    # AdSense script + meta tag
    ├── (marketing)/
    │   ├── layout.tsx                # Header ad integration
    │   └── page.tsx                  # Inline ad placement
    └── editor/
        └── page.tsx                  # Editor ads
```
