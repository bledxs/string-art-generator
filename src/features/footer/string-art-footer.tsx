import { ResponsiveAdBlock } from '@/components/ads/responsive-ad-block';

export function StringArtFooter() {
  return (
    <footer className='mt-12 text-center text-sm text-muted-foreground w-full'>
      <p>&copy; {new Date().getFullYear()} String Art Generator.</p>
      <div className='mb-6'>
        <ResponsiveAdBlock position='footer' className='w-full' />
      </div>
    </footer>
  );
}
