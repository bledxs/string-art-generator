'use client';

import { useStringArtStore } from '../store/stringArtStore';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export function ParametersPanel() {
  const { parameters, setParameters, resetParameters } = useStringArtStore();

  return (
    <Card className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-lg font-semibold'>Parameters</h3>
        <Button variant='outline' size='sm' onClick={resetParameters}>
          <RotateCcw className='h-4 w-4 mr-2' />
          Reset
        </Button>
      </div>

      <div className='space-y-6'>
        {/* Pins */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='pins'>Pins</Label>
            <span className='text-sm text-muted-foreground'>
              {parameters.pins}
            </span>
          </div>
          <Slider
            id='pins'
            min={50}
            max={500}
            step={10}
            value={[parameters.pins]}
            onValueChange={([value]) => setParameters({ pins: value })}
          />
          <p className='text-xs text-muted-foreground'>
            Number of pins around the circle
          </p>
        </div>

        {/* Lines */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='lines'>Lines</Label>
            <span className='text-sm text-muted-foreground'>
              {parameters.lines}
            </span>
          </div>
          <Slider
            id='lines'
            min={500}
            max={10000}
            step={100}
            value={[parameters.lines]}
            onValueChange={([value]) => setParameters({ lines: value })}
          />
          <p className='text-xs text-muted-foreground'>
            Number of string lines to draw
          </p>
        </div>

        {/* Line Weight */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='lineWeight'>Line Weight</Label>
            <span className='text-sm text-muted-foreground'>
              {parameters.lineWeight}
            </span>
          </div>
          <Slider
            id='lineWeight'
            min={0.1}
            max={2}
            step={0.1}
            value={[parameters.lineWeight]}
            onValueChange={([value]) => setParameters({ lineWeight: value })}
          />
          <p className='text-xs text-muted-foreground'>
            Thickness of each line
          </p>
        </div>

        {/* Line Opacity */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='lineOpacity'>Line Opacity</Label>
            <span className='text-sm text-muted-foreground'>
              {parameters.lineOpacity}
            </span>
          </div>
          <Slider
            id='lineOpacity'
            min={0.05}
            max={1}
            step={0.05}
            value={[parameters.lineOpacity]}
            onValueChange={([value]) => setParameters({ lineOpacity: value })}
          />
          <p className='text-xs text-muted-foreground'>
            Transparency of each line
          </p>
        </div>

        {/* Background Color */}
        <div className='space-y-2'>
          <Label htmlFor='backgroundColor'>Background Color</Label>
          <div className='flex gap-2'>
            <Input
              id='backgroundColor'
              type='color'
              value={parameters.backgroundColor}
              onChange={(e) =>
                setParameters({ backgroundColor: e.target.value })
              }
              className='w-20 h-10 cursor-pointer'
            />
            <Input
              type='text'
              value={parameters.backgroundColor}
              onChange={(e) =>
                setParameters({ backgroundColor: e.target.value })
              }
              className='flex-1'
              placeholder='#ffffff'
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
