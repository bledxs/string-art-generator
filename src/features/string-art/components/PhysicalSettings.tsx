'use client';

import { Ruler } from 'lucide-react';
import { useStringArtStore } from '../store/stringArtStore';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { PhysicalUnit } from '../types';

export function PhysicalSettings() {
  const { physicalConfig, setPhysicalConfig } = useStringArtStore();

  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setPhysicalConfig({ diameter: value });
    }
  };

  const handleUnitChange = (value: PhysicalUnit) => {
    setPhysicalConfig({ unit: value });
  };

  const handlePinHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setPhysicalConfig({ pinHeight: value });
    }
  };

  return (
    <Card className='p-4'>
      <div className='flex items-center gap-2 mb-3'>
        <Ruler className='h-5 w-5' />
        <h3 className='font-semibold'>Physical Dimensions</h3>
      </div>

      <div className='space-y-4'>
        {/* Unit selector */}
        <div className='space-y-2'>
          <Label htmlFor='unit'>Measurement Unit</Label>
          <Select value={physicalConfig.unit} onValueChange={handleUnitChange}>
            <SelectTrigger id='unit'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='cm'>Centimeters (cm)</SelectItem>
              <SelectItem value='inches'>Inches (in)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Diameter input */}
        <div className='space-y-2'>
          <Label htmlFor='diameter'>
            Circle Diameter ({physicalConfig.unit})
          </Label>
          <Input
            id='diameter'
            type='number'
            min='10'
            max='500'
            step='1'
            value={physicalConfig.diameter}
            onChange={handleDiameterChange}
            placeholder='50'
          />
          <p className='text-xs text-muted-foreground'>
            Recommended: 50-100 {physicalConfig.unit}
          </p>
        </div>

        {/* Pin height input */}
        <div className='space-y-2'>
          <Label htmlFor='pinHeight'>Pin Height ({physicalConfig.unit})</Label>
          <Input
            id='pinHeight'
            type='number'
            min='0.5'
            max='10'
            step='0.1'
            value={physicalConfig.pinHeight}
            onChange={handlePinHeightChange}
            placeholder='1'
          />
          <p className='text-xs text-muted-foreground'>
            How far pins stick out from the board
          </p>
        </div>
      </div>
    </Card>
  );
}
