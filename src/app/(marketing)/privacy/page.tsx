// Server Component - Privacy Policy
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Eye, Cookie, Lock, Mail, FileText } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how String Art Generator collects, uses, and protects your data. GDPR and CCPA compliant privacy policy.',
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
  openGraph: {
    title: 'Privacy Policy - String Art Generator',
    description: 'Privacy policy and data protection information',
    url: `${siteConfig.url}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = '21 November 2025';

export default function PrivacyPolicyPage() {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8 md:py-12'>
      {/* Header */}
      <div className='mb-8 md:mb-12'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <Shield className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Privacy Policy</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Privacy Policy
        </h1>
        <p className='text-lg text-muted-foreground'>
          Last Updated: <time dateTime='2025-11-21'>{LAST_UPDATED}</time>
        </p>
      </div>

      {/* Table of Contents */}
      <Card className='mb-8 bg-muted/30'>
        <CardContent className='p-6'>
          <h2 className='font-bold mb-4 flex items-center gap-2'>
            <FileText className='h-5 w-5 text-primary' />
            Table of Contents
          </h2>
          <nav className='space-y-2'>
            <a
              href='#introduction'
              className='block text-sm hover:text-primary transition-colors'>
              1. Introduction
            </a>
            <a
              href='#data-collection'
              className='block text-sm hover:text-primary transition-colors'>
              2. Information We Collect
            </a>
            <a
              href='#data-usage'
              className='block text-sm hover:text-primary transition-colors'>
              3. How We Use Your Data
            </a>
            <a
              href='#third-party'
              className='block text-sm hover:text-primary transition-colors'>
              4. Third-Party Services
            </a>
            <a
              href='#cookies'
              className='block text-sm hover:text-primary transition-colors'>
              5. Cookies and Tracking
            </a>
            <a
              href='#user-rights'
              className='block text-sm hover:text-primary transition-colors'>
              6. Your Rights (GDPR/CCPA)
            </a>
            <a
              href='#data-security'
              className='block text-sm hover:text-primary transition-colors'>
              7. Data Security
            </a>
            <a
              href='#children'
              className='block text-sm hover:text-primary transition-colors'>
              8. Children's Privacy
            </a>
            <a
              href='#changes'
              className='block text-sm hover:text-primary transition-colors'>
              9. Changes to This Policy
            </a>
            <a
              href='#contact'
              className='block text-sm hover:text-primary transition-colors'>
              10. Contact Us
            </a>
          </nav>
        </CardContent>
      </Card>

      {/* Content */}
      <div className='prose prose-slate dark:prose-invert max-w-none'>
        {/* 1. Introduction */}
        <section id='introduction' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Shield className='h-6 w-6 text-primary' />
            1. Introduction
          </h2>
          <p className='text-foreground/80 mb-4'>
            Welcome to String Art Generator ("we," "our," or "us"). We are
            committed to protecting your privacy and ensuring transparency about
            how we handle your data.
          </p>
          <p className='text-foreground/80 mb-4'>
            This Privacy Policy explains what information we collect, how we use
            it, and your rights regarding your personal data when you use our
            website at{' '}
            <a href={siteConfig.url} className='text-primary hover:underline'>
              {siteConfig.url}
            </a>{' '}
            (the "Service").
          </p>
          <p className='text-foreground/80'>
            By using our Service, you agree to the collection and use of
            information in accordance with this policy.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 2. Information We Collect */}
        <section id='data-collection' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Eye className='h-6 w-6 text-primary' />
            2. Information We Collect
          </h2>

          <h3 className='text-xl font-semibold mb-3'>
            2.1 Information You Provide
          </h3>
          <p className='text-foreground/80 mb-4'>
            <strong>Images:</strong> When you upload images to generate string
            art, these images are processed locally in your browser using Web
            Workers. We do not upload, store, or have access to your images on
            our servers.
          </p>
          <p className='text-foreground/80 mb-4'>
            <strong>Contact Information:</strong> If you contact us via email or
            contact form, we collect your name, email address, and message
            content to respond to your inquiry.
          </p>

          <h3 className='text-xl font-semibold mb-3 mt-6'>
            2.2 Automatically Collected Information
          </h3>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80 mb-4'>
            <li>
              <strong>LocalStorage Data:</strong> We store your preferences
              (theme, settings) and saved projects locally in your browser's
              LocalStorage. This data never leaves your device.
            </li>
            <li>
              <strong>Analytics Data:</strong> We may use Google Analytics to
              collect anonymous usage statistics including:
              <ul className='list-circle pl-6 mt-2 space-y-1'>
                <li>Pages visited and time spent on site</li>
                <li>Device type, browser, and operating system</li>
                <li>Approximate geographic location (country/city level)</li>
                <li>Referral source (how you found our site)</li>
              </ul>
            </li>
            <li>
              <strong>Advertising Data:</strong> If you consent to advertising
              cookies, Google AdSense may collect data to serve personalized
              ads. See Section 5 for details.
            </li>
          </ul>

          <h3 className='text-xl font-semibold mb-3 mt-6'>
            2.3 Information We DO NOT Collect
          </h3>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>We do not require or collect account information (no login)</li>
            <li>
              We do not upload or store your images on our servers (all
              processing is client-side)
            </li>
            <li>We do not collect payment information (service is free)</li>
            <li>
              We do not collect sensitive personal information (health, race,
              religion, etc.)
            </li>
          </ul>
        </section>

        <Separator className='my-8' />

        {/* 3. How We Use Your Data */}
        <section id='data-usage' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>3. How We Use Your Data</h2>
          <p className='text-foreground/80 mb-4'>
            We use the collected information for the following purposes:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>
              <strong>Service Provision:</strong> To provide and maintain the
              string art generation functionality
            </li>
            <li>
              <strong>User Experience:</strong> To save your preferences and
              settings locally for a better experience
            </li>
            <li>
              <strong>Analytics:</strong> To understand how users interact with
              our Service and improve it
            </li>
            <li>
              <strong>Communication:</strong> To respond to your inquiries and
              provide support
            </li>
            <li>
              <strong>Advertising:</strong> To display relevant advertisements
              (with your consent via cookies)
            </li>
            <li>
              <strong>Legal Compliance:</strong> To comply with legal
              obligations and protect our rights
            </li>
          </ul>
        </section>

        <Separator className='my-8' />

        {/* 4. Third-Party Services */}
        <section id='third-party' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>4. Third-Party Services</h2>
          <p className='text-foreground/80 mb-4'>
            We use the following third-party services that may collect data:
          </p>

          <div className='space-y-4'>
            <Card>
              <CardContent className='p-4'>
                <h3 className='font-semibold mb-2'>Google Analytics</h3>
                <p className='text-sm text-foreground/70 mb-2'>
                  We use Google Analytics to analyze site traffic and usage
                  patterns. Google may use cookies and collect IP addresses.
                </p>
                <a
                  href='https://policies.google.com/privacy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-primary hover:underline'>
                  Google Privacy Policy →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <h3 className='font-semibold mb-2'>Google AdSense</h3>
                <p className='text-sm text-foreground/70 mb-2'>
                  We display advertisements through Google AdSense. Google and
                  its partners may use cookies to serve ads based on your
                  browsing activity.
                </p>
                <a
                  href='https://policies.google.com/technologies/ads'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-primary hover:underline'>
                  Google Ads Privacy Policy →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-4'>
                <h3 className='font-semibold mb-2'>Vercel (Hosting)</h3>
                <p className='text-sm text-foreground/70 mb-2'>
                  Our website is hosted on Vercel. Server logs may collect IP
                  addresses and request metadata for security and performance.
                </p>
                <a
                  href='https://vercel.com/legal/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-primary hover:underline'>
                  Vercel Privacy Policy →
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className='my-8' />

        {/* 5. Cookies and Tracking */}
        <section id='cookies' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Cookie className='h-6 w-6 text-primary' />
            5. Cookies and Tracking Technologies
          </h2>
          <p className='text-foreground/80 mb-4'>
            We use cookies and similar tracking technologies to enhance your
            experience. For detailed information, please see our{' '}
            <Link href='/cookies' className='text-primary hover:underline'>
              Cookie Policy
            </Link>
            .
          </p>

          <h3 className='text-xl font-semibold mb-3'>
            Types of Cookies We Use:
          </h3>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>
              <strong>Essential Cookies:</strong> Required for the Service to
              function (e.g., LocalStorage for saving projects)
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand site usage
              (Google Analytics)
            </li>
            <li>
              <strong>Advertising Cookies:</strong> Used to display relevant ads
              (Google AdSense) - requires consent
            </li>
          </ul>

          <p className='text-foreground/80 mt-4'>
            You can control cookies through your browser settings. Note that
            disabling essential cookies may affect functionality.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 6. Your Rights */}
        <section id='user-rights' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Lock className='h-6 w-6 text-primary' />
            6. Your Rights (GDPR & CCPA)
          </h2>
          <p className='text-foreground/80 mb-4'>
            Depending on your location, you may have the following rights
            regarding your personal data:
          </p>

          <h3 className='text-xl font-semibold mb-3'>
            GDPR Rights (EU Users):
          </h3>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80 mb-4'>
            <li>
              <strong>Right to Access:</strong> Request a copy of your personal
              data
            </li>
            <li>
              <strong>Right to Rectification:</strong> Correct inaccurate data
            </li>
            <li>
              <strong>Right to Erasure:</strong> Request deletion of your data
              ("right to be forgotten")
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> Limit how we use
              your data
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Receive your data in a
              structured format
            </li>
            <li>
              <strong>Right to Object:</strong> Object to data processing,
              including marketing
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Withdraw consent at
              any time
            </li>
          </ul>

          <h3 className='text-xl font-semibold mb-3'>
            CCPA Rights (California Users):
          </h3>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80 mb-4'>
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of sale of personal information</li>
            <li>Right to non-discrimination for exercising your rights</li>
          </ul>

          <p className='text-foreground/80'>
            <strong>Note:</strong> Since we process most data locally in your
            browser, you have direct control. You can delete LocalStorage data
            via browser settings, and opt-out of advertising cookies through
            Google's{' '}
            <a
              href='https://adssettings.google.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'>
              Ads Settings
            </a>
            .
          </p>

          <p className='text-foreground/80 mt-4'>
            To exercise any of these rights, contact us at{' '}
            <a
              href={`mailto:${siteConfig.contact.support}`}
              className='text-primary hover:underline'>
              {siteConfig.contact.support}
            </a>
            .
          </p>
        </section>

        <Separator className='my-8' />

        {/* 7. Data Security */}
        <section id='data-security' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>7. Data Security</h2>
          <p className='text-foreground/80 mb-4'>
            We take reasonable measures to protect your data:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>
              <strong>Client-Side Processing:</strong> Your images never leave
              your browser - processed locally using Web Workers
            </li>
            <li>
              <strong>HTTPS Encryption:</strong> All data transmitted to/from
              our servers is encrypted via SSL/TLS
            </li>
            <li>
              <strong>No Sensitive Data Storage:</strong> We don't store
              passwords, payment info, or sensitive personal data
            </li>
            <li>
              <strong>Secure Hosting:</strong> Infrastructure hosted on Vercel's
              secure platform
            </li>
          </ul>
          <p className='text-foreground/80 mt-4'>
            However, no method of transmission over the internet is 100% secure.
            We cannot guarantee absolute security.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 8. Children's Privacy */}
        <section id='children' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>8. Children's Privacy</h2>
          <p className='text-foreground/80 mb-4'>
            Our Service is not directed to children under the age of 13. We do
            not knowingly collect personal information from children under 13.
          </p>
          <p className='text-foreground/80'>
            If you are a parent or guardian and believe your child has provided
            us with personal information, please contact us at{' '}
            <a
              href={`mailto:${siteConfig.contact.support}`}
              className='text-primary hover:underline'>
              {siteConfig.contact.support}
            </a>
            , and we will take steps to delete such information.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 9. Changes to This Policy */}
        <section id='changes' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>
            9. Changes to This Privacy Policy
          </h2>
          <p className='text-foreground/80 mb-4'>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for legal, regulatory, or operational
            reasons.
          </p>
          <p className='text-foreground/80 mb-4'>
            We will notify you of any material changes by:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>Updating the "Last Updated" date at the top of this page</li>
            <li>
              Displaying a prominent notice on our website (for significant
              changes)
            </li>
          </ul>
          <p className='text-foreground/80 mt-4'>
            Your continued use of the Service after changes constitutes
            acceptance of the updated policy.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 10. Contact Us */}
        <section id='contact' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Mail className='h-6 w-6 text-primary' />
            10. Contact Us
          </h2>
          <p className='text-foreground/80 mb-4'>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please contact us:
          </p>
          <Card className='bg-muted/30'>
            <CardContent className='p-6'>
              <div className='space-y-2'>
                <p className='font-semibold'>String Art Generator</p>
                <p className='text-sm text-foreground/70'>
                  Email:{' '}
                  <a
                    href={`mailto:${siteConfig.contact.support}`}
                    className='text-primary hover:underline'>
                    {siteConfig.contact.support}
                  </a>
                </p>
                <p className='text-sm text-foreground/70'>
                  Website:{' '}
                  <a
                    href={siteConfig.url}
                    className='text-primary hover:underline'>
                    {siteConfig.url}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Related Links */}
      <Card className='mt-12 bg-primary/5'>
        <CardContent className='p-6'>
          <h3 className='font-semibold mb-4'>Related Policies</h3>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Link
              href='/terms'
              className='text-sm text-primary hover:underline'>
              Terms of Service →
            </Link>
            <Link
              href='/cookies'
              className='text-sm text-primary hover:underline'>
              Cookie Policy →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
