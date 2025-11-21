// Server Component - Blog List Page
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { blogPosts, blogCategories } from '@/content/blog/posts';
import { deriveReadingTime } from '@/content/blog/reading-time';

export const metadata: Metadata = {
  title: 'Blog - String Art Insights & Tutorials',
  description:
    'Read about string art history, techniques, inspiration, and creative ideas. Learn from tutorials and discover the mathematics behind generative art.',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: 'Blog - String Art Generator',
    description: 'Articles, tutorials, and insights about string art',
    url: `${siteConfig.url}/blog`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;

  // Filter posts by category if provided
  const filtered = category
    ? blogPosts.filter((p) => p.category === category)
    : blogPosts;

  // Compute reading time dynamically from MDX
  const postsWithReading = filtered.map((post) => {
    let dynamicTime = '5 min read'; // default fallback
    try {
      const mod = require(`@/content/blog/${post.slug}.mdx`);
      dynamicTime = deriveReadingTime(mod.meta ?? {}, '5 min read', post.slug);
    } catch {
      // keep fallback
    }
    return { ...post, readingTime: dynamicTime };
  });
  return (
    <div className='container mx-auto max-w-6xl px-4 py-8 md:py-12'>
      {/* Header */}
      <div className='mb-8 md:mb-12 text-center'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <BookOpen className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Blog</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          String Art Insights
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Explore the art, science, and creativity behind string art. From
          history to tutorials, find inspiration for your next project.
        </p>
      </div>

      {/* Categories */}
      <div className='mb-8 flex flex-wrap gap-2 justify-center'>
        <Link href='/blog'>
          <Badge
            variant={!category ? 'default' : 'outline'}
            className='cursor-pointer px-4 py-2 hover:bg-primary/10 transition-colors'>
            All ({blogPosts.length})
          </Badge>
        </Link>
        {blogCategories.map((cat) => {
          const count = blogPosts.filter((p) => p.category === cat).length;
          if (count === 0) return null;
          const active = cat === category;
          return (
            <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}>
              <Badge
                variant={active ? 'default' : 'outline'}
                className='cursor-pointer px-4 py-2 hover:bg-primary/10 transition-colors'>
                {cat} ({count})
              </Badge>
            </Link>
          );
        })}
      </div>

      {/* Blog Posts Grid */}
      <div className='grid md:grid-cols-2 gap-6 md:gap-8'>
        {postsWithReading.map((post) => (
          <Card
            key={post.slug}
            className='overflow-hidden hover:shadow-lg transition-shadow group'>
            {/* Image */}
            <div className='aspect-video bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center border-b relative overflow-hidden'>
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              ) : (
                <BookOpen className='h-16 w-16 text-primary/30' />
              )}
            </div>

            <CardContent className='p-6 space-y-4'>
              {/* Category & Reading Time */}
              <div className='flex items-center justify-between gap-2 text-xs text-muted-foreground'>
                <Badge variant='secondary'>{post.category}</Badge>
                <div className='flex items-center gap-1'>
                  <Clock className='h-3 w-3' />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              {/* Title */}
              <Link href={`/blog/${post.slug}`}>
                <h2 className='text-xl font-bold group-hover:text-primary transition-colors line-clamp-2'>
                  {post.title}
                </h2>
              </Link>

              {/* Description */}
              <p className='text-sm text-muted-foreground line-clamp-3'>
                {post.description}
              </p>

              {/* Meta */}
              <div className='flex items-center gap-4 pt-2 border-t text-xs text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Calendar className='h-3 w-3' />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <span>•</span>
                <span>{post.author}</span>
              </div>

              {/* Tags */}
              <div className='flex flex-wrap gap-2'>
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant='outline'
                    className='text-xs font-normal'>
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Read More */}
              <Link href={`/blog/${post.slug}`}>
                <div className='flex items-center gap-2 text-sm text-primary hover:underline font-medium pt-2'>
                  Read Article
                  <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon */}
      {blogPosts.length < 5 && (
        <Card className='mt-12 bg-primary/5'>
          <CardContent className='p-8 text-center'>
            <BookOpen className='h-12 w-12 text-primary mx-auto mb-4' />
            <h3 className='font-bold text-xl mb-2'>
              More Articles Coming Soon
            </h3>
            <p className='text-muted-foreground max-w-md mx-auto'>
              We're working on more in-depth tutorials, artist profiles, and
              mathematical explorations. Check back soon!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
