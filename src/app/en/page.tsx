import { StringArtStudioClient } from '@/features/string-art/components/StringArtStudioClient';
import { SeoContent } from '@/shared/components/SeoContent';
import { LocaleSync } from '@/shared/i18n';

export default function EnglishHomePage() {
	return (
		<main className='relative min-h-screen'>
			<LocaleSync locale='en' />
			<StringArtStudioClient />
			<SeoContent locale='en' />
		</main>
	);
}
