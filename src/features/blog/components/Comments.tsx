'use client';

import Script from 'next/script';

interface CommentsProps {
  slug: string;
}

export function Comments({ slug }: CommentsProps) {
  return (
    <>
      <div className='giscus' />
      <Script
        src='https://giscus.app/client.js'
        data-repo='bledxs/string-art-generator'
        data-repo-id='R_kgDOOyUOhg'
        data-category='Blog Comments'
        data-category-id='DIC_kwDOOyUOhs4CyESJ'
        data-mapping='pathname'
        data-strict='0'
        data-reactions-enabled='1'
        data-emit-metadata='0'
        data-input-position='bottom'
        data-theme='preferred_color_scheme'
        data-lang='en'
        crossOrigin='anonymous'
        async
      />
    </>
  );
}
