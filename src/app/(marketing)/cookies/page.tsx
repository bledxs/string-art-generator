// Server Component - Cookie Policy
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Cookie, Shield, Settings, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Learn about the cookies and tracking technologies used by String Art Generator.',
  alternates: {
    canonical: `${siteConfig.url}/cookies`,
  },
  openGraph: {
    title: 'Cookie Policy - String Art Generator',
    description: 'Information about cookies and tracking technologies',
    url: `${siteConfig.url}/cookies`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = '21 de noviembre de 2025';

export default function CookiePolicyPage() {
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8 md:py-12'>
      {/* Header */}
      <div className='mb-8 md:mb-12'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4'>
          <Cookie className='h-4 w-4 text-primary' />
          <span className='text-sm font-medium'>Cookie Policy</span>
        </div>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4'>
          Cookie Policy
        </h1>
        <p className='text-lg text-muted-foreground'>
          Last Updated: <time dateTime='2025-11-21'>{LAST_UPDATED}</time>
        </p>
      </div>

      {/* Quick Summary */}
      <Card className='mb-8 bg-primary/5'>
        <CardContent className='p-6'>
          <h2 className='font-bold mb-3 flex items-center gap-2'>
            <Shield className='h-5 w-5 text-primary' />
            Quick Summary
          </h2>
          <ul className='space-y-2 text-sm text-foreground/80'>
            <li>
              ✅ We use LocalStorage to save your settings and projects locally
            </li>
            <li>
              ✅ Google Analytics cookies help us understand site usage
              (anonymous)
            </li>
            <li>
              ✅ Google AdSense cookies enable personalized advertising (with
              consent)
            </li>
            <li>✅ You can control cookies through your browser settings</li>
            <li>✅ Essential cookies are required for the site to function</li>
          </ul>
        </CardContent>
      </Card>

      {/* Content */}
      <div className='prose prose-slate dark:prose-invert max-w-none'>
        {/* 1. What Are Cookies */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>1. What Are Cookies?</h2>
          <p className='text-foreground/80 mb-4'>
            Cookies are small text files that are placed on your device
            (computer, smartphone, tablet) when you visit a website. They are
            widely used to make websites work more efficiently and provide
            information to website owners.
          </p>
          <p className='text-foreground/80'>
            In addition to cookies, we also use similar technologies like{' '}
            <strong>LocalStorage</strong> and <strong>SessionStorage</strong> to
            store data directly in your browser.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 2. What Cookies We Use */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>
            2. What Cookies and Technologies We Use
          </h2>
          <p className='text-foreground/80 mb-6'>
            We use the following types of cookies and storage technologies:
          </p>

          {/* Essential */}
          <Card className='mb-6 border-green-500/50'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-3 mb-3'>
                <div className='h-8 w-8 rounded bg-green-500/20 flex items-center justify-center shrink-0'>
                  <Shield className='h-4 w-4 text-green-600 dark:text-green-400' />
                </div>
                <div>
                  <h3 className='font-bold text-lg mb-1'>
                    Essential Cookies / LocalStorage
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Required - Cannot be disabled
                  </p>
                </div>
              </div>

              <p className='text-sm text-foreground/80 mb-4'>
                These are necessary for the Service to function properly.
                Without them, you cannot use core features.
              </p>

              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b'>
                      <th className='text-left py-2 px-3 font-semibold'>
                        Name
                      </th>
                      <th className='text-left py-2 px-3 font-semibold'>
                        Purpose
                      </th>
                      <th className='text-left py-2 px-3 font-semibold'>
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-foreground/70'>
                    <tr className='border-b'>
                      <td className='py-2 px-3 font-mono text-xs'>
                        string-art-state
                      </td>
                      <td className='py-2 px-3'>
                        Stores your editor settings (pins, lines, colors, etc.)
                      </td>
                      <td className='py-2 px-3'>Persistent</td>
                    </tr>
                    <tr className='border-b'>
                      <td className='py-2 px-3 font-mono text-xs'>
                        string-art-projects
                      </td>
                      <td className='py-2 px-3'>
                        Saves your string art projects locally
                      </td>
                      <td className='py-2 px-3'>Persistent</td>
                    </tr>
                    <tr>
                      <td className='py-2 px-3 font-mono text-xs'>
                        theme-preference
                      </td>
                      <td className='py-2 px-3'>
                        Remembers your theme choice (light/dark mode)
                      </td>
                      <td className='py-2 px-3'>Persistent</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className='text-xs text-muted-foreground mt-4'>
                ℹ️ <strong>Note:</strong> All data stored in LocalStorage stays
                on your device and is never sent to our servers.
              </p>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className='mb-6 border-blue-500/50'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-3 mb-3'>
                <div className='h-8 w-8 rounded bg-blue-500/20 flex items-center justify-center shrink-0'>
                  <Settings className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <h3 className='font-bold text-lg mb-1'>Analytics Cookies</h3>
                  <p className='text-sm text-muted-foreground'>
                    Optional - Can be disabled
                  </p>
                </div>
              </div>

              <p className='text-sm text-foreground/80 mb-4'>
                Help us understand how visitors interact with the Service by
                collecting anonymous information.
              </p>

              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b'>
                      <th className='text-left py-2 px-3 font-semibold'>
                        Provider
                      </th>
                      <th className='text-left py-2 px-3 font-semibold'>
                        Cookies
                      </th>
                      <th className='text-left py-2 px-3 font-semibold'>
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-foreground/70'>
                    <tr>
                      <td className='py-2 px-3'>Google Analytics</td>
                      <td className='py-2 px-3 font-mono text-xs'>
                        _ga, _gid, _gat
                      </td>
                      <td className='py-2 px-3'>
                        Track page views, sessions, and user behavior
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='mt-4 space-y-2'>
                <p className='text-xs text-foreground/70'>
                  <strong>Data collected:</strong> Pages visited, time on site,
                  device type, browser, location (country/city), referral source
                </p>
                <p className='text-xs text-foreground/70'>
                  <strong>Duration:</strong> Up to 2 years
                </p>
                <a
                  href='https://policies.google.com/privacy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline flex items-center gap-1'>
                  Google Analytics Privacy Policy
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Advertising */}
          <Card className='mb-6 border-orange-500/50'>
            <CardContent className='p-6'>
              <div className='flex items-start gap-3 mb-3'>
                <div className='h-8 w-8 rounded bg-orange-500/20 flex items-center justify-center shrink-0'>
                  <Cookie className='h-4 w-4 text-orange-600 dark:text-orange-400' />
                </div>
                <div>
                  <h3 className='font-bold text-lg mb-1'>
                    Advertising Cookies
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    Requires consent - Can be disabled
                  </p>
                </div>
              </div>

              <p className='text-sm text-foreground/80 mb-4'>
                Used to display relevant advertisements and measure ad
                effectiveness.
              </p>

              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='border-b'>
                      <th className='text-left py-2 px-3 font-semibold'>
                        Provider
                      </th>
                      <th className='text-left py-2 px-3 font-semibold'>
                        Cookies
                      </th>
                      <th className='text-left py-2 px-3 font-semibold'>
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-foreground/70'>
                    <tr>
                      <td className='py-2 px-3'>Google AdSense</td>
                      <td className='py-2 px-3 font-mono text-xs'>
                        _gcl_*, __gads, __gpi
                      </td>
                      <td className='py-2 px-3'>
                        Serve personalized ads based on interests
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='mt-4 space-y-2'>
                <p className='text-xs text-foreground/70'>
                  <strong>Data collected:</strong> Browsing history, ad
                  interactions, interests, demographics
                </p>
                <p className='text-xs text-foreground/70'>
                  <strong>Duration:</strong> Up to 2 years
                </p>
                <a
                  href='https://policies.google.com/technologies/ads'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline flex items-center gap-1'>
                  Google Ads Privacy & Terms
                  <ExternalLink className='h-3 w-3' />
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className='my-8' />

        {/* 3. Third-Party Cookies */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>3. Third-Party Cookies</h2>
          <p className='text-foreground/80 mb-4'>
            Some cookies are set by third-party services that appear on our
            pages. We do not control these cookies. The third parties include:
          </p>

          <div className='space-y-3'>
            <Card className='bg-muted/30'>
              <CardContent className='p-4'>
                <h3 className='font-semibold mb-2'>Google LLC</h3>
                <p className='text-sm text-foreground/70 mb-2'>
                  Services: Google Analytics, Google AdSense
                </p>
                <div className='flex flex-col gap-1'>
                  <a
                    href='https://policies.google.com/privacy'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs text-primary hover:underline flex items-center gap-1'>
                    Privacy Policy
                    <ExternalLink className='h-3 w-3' />
                  </a>
                  <a
                    href='https://adssettings.google.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-xs text-primary hover:underline flex items-center gap-1'>
                    Opt-out of Personalized Ads
                    <ExternalLink className='h-3 w-3' />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className='bg-muted/30'>
              <CardContent className='p-4'>
                <h3 className='font-semibold mb-2'>Vercel Inc.</h3>
                <p className='text-sm text-foreground/70 mb-2'>
                  Service: Website hosting and analytics
                </p>
                <a
                  href='https://vercel.com/legal/privacy-policy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs text-primary hover:underline flex items-center gap-1'>
                  Privacy Policy
                  <ExternalLink className='h-3 w-3' />
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className='my-8' />

        {/* 4. How to Control Cookies */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4 flex items-center gap-2'>
            <Settings className='h-6 w-6 text-primary' />
            4. How to Control Cookies
          </h2>

          <h3 className='text-xl font-semibold mb-3'>4.1 Browser Settings</h3>
          <p className='text-foreground/80 mb-4'>
            Most browsers allow you to control cookies through their settings.
            You can:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80 mb-4'>
            <li>Block all cookies</li>
            <li>Block third-party cookies only</li>
            <li>Delete cookies after each session</li>
            <li>Clear existing cookies</li>
          </ul>

          <p className='text-foreground/80 mb-4'>
            <strong>Browser-specific guides:</strong>
          </p>
          <ul className='list-none space-y-2 text-sm'>
            <li>
              <a
                href='https://support.google.com/chrome/answer/95647'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline flex items-center gap-1'>
                Chrome
                <ExternalLink className='h-3 w-3' />
              </a>
            </li>
            <li>
              <a
                href='https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline flex items-center gap-1'>
                Firefox
                <ExternalLink className='h-3 w-3' />
              </a>
            </li>
            <li>
              <a
                href='https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline flex items-center gap-1'>
                Safari
                <ExternalLink className='h-3 w-3' />
              </a>
            </li>
            <li>
              <a
                href='https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline flex items-center gap-1'>
                Microsoft Edge
                <ExternalLink className='h-3 w-3' />
              </a>
            </li>
          </ul>

          <Card className='mt-6 bg-orange-500/5 border-orange-500/50'>
            <CardContent className='p-4'>
              <p className='text-sm font-semibold mb-2'>⚠️ Important</p>
              <p className='text-sm text-foreground/70'>
                Blocking essential cookies (LocalStorage) will prevent the
                Service from saving your projects and settings. The editor will
                still work, but you'll lose your data when you close the
                browser.
              </p>
            </CardContent>
          </Card>

          <h3 className='text-xl font-semibold mb-3 mt-6'>
            4.2 Opt-Out of Personalized Advertising
          </h3>
          <p className='text-foreground/80 mb-4'>
            To opt-out of personalized ads from Google:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-foreground/80 mb-4'>
            <li>
              Visit{' '}
              <a
                href='https://adssettings.google.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'>
                Google Ads Settings
              </a>
            </li>
            <li>Turn off "Ad Personalization"</li>
            <li>
              Install{' '}
              <a
                href='https://tools.google.com/dlpage/gaoptout'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'>
                Google Analytics Opt-out Browser Add-on
              </a>
            </li>
          </ul>

          <h3 className='text-xl font-semibold mb-3 mt-6'>
            4.3 Do Not Track (DNT)
          </h3>
          <p className='text-foreground/80'>
            Some browsers offer a "Do Not Track" signal. Currently, there is no
            industry standard for how to respond to DNT signals. We do not alter
            our data collection practices in response to DNT signals.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 5. Changes to Cookie Policy */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>
            5. Changes to This Cookie Policy
          </h2>
          <p className='text-foreground/80 mb-4'>
            We may update this Cookie Policy from time to time to reflect
            changes in technology, regulations, or our practices.
          </p>
          <p className='text-foreground/80'>
            We will notify you of significant changes by updating the "Last
            Updated" date at the top of this page. Please review this policy
            periodically.
          </p>
        </section>

        <Separator className='my-8' />

        {/* 6. Contact */}
        <section className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>
            6. Questions About Cookies?
          </h2>
          <p className='text-foreground/80 mb-4'>
            If you have questions about how we use cookies, please contact us:
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
              href='/privacy'
              className='text-sm text-primary hover:underline'>
              Privacy Policy →
            </Link>
            <Link
              href='/terms'
              className='text-sm text-primary hover:underline'>
              Terms of Service →
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
