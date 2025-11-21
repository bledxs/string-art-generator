import { Sparkles } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Header } from '@/components/layout/Header';

export default function EditorLoading() {
  return (
    <div className='flex flex-col bg-background h-screen'>
      <Header />
      <main className='flex-1 flex items-center justify-center'>
        <LoadingSpinner message='Loading editor...' icon={Sparkles} />
      </main>
    </div>
  );
}
