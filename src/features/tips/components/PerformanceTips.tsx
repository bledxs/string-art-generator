// Server Component - Performance Tips Section
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Chrome, Globe, Apple } from 'lucide-react';

const optimizations = [
  {
    tip: 'Start with Lower Settings',
    impact: 'High',
    description: 'Test with 100 pins before committing to 300+',
  },
  {
    tip: 'Close Unused Browser Tabs',
    impact: 'Medium',
    description: 'Free up RAM for faster generation',
  },
  {
    tip: 'Use Desktop Over Mobile',
    impact: 'High',
    description: 'Desktop browsers have more processing power',
  },
  {
    tip: 'Reduce Image Size Before Upload',
    impact: 'Medium',
    description: 'Resize to 1500px max before processing',
  },
  {
    tip: 'Enable Hardware Acceleration',
    impact: 'High',
    description: 'Check browser settings for GPU acceleration',
  },
  {
    tip: 'Use Incognito/Private Mode',
    impact: 'Low',
    description: 'Avoids extension interference',
  },
];

const browserCompatibility = [
  {
    browser: 'Chrome/Edge',
    icon: Chrome,
    performance: 'Excellent',
    notes: 'Fastest with Web Workers',
  },
  {
    browser: 'Firefox',
    icon: Globe,
    performance: 'Very Good',
    notes: 'Stable, slightly slower',
  },
  {
    browser: 'Safari',
    icon: Apple,
    performance: 'Good',
    notes: 'M1/M2 Macs perform well',
  },
];

export function PerformanceTips() {
  return (
    <section id='performance' className='scroll-mt-20'>
      <h2 className='text-3xl font-bold mb-6'>Performance Optimization</h2>

      {/* Optimization Tips */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Zap className='h-5 w-5 text-yellow-500' />
            Speed Up Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 gap-4'>
            {optimizations.map((item, idx) => (
              <div
                key={idx}
                className='flex items-start gap-3 p-3 rounded-lg border'>
                <Badge
                  variant={
                    item.impact === 'High'
                      ? 'default'
                      : item.impact === 'Medium'
                      ? 'secondary'
                      : 'outline'
                  }
                  className='mt-1'>
                  {item.impact}
                </Badge>
                <div className='flex-1'>
                  <div className='font-semibold text-sm mb-1'>{item.tip}</div>
                  <div className='text-xs text-muted-foreground'>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Browser Compatibility */}
      <Card>
        <CardHeader>
          <CardTitle>Browser Compatibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {browserCompatibility.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className='flex items-center gap-4 p-3 rounded-lg border'>
                  <Icon className='h-8 w-8 text-muted-foreground' />
                  <div className='flex-1'>
                    <div className='font-semibold'>{item.browser}</div>
                    <div className='text-sm text-muted-foreground'>
                      {item.notes}
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.performance === 'Excellent'
                        ? 'default'
                        : item.performance === 'Very Good'
                        ? 'secondary'
                        : 'outline'
                    }>
                    {item.performance}
                  </Badge>
                </div>
              );
            })}
          </div>
          <p className='text-sm text-muted-foreground mt-4'>
            <strong>Note:</strong> All modern browsers work, but Chrome/Edge
            with hardware acceleration enabled provide the best experience for
            complex designs (300+ pins, 10000+ lines).
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
