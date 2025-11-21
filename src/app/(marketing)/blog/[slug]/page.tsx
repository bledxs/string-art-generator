// Server Component - Individual Blog Post Page
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  ArrowLeft,
  BookOpen,
  Share2,
  User,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { blogPosts } from '@/content/blog/posts';
import { deriveReadingTime } from '@/content/blog/reading-time';
import { ShareButton } from '@/features/blog/components/ShareButton';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Blog`,
    description: post.description,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${siteConfig.url}/blog/${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteConfig.url}/blog/${post.image}`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Dynamically import MDX content & derive reading time
  let PostContent;
  let dynamicReadingTime = '5 min read'; // default fallback
  try {
    const mod = require(`@/content/blog/${slug}.mdx`);
    PostContent = mod.default;
    // Pass slug so we can derive word count if meta lacks metrics
    dynamicReadingTime = deriveReadingTime(mod.meta ?? {}, '5 min read', slug);
  } catch {
    return (
      <div className='container mx-auto max-w-4xl px-4 py-8'>
        <Card>
          <CardContent className='p-8 text-center'>
            <BookOpen className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
            <h2 className='text-xl font-bold mb-2'>Content Coming Soon</h2>
            <p className='text-muted-foreground mb-6'>
              This article is currently being written. Check back soon!
            </p>
            <Link href='/blog'>
              <Button>
                <ArrowLeft className='h-4 w-4 mr-2' />
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto max-w-4xl px-4 py-8 md:py-12'>
      {/* Back Button */}
      <Link
        href='/blog'
        className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors'>
        <ArrowLeft className='h-4 w-4' />
        Back to Blog
      </Link>

      {/* Article Header */}
      <article>
        <header className='mb-12 space-y-6 pb-8 border-b border-border/50'>
          {/* Category */}
          <Badge variant='secondary' className='mb-2 text-sm px-3 py-1'>
            {post.category}
          </Badge>

          {/* Title */}
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            {post.title}
          </h1>

          {/* Description */}
          <p className='text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl'>
            {post.description}
          </p>

          {/* Meta */}
          <div className='flex flex-wrap items-center gap-4 pt-6 text-sm'>
            <div className='flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full'>
              <User className='h-4 w-4 text-primary' />
              <span className='font-medium'>{post.author}</span>
            </div>
            <div className='flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full'>
              <Calendar className='h-4 w-4 text-primary' />
              <time dateTime={post.date} className='font-medium'>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className='flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full'>
              <Clock className='h-4 w-4 text-primary' />
              <span className='font-medium'>{dynamicReadingTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className='flex flex-wrap gap-2 pt-4'>
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant='outline'
                className='font-normal px-3 py-1 hover:bg-primary/10 hover:border-primary transition-colors cursor-default'>
                #{tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div
          className='prose prose-lg prose-slate dark:prose-invert max-w-none mb-12
          prose-headings:scroll-mt-20
          prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-primary/20
          prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-primary
          prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-primary prose-a:font-medium prose-a:no-underline prose-a:transition-all hover:prose-a:underline hover:prose-a:text-primary/80
          prose-strong:font-semibold prose-strong:text-foreground
          prose-em:italic
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:my-6 prose-blockquote:rounded-r prose-blockquote:not-italic
          prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
          prose-li:my-2 prose-li:leading-relaxed
          prose-li::marker:text-primary prose-li::marker:font-bold
          [&_.lead]:text-xl [&_.lead]:leading-relaxed [&_.lead]:my-6 [&_.lead]:p-6 [&_.lead]:bg-linear-to-r [&_.lead]:from-primary/5 [&_.lead]:to-transparent [&_.lead]:border-l-4 [&_.lead]:border-primary [&_.lead]:rounded-r [&_.lead]:italic [&_.lead]:text-foreground/80'>
          <PostContent />
        </div>

        {/* Share */}
        <Card className='bg-linear-to-br from-primary/5 via-primary/10 to-secondary/5 border-primary/20'>
          <CardContent className='p-6'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div>
                <h3 className='font-bold text-lg mb-1'>Found this helpful?</h3>
                <p className='text-sm text-muted-foreground'>
                  Share it with others who might enjoy it too.
                </p>
              </div>
              <ShareButton
                title={post.title}
                description={post.description}
                url={`${siteConfig.url}/blog/${post.slug}`}
              />
            </div>
          </CardContent>
        </Card>
      </article>

      {/* Related Posts or CTA */}
      <div className='mt-12 grid md:grid-cols-2 gap-6'>
        <Card className='bg-linear-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg group'>
          <CardContent className='p-6'>
            <div className='flex items-start gap-3 mb-3'>
              <div className='p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors'>
                <Sparkles className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h3 className='font-bold text-lg'>Try the Generator</h3>
              </div>
            </div>
            <p className='text-sm text-muted-foreground mb-4'>
              Ready to create your own string art? Start with our free online
              generator.
            </p>
            <Link href='/editor'>
              <Button className='w-full group-hover:scale-[1.02] transition-transform'>
                Start Creating
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className='bg-linear-to-br from-secondary/10 to-secondary/5 border-secondary/20 hover:border-secondary/40 transition-all hover:shadow-lg group'>
          <CardContent className='p-6'>
            <div className='flex items-start gap-3 mb-3'>
              <div className='p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors'>
                <BookOpen className='h-5 w-5 text-secondary' />
              </div>
              <div>
                <h3 className='font-bold text-lg'>Learn More</h3>
              </div>
            </div>
            <p className='text-sm text-muted-foreground mb-4'>
              Check out our tutorials for step-by-step guides and best
              practices.
            </p>
            <Link href='/tutorials'>
              <Button
                variant='outline'
                className='w-full group-hover:scale-[1.02] transition-transform'>
                View Tutorials
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
