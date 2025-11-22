'use client';

// Client Component - Use Cases Tabs with URL State
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArtistsProfessionals,
  Educators,
  MakersDIY,
  Business,
  Events,
} from '@/features/use-cases/components';

interface UseCasesClientProps {
  defaultTab: string;
}

export function UseCasesClient({ defaultTab }: UseCasesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={defaultTab} onValueChange={handleTabChange} className='w-full'>
      <TabsList className='grid w-full grid-cols-2 md:grid-cols-5 mb-8'>
        <TabsTrigger value='artists'>Artists</TabsTrigger>
        <TabsTrigger value='educators'>Educators</TabsTrigger>
        <TabsTrigger value='makers'>Makers/DIY</TabsTrigger>
        <TabsTrigger value='business'>Business</TabsTrigger>
        <TabsTrigger value='events'>Events</TabsTrigger>
      </TabsList>

      <TabsContent value='artists'>
        <ArtistsProfessionals />
      </TabsContent>

      <TabsContent value='educators'>
        <Educators />
      </TabsContent>

      <TabsContent value='makers'>
        <MakersDIY />
      </TabsContent>

      <TabsContent value='business'>
        <Business />
      </TabsContent>

      <TabsContent value='events'>
        <Events />
      </TabsContent>
    </Tabs>
  );
}
