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
  {
    slug: 'string-art-vs-generative-art',
    title: 'String Art vs Other Generative Art: What Makes It Unique',
    description:
      'Compare string art with plotter art, pixel art, and vector tracing. Discover what makes radial thread patterns special and when to choose each technique.',
    date: '2025-11-21',
    author: 'String Art Generator Team',
    category: 'Tutorials',
    tags: ['comparison', 'generative art', 'techniques'],
    image: '/blog/comparison.webp',
  },
  {
    slug: 'mathematics-behind-string-art',
    title: 'The Mathematics Behind String Art Generation',
    description:
      'Explore the algorithms, geometry, and optimization techniques that transform images into thread patterns. From greedy algorithms to envelope theory.',
    date: '2025-11-21',
    author: 'String Art Generator Team',
    category: 'Mathematics',
    tags: ['algorithms', 'mathematics', 'geometry', 'optimization'],
    image: '/blog/mathematics.webp',
  },
  {
    slug: 'famous-string-artists',
    title: 'Famous String Artists You Should Know',
    description:
      "Discover the visionaries pushing string art boundaries - from Kumi Yamashita's shadow sculptures to Gabriel Dawe's chromatic architecture.",
    date: '2025-11-21',
    author: 'String Art Generator Team',
    category: 'Artist Profiles',
    tags: ['artists', 'inspiration', 'contemporary art', 'profiles'],
    image: '/blog/artists.webp',
  },
  {
    slug: 'beginner-guide-first-project',
    title: "Beginner's Guide: Your First String Art Project",
    description:
      'Step-by-step guide to building your first string art piece. Materials, timeline, common mistakes, and realistic expectations for beginners.',
    date: '2025-11-21',
    author: 'String Art Generator Team',
    category: 'Tutorials',
    tags: ['beginner', 'guide', 'tutorial', 'first project'],
    image: '/blog/beginner-guide.webp',
  },
  {
    slug: 'choose-perfect-image',
    title: 'How to Choose the Perfect Image for String Art',
    description:
      'Learn what makes images work well for string art. Contrast, composition, subject matter, and preprocessing techniques for optimal results.',
    date: '2025-11-21',
    author: 'String Art Generator Team',
    category: 'Tutorials',
    tags: ['image selection', 'tips', 'preprocessing', 'contrast'],
    image: '/blog/image-selection.webp',
  },
];

export const blogCategories = [
  'History & Culture',
  'Inspiration',
  'Tutorials',
  'Mathematics',
  'Artist Profiles',
] as const;
