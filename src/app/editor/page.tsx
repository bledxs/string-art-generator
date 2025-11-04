// Server Component - SSR-first pattern
import { EditorClient } from '@/features/string-art/components/EditorClient';
import { Header } from '@/components/layout/Header';

export default function EditorPage() {
  return (
    <div className='h-screen flex flex-col bg-background'>
      <Header />
      <main className='flex-1 overflow-hidden'>
        <div className='container mx-auto px-4 h-full'>
          {/* Client Island - Only interactive parts */}
          <EditorClient />
        </div>
      </main>
    </div>
  );
}
