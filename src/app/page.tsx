import { StringArtStudioClient } from '@/features/string-art/components/StringArtStudioClient';
import { SeoContent } from '@/shared/components/SeoContent';

export default function HomePage() {
	return (
		<main className='relative min-h-screen'>
			<StringArtStudioClient />
			<SeoContent />
		</main>
	);
}
