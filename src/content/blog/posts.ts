// Blog post metadata and content structure
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'history-of-string-art',
    title: 'The History of String Art: From Mathematics to Modern Design',
    description:
      'Explore the fascinating journey of string art from its mathematical origins with Mary Everest Boole to contemporary artistic expressions.',
    date: '2025-11-21',
    author: 'String Art Generator Team',
    category: 'History & Culture',
    tags: ['history', 'mathematics', 'art'],
    image: '/blog/history-string-art.webp',
  },
  {
    slug: 'creative-ways-use-string-art',
    title: '10 Creative Ways to Use String Art in Your Home',
    description:
      'Discover inspiring ideas for incorporating string art into your home décor, from wall art to personalized gifts.',
    date: '2025-11-21',
    author: 'String Art Generator Team',
    category: 'Inspiration',
    tags: ['home decor', 'ideas', 'inspiration'],
    image: '/blog/creative-ways.webp',
  },
];

export const blogCategories = [
  'History & Culture',
  'Inspiration',
  'Tutorials',
  'Mathematics',
  'Artist Profiles',
] as const;
