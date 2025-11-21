'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  description: string;
  url: string;
}

export function ShareButton({ title, description, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
          fallbackCopy();
        }
      }
    } else {
      // Fallback: copy to clipboard
      fallbackCopy();
    }
  };

  const fallbackCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Button
      variant='default'
      size='sm'
      className='shrink-0'
      onClick={handleShare}>
      {copied ? (
        <>
          <Check className='h-4 w-4 mr-2' />
          Copied!
        </>
      ) : (
        <>
          <Share2 className='h-4 w-4 mr-2' />
          Share Article
        </>
      )}
    </Button>
  );
}
