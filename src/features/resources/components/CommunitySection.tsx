import Link from 'next/link';
import { Users, ExternalLink, BookOpen, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CommunitySection() {
  return (
    <section id='community' className='mb-16 scroll-mt-20'>
      <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
        <Users className='h-6 w-6 text-primary' />
        Community & Inspiration
      </h2>
      <div className='grid md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Online Communities</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <a
              href='https://www.reddit.com/r/stringart'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors'>
              <div>
                <h4 className='font-semibold text-sm'>r/stringart</h4>
                <p className='text-xs text-muted-foreground'>
                  Reddit community for string art enthusiasts
                </p>
              </div>
              <ExternalLink className='h-4 w-4 text-muted-foreground' />
            </a>
            <a
              href='https://www.pinterest.com/search/pins/?q=string%20art'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors'>
              <div>
                <h4 className='font-semibold text-sm'>Pinterest</h4>
                <p className='text-xs text-muted-foreground'>
                  Thousands of string art ideas and inspiration
                </p>
              </div>
              <ExternalLink className='h-4 w-4 text-muted-foreground' />
            </a>
            <a
              href='https://www.instagram.com/explore/tags/stringart'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors'>
              <div>
                <h4 className='font-semibold text-sm'>#stringart</h4>
                <p className='text-xs text-muted-foreground'>
                  Instagram hashtag with thousands of posts
                </p>
              </div>
              <ExternalLink className='h-4 w-4 text-muted-foreground' />
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Resources</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <Link
              href='/tutorials'
              className='flex items-center justify-between p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors'>
              <div>
                <h4 className='font-semibold text-sm'>Our Tutorials</h4>
                <p className='text-xs text-muted-foreground'>
                  Step-by-step guides for all skill levels
                </p>
              </div>
              <BookOpen className='h-4 w-4 text-primary' />
            </Link>
            <Link
              href='/blog'
              className='flex items-center justify-between p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors'>
              <div>
                <h4 className='font-semibold text-sm'>Blog Articles</h4>
                <p className='text-xs text-muted-foreground'>
                  In-depth articles about techniques and history
                </p>
              </div>
              <BookOpen className='h-4 w-4 text-primary' />
            </Link>
            <a
              href='https://github.com/bledxs/string-art-generator'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors'>
              <div>
                <h4 className='font-semibold text-sm'>GitHub Repository</h4>
                <p className='text-xs text-muted-foreground'>
                  Open-source code and contribution guidelines
                </p>
              </div>
              <Github className='h-4 w-4 text-muted-foreground' />
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
