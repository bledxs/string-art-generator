// Server Component - Terms of Service
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Scale, AlertTriangle, Mail, Shield } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service, acceptable use policy, and legal information for String Art Generator.',
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
  openGraph: {
    title: 'Terms of Service - String Art Generator',
    description: 'Terms and conditions for using String Art Generator',
    url: `${siteConfig.url}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = '21 November 2025';
const EFFECTIVE_DATE = '21 November 2025';

export default function TermsOfServicePage() {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8 md:py-12'>
      {/* Header */}
      <div className='mb-8 md:mb-12'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <Scale className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Terms of Service</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Terms of Service
        </h1>
        <div className='text-lg text-muted-foreground space-y-1'>
          <p>
            Last Updated: <time dateTime='2025-11-21'>{LAST_UPDATED}</time>
          </p>
          <p>
            Effective Date: <time dateTime='2025-11-21'>{EFFECTIVE_DATE}</time>
          </p>
        </div>
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
              href='#acceptance'
              className='block text-sm hover:text-primary transition-colors'>
              1. Acceptance of Terms
            </a>
            <a
              href='#description'
              className='block text-sm hover:text-primary transition-colors'>
              2. Description of Service
            </a>
            <a
              href='#acceptable-use'
              className='block text-sm hover:text-primary transition-colors'>
              3. Acceptable Use Policy
            </a>
            <a
              href='#intellectual-property'
              className='block text-sm hover:text-primary transition-colors'>
              4. Intellectual Property Rights
            </a>
            <a
              href='#user-content'
              className='block text-sm hover:text-primary transition-colors'>
              5. User-Generated Content
            </a>
            <a
              href='#disclaimer'
              className='block text-sm hover:text-primary transition-colors'>
              6. Disclaimer of Warranties
            </a>
            <a
              href='#limitation'
              className='block text-sm hover:text-primary transition-colors'>
              7. Limitation of Liability
            </a>
            <a
              href='#modifications'
              className='block text-sm hover:text-primary transition-colors'>
              8. Modifications to Service
            </a>
            <a
              href='#termination'
              className='block text-sm hover:text-primary transition-colors'>
              9. Termination
            </a>
            <a
              href='#governing-law'
              className='block text-sm hover:text-primary transition-colors'>
              10. Governing Law
            </a>
            <a
              href='#contact'
              className='block text-sm hover:text-primary transition-colors'>
              11. Contact Information
            </a>
          </nav>
        </CardContent>
      </Card>

      {/* Content */}
      <div className='prose prose-slate dark:prose-invert max-w-none'>
        {/* 1. Acceptance of Terms */}
        <section id='acceptance' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>1. Acceptance of Terms</h2>
          <p className='text-foreground/80 mb-4'>
            Welcome to String Art Generator. By accessing or using our website
            at{' '}
            <a href={siteConfig.url} className='text-primary hover:underline'>
              {siteConfig.url}
            </a>{' '}
            (the "Service"), you agree to be bound by these Terms of Service
            ("Terms").
          </p>
          <p className='text-foreground/80 mb-4'>
            If you do not agree to these Terms, you may not access or use the
            Service.
          </p>
          <p className='text-foreground/80'>
            These Terms constitute a legally binding agreement between you and
            String Art Generator ("we," "us," or "our").
          </p>
        </section>

        <Separator className='my-8' />

        {/* 2. Description of Service */}
        <section id='description' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>2. Description of Service</h2>
          <p className='text-foreground/80 mb-4'>
            String Art Generator is a free, web-based tool that allows users to:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>Upload images to generate string art patterns</li>
            <li>Customize parameters (pins, lines, colors, opacity, etc.)</li>
            <li>
              Export generated patterns in multiple formats (PNG, SVG, JSON,
              TXT)
            </li>
            <li>Save and load projects locally in the browser</li>
          </ul>
          <p className='text-foreground/80 mt-4'>
            The Service processes all images locally in your browser using Web
            Workers. We do not upload, store, or have access to your images on
            our servers.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 3. Acceptable Use Policy */}
        <section id='acceptable-use' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <AlertTriangle className='h-6 w-6 text-primary' />
            3. Acceptable Use Policy
          </h2>
          <p className='text-foreground/80 mb-4'>
            You agree to use the Service only for lawful purposes and in
            accordance with these Terms. You agree NOT to:
          </p>

          <h3 className='text-xl font-semibold mb-3'>Prohibited Content:</h3>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80 mb-4'>
            <li>
              Upload images that are illegal, obscene, defamatory, or violate
              third-party rights
            </li>
            <li>
              Upload images containing child exploitation material or
              non-consensual intimate images
            </li>
            <li>
              Upload images that promote hate speech, violence, or
              discrimination
            </li>
            <li>
              Upload images that infringe copyrights, trademarks, or other
              intellectual property rights
            </li>
          </ul>

          <h3 className='text-xl font-semibold mb-3'>Prohibited Activities:</h3>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>
              Attempt to reverse engineer, decompile, or extract the source code
              of the Service (except as permitted by open source licenses)
            </li>
            <li>
              Use automated tools (bots, scripts) to access the Service in
              excessive volumes
            </li>
            <li>
              Attempt to gain unauthorized access to our systems or networks
            </li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>
              Use the Service to transmit malware, viruses, or malicious code
            </li>
            <li>
              Impersonate any person or entity, or misrepresent your affiliation
            </li>
          </ul>
        </section>

        <Separator className='my-8' />

        {/* 4. Intellectual Property Rights */}
        <section id='intellectual-property' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Shield className='h-6 w-6 text-primary' />
            4. Intellectual Property Rights
          </h2>

          <h3 className='text-xl font-semibold mb-3'>
            4.1 Our Intellectual Property
          </h3>
          <p className='text-foreground/80 mb-4'>
            The Service, including its original content, features, and
            functionality, is owned by String Art Generator and is protected by
            international copyright, trademark, and other intellectual property
            laws.
          </p>
          <p className='text-foreground/80 mb-4'>
            Our source code is licensed under the{' '}
            <a
              href='https://opensource.org/licenses/MIT'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'>
              MIT License
            </a>{' '}
            and available on{' '}
            <a
              href='https://github.com/bledxs/string-art-generator'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'>
              GitHub
            </a>
            . You may use, modify, and distribute the code according to the MIT
            License terms.
          </p>

          <h3 className='text-xl font-semibold mb-3 mt-6'>
            4.2 User Content Ownership
          </h3>
          <p className='text-foreground/80 mb-4'>
            <strong>
              You retain all rights to your images and generated string art
              patterns.
            </strong>{' '}
            We do not claim any ownership over your content.
          </p>
          <p className='text-foreground/80 mb-4'>
            Since all processing happens in your browser, we never receive,
            store, or have access to your images or generated patterns.
          </p>

          <h3 className='text-xl font-semibold mb-3 mt-6'>4.3 Trademarks</h3>
          <p className='text-foreground/80'>
            "String Art Generator" and related logos (if any) are trademarks of
            String Art Generator. You may not use our trademarks without prior
            written permission.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 5. User-Generated Content */}
        <section id='user-content' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>5. User-Generated Content</h2>
          <p className='text-foreground/80 mb-4'>
            <strong>Privacy and Local Processing:</strong> All images you upload
            and patterns you generate are processed locally in your browser
            using Web Workers. This means:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80 mb-4'>
            <li>Your images never leave your device</li>
            <li>We do not upload, store, or access your content</li>
            <li>
              Your projects are saved only in your browser's LocalStorage (under
              your control)
            </li>
          </ul>

          <h3 className='text-xl font-semibold mb-3 mt-6'>
            Responsibility for Content:
          </h3>
          <p className='text-foreground/80 mb-4'>
            You are solely responsible for:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>Ensuring you have the right to use any images you upload</li>
            <li>Compliance with applicable laws regarding your content</li>
            <li>
              Any consequences of uploading or sharing inappropriate content
            </li>
          </ul>
        </section>

        <Separator className='my-8' />

        {/* 6. Disclaimer of Warranties */}
        <section id='disclaimer' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>
            6. Disclaimer of Warranties
          </h2>
          <Card className='border-orange-500/50 bg-orange-500/5'>
            <CardContent className='p-4'>
              <p className='text-sm font-semibold mb-2 flex items-center gap-2'>
                <AlertTriangle className='h-4 w-4 text-orange-500' />
                IMPORTANT LEGAL NOTICE
              </p>
              <p className='text-sm text-foreground/70'>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
            </CardContent>
          </Card>

          <div className='mt-4 space-y-4 text-foreground/80'>
            <p>
              To the fullest extent permitted by law, we disclaim all
              warranties, including but not limited to:
            </p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>
                Implied warranties of merchantability and fitness for a
                particular purpose
              </li>
              <li>Warranties of non-infringement</li>
              <li>
                Warranties that the Service will be uninterrupted, secure, or
                error-free
              </li>
              <li>
                Warranties regarding the accuracy or reliability of results
              </li>
            </ul>
            <p>We do not warrant that:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>The Service will meet your specific requirements</li>
              <li>Generated string art will match your expectations</li>
              <li>Defects will be corrected</li>
              <li>The Service is free from viruses or harmful components</li>
            </ul>
          </div>
        </section>

        <Separator className='my-8' />

        {/* 7. Limitation of Liability */}
        <section id='limitation' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>
            7. Limitation of Liability
          </h2>
          <Card className='border-red-500/50 bg-red-500/5'>
            <CardContent className='p-4'>
              <p className='text-sm font-semibold mb-2'>DISCLAIMER</p>
              <p className='text-sm text-foreground/70'>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, STRING ART GENERATOR
                SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR
                REVENUES.
              </p>
            </CardContent>
          </Card>

          <div className='mt-4 space-y-4 text-foreground/80'>
            <p>We are not liable for:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>
                Loss of data, including images or saved projects (always backup
                important work)
              </li>
              <li>
                Errors, bugs, or inaccuracies in generated string art patterns
              </li>
              <li>Interruptions or unavailability of the Service</li>
              <li>Your use or inability to use the Service</li>
              <li>Any third-party content, including advertisements</li>
              <li>Unauthorized access to your browser's LocalStorage</li>
              <li>
                Any damages resulting from physical construction of string art
                based on our generated patterns
              </li>
            </ul>

            <p className='mt-4'>
              <strong>Maximum Liability:</strong> In jurisdictions that do not
              allow exclusion of liability, our total liability to you for all
              damages shall not exceed $100 USD or the amount you paid to use
              the Service (which is $0, as the Service is free).
            </p>
          </div>
        </section>

        <Separator className='my-8' />

        {/* 8. Modifications to Service */}
        <section id='modifications' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>
            8. Modifications to Service
          </h2>
          <p className='text-foreground/80 mb-4'>We reserve the right to:</p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>
              Modify, suspend, or discontinue the Service (or any part thereof)
              at any time
            </li>
            <li>Change features, functionality, or user interface</li>
            <li>Impose limits on certain features or access</li>
            <li>Update these Terms at our discretion</li>
          </ul>
          <p className='text-foreground/80 mt-4'>
            We will make reasonable efforts to notify users of material changes,
            but we are not obligated to do so. Your continued use of the Service
            after changes constitutes acceptance.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 9. Termination */}
        <section id='termination' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>9. Termination</h2>
          <h3 className='text-xl font-semibold mb-3'>9.1 By You</h3>
          <p className='text-foreground/80 mb-4'>
            You may stop using the Service at any time. Since no account is
            required, simply clearing your browser's LocalStorage will remove
            all saved data.
          </p>

          <h3 className='text-xl font-semibold mb-3'>9.2 By Us</h3>
          <p className='text-foreground/80 mb-4'>
            We reserve the right to terminate or suspend your access to the
            Service immediately, without prior notice, if:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80'>
            <li>You violate these Terms</li>
            <li>You engage in prohibited activities (Section 3)</li>
            <li>We are required to do so by law</li>
            <li>We discontinue the Service</li>
          </ul>

          <h3 className='text-xl font-semibold mb-3 mt-6'>
            9.3 Effect of Termination
          </h3>
          <p className='text-foreground/80'>
            Upon termination, your right to use the Service ceases immediately.
            Provisions regarding intellectual property, disclaimers, limitations
            of liability, and dispute resolution survive termination.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 10. Governing Law */}
        <section id='governing-law' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4'>
            10. Governing Law and Disputes
          </h2>
          <h3 className='text-xl font-semibold mb-3'>10.1 Governing Law</h3>
          <p className='text-foreground/80 mb-4'>
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            law provisions.
          </p>

          <h3 className='text-xl font-semibold mb-3'>
            10.2 Dispute Resolution
          </h3>
          <p className='text-foreground/80 mb-4'>
            Any disputes arising out of or relating to these Terms or the
            Service shall be resolved through:
          </p>
          <ol className='list-decimal pl-6 space-y-2 text-foreground/80'>
            <li>
              <strong>Informal Negotiation:</strong> Contact us at{' '}
              <a
                href={`mailto:${siteConfig.contact.support}`}
                className='text-primary hover:underline'>
                {siteConfig.contact.support}
              </a>{' '}
              to attempt resolution
            </li>
            <li>
              <strong>Binding Arbitration:</strong> If negotiation fails,
              disputes will be settled by binding arbitration (if applicable in
              your jurisdiction)
            </li>
          </ol>

          <h3 className='text-xl font-semibold mb-3 mt-6'>
            10.3 Class Action Waiver
          </h3>
          <p className='text-foreground/80'>
            You agree that disputes will be resolved individually, not as a
            class action or collective proceeding.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 11. Contact */}
        <section id='contact' className='mb-8 scroll-mt-20'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Mail className='h-6 w-6 text-primary' />
            11. Contact Information
          </h2>
          <p className='text-foreground/80 mb-4'>
            If you have any questions about these Terms, please contact us:
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
                <p className='text-sm text-foreground/70'>
                  GitHub:{' '}
                  <a
                    href='https://github.com/bledxs/string-art-generator'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'>
                    github.com/bledxs/string-art-generator
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Acknowledgment */}
        <Separator className='my-8' />
        <section className='mb-8'>
          <Card className='bg-primary/5'>
            <CardContent className='p-6'>
              <h3 className='font-semibold mb-3'>Acknowledgment</h3>
              <p className='text-sm text-foreground/70'>
                By using String Art Generator, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of
                Service.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Related Links */}
      <Card className='mt-12 bg-muted/30'>
        <CardContent className='p-6'>
          <h3 className='font-semibold mb-4'>Related Policies</h3>
          <div className='flex flex-col sm:flex-row gap-3'>
            <Link
              href='/privacy'
              className='text-sm text-primary hover:underline'>
              Privacy Policy →
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
