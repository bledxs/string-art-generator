// Server Component - Parameter Optimization Section
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

const configurations = [
  {
    use: 'Quick Preview',
    pins: '50-100',
    lines: '1000-2000',
    quality: 'Low',
    time: '< 1 min',
    bestFor: 'Testing compositions',
  },
  {
    use: 'Balanced Quality',
    pins: '150-200',
    lines: '3000-5000',
    quality: 'Medium',
    time: '2-5 min',
    bestFor: 'Most projects',
  },
  {
    use: 'High Detail',
    pins: '250-300',
    lines: '6000-10000',
    quality: 'High',
    time: '5-15 min',
    bestFor: 'Complex portraits',
  },
  {
    use: 'Maximum Quality',
    pins: '400+',
    lines: '15000+',
    quality: 'Ultra',
    time: '15+ min',
    bestFor: 'Exhibition pieces',
  },
];

const quickTips = [
  {
    parameter: 'Pins',
    tip: 'Start with 200 for portraits, 150 for logos',
  },
  {
    parameter: 'Lines',
    tip: 'Use 20-30x the number of pins as a baseline',
  },
  {
    parameter: 'Line Darkness',
    tip: '0.3-0.5 works for most images',
  },
  {
    parameter: 'Min Distance',
    tip: '20-30 prevents tangling in physical builds',
  },
  {
    parameter: 'Opacity',
    tip: '0.1-0.15 creates natural shading',
  },
];

export function ParameterOptimization() {
  return (
    <section id='parameters' className='scroll-mt-20'>
      <h2 className='text-3xl font-bold mb-6'>Parameter Optimization</h2>

      {/* Configurations Table */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Recommended Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b'>
                  <th className='text-left py-3 px-4'>Use Case</th>
                  <th className='text-left py-3 px-4'>Pins</th>
                  <th className='text-left py-3 px-4'>Lines</th>
                  <th className='text-left py-3 px-4'>Quality</th>
                  <th className='text-left py-3 px-4'>Time</th>
                  <th className='text-left py-3 px-4'>Best For</th>
                </tr>
              </thead>
              <tbody>
                {configurations.map((config, idx) => (
                  <tr key={idx} className='border-b last:border-0'>
                    <td className='py-3 px-4 font-medium'>{config.use}</td>
                    <td className='py-3 px-4'>{config.pins}</td>
                    <td className='py-3 px-4'>{config.lines}</td>
                    <td className='py-3 px-4'>
                      <Badge variant='outline'>{config.quality}</Badge>
                    </td>
                    <td className='py-3 px-4 text-sm text-muted-foreground'>
                      {config.time}
                    </td>
                    <td className='py-3 px-4 text-sm'>{config.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card className='bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2 text-amber-700 dark:text-amber-400'>
            <Lightbulb className='h-5 w-5' />
            Quick Reference Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid md:grid-cols-2 gap-4'>
            {quickTips.map((item, idx) => (
              <div key={idx} className='flex items-start gap-3'>
                <div className='font-semibold text-sm min-w-[120px]'>
                  {item.parameter}:
                </div>
                <div className='text-sm text-muted-foreground'>{item.tip}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
