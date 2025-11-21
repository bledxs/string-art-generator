import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function MarketingLoading() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 flex items-center justify-center px-4 py-16'>
        <LoadingSpinner message='Loading page...' />
      </main>
      <Footer />
    </div>
  );
}
