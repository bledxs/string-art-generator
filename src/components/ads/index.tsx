/**
 * Specific Ad Components for different placements
 * All Server Components for better SSR performance
 */

import { AdUnit } from './AdUnit';

/**
 * Header Ad - Horizontal banner for top of pages
 * Slot ID: 3552119194
 */
export function HeaderAd() {
  return (
    <AdUnit
      slot='header'
      format='horizontal'
      className='w-full max-w-7xl mx-auto mb-4'
    />
  );
}

/**
 * Sidebar Ad - Vertical banner for sidebars
 * Slot ID: 3031877461
 */
export function SidebarAd() {
  return <AdUnit slot='sidebar' format='vertical' className='sticky top-4' />;
}

/**
 * Footer Ad - Horizontal banner for bottom of pages
 * Slot ID: 5152366666
 */
export function FooterAd() {
  return (
    <AdUnit
      slot='footer'
      format='horizontal'
      className='w-full max-w-7xl mx-auto mt-8'
    />
  );
}

/**
 * Inline Ad - Horizontal banner for in-content placement
 * Slot ID: 2715180325
 */
export function InlineAd() {
  return <AdUnit slot='inline' format='horizontal' className='my-8' />;
}
