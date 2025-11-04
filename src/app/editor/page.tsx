// Server Component - SSR-first pattern
import { EditorClient } from '@/features/string-art/components/EditorClient';
import { Sparkles } from 'lucide-react';

export default function EditorPage() {
  return (
    <div className='h-screen flex flex-col bg-background'>
      {/* Header - Server Component (SEO) */}
      <header className='border-b'>
        <div className='container mx-auto px-4 py-6'>
          <h1 className='text-4xl font-bold mb-2'>String Art Generator</h1>
          <p className='text-muted-foreground'>
            Transform your images into beautiful string art patterns
          </p>
        </div>
      </header>

      {/* Main Content - Fixed height with internal scroll */}
      <main className='flex-1 overflow-hidden'>
        <div className='container mx-auto px-4 h-full'>
          {/* Client Island - Only interactive parts */}
          <EditorClient />
        </div>
      </main>
    </div>
  );
}
