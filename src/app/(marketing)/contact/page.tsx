import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Github, HelpCircle, MessageSquare, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { ContactForm } from '@/features/contact/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Get Support',
  description:
    'Get in touch with the String Art Generator team. Report bugs, request features, or ask questions. We respond within 24-48 hours.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: 'Contact Us - String Art Generator',
    description: 'Get support and connect with our team',
    url: `${siteConfig.url}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className='container mx-auto max-w-6xl px-4 py-8 md:py-12'>
      {/* Header */}
      <div className='mb-8 md:mb-12 text-center'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <MessageSquare className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Contact</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Get in Touch
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Have questions, feedback, or need support? We're here to help. Choose
          your preferred way to reach us.
        </p>
      </div>

      <div className='grid lg:grid-cols-3 gap-8'>
        {/* Contact Form - Main Column */}
        <div className='lg:col-span-2'>
          <Card>
            <CardContent className='p-6 md:p-8'>
              <div className='mb-6'>
                <h2 className='text-2xl font-bold mb-2'>Send Us a Message</h2>
                <p className='text-muted-foreground'>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        {/* Contact Options - Sidebar */}
        <div className='space-y-6'>
          {/* Direct Email */}
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
                  <Mail className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-bold mb-2'>Email Us Directly</h3>
                  <p className='text-sm text-muted-foreground mb-3'>
                    Prefer email? Send us a message directly.
                  </p>
                  <a
                    href='mailto:support@stringartgenerator.app'
                    className='text-primary hover:underline text-sm break-all'>
                    support@stringartgenerator.app
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GitHub Issues */}
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
                  <Github className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-bold mb-2'>Report on GitHub</h3>
                  <p className='text-sm text-muted-foreground mb-3'>
                    Found a bug or have a feature request? Open an issue on
                    GitHub.
                  </p>
                  <a
                    href={siteConfig.links.github + '/issues'}
                    target='_blank'
                    rel='noopener noreferrer'>
                    <Button variant='outline' size='sm' className='w-full'>
                      <Github className='h-4 w-4 mr-2' />
                      Open Issue
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Link */}
          <Card>
            <CardContent className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
                  <HelpCircle className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <h3 className='font-bold mb-2'>Check the FAQ</h3>
                  <p className='text-sm text-muted-foreground mb-3'>
                    Your question might already be answered in our frequently
                    asked questions.
                  </p>
                  <Link href='/faq'>
                    <Button variant='outline' size='sm' className='w-full'>
                      <HelpCircle className='h-4 w-4 mr-2' />
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className='bg-primary/5'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-3'>
                <Clock className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                <div>
                  <h3 className='font-bold mb-2 text-sm'>Response Time</h3>
                  <p className='text-xs text-muted-foreground'>
                    We typically respond within <strong>24-48 hours</strong>{' '}
                    during business days (Mon-Fri). For urgent technical issues,
                    GitHub issues get faster attention.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Resources */}
      <div className='mt-12 grid md:grid-cols-3 gap-6'>
        <Card>
          <CardContent className='p-6 text-center'>
            <HelpCircle className='h-8 w-8 text-primary mx-auto mb-3' />
            <h3 className='font-bold mb-2'>Common Questions</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              Browse our comprehensive FAQ with 22 answered questions across 6
              categories.
            </p>
            <Link href='/faq'>
              <Button variant='outline' className='w-full'>
                View FAQ
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6 text-center'>
            <MessageSquare className='h-8 w-8 text-primary mx-auto mb-3' />
            <h3 className='font-bold mb-2'>Community Support</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              Join discussions, share your creations, and help other users on
              GitHub.
            </p>
            <a
              href={siteConfig.links.github + '/discussions'}
              target='_blank'
              rel='noopener noreferrer'>
              <Button variant='outline' className='w-full'>
                Join Discussions
              </Button>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6 text-center'>
            <Github className='h-8 w-8 text-primary mx-auto mb-3' />
            <h3 className='font-bold mb-2'>Contribute</h3>
            <p className='text-sm text-muted-foreground mb-4'>
              String Art Generator is open source. Contribute code, report bugs,
              or suggest features.
            </p>
            <a
              href={siteConfig.links.github}
              target='_blank'
              rel='noopener noreferrer'>
              <Button variant='outline' className='w-full'>
                View on GitHub
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
