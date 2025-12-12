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
  {
    slug: 'advanced-techniques-professional-string-art',
    title: 'Advanced Techniques for Professional-Quality String Art',
    description:
      'Master advanced string art techniques including multi-color layering, gradient effects, complex patterns, and professional finishing methods for gallery-worthy results.',
    date: '2024-12-12',
    author: 'String Art Generator Team',
    category: 'Tutorials',
    tags: [
      'advanced',
      'techniques',
      'professional',
      'multi-color',
      'gradients',
    ],
    image: '/blog/advanced-techniques.webp',
  },
  {
    slug: 'troubleshooting-common-problems',
    title: 'Troubleshooting Common String Art Problems: Expert Solutions',
    description:
      'Complete guide to diagnosing and fixing common string art problems including pattern issues, structural problems, color challenges, and material failures.',
    date: '2024-12-12',
    author: 'String Art Generator Team',
    category: 'Tutorials',
    tags: ['troubleshooting', 'problems', 'solutions', 'fixes', 'tips'],
    image: '/blog/troubleshooting.webp',
  },
  {
    slug: 'commercial-string-art-business-guide',
    title: 'Starting a String Art Business: Complete Commercial Guide',
    description:
      'Comprehensive guide to starting and running a profitable string art business including pricing, marketing, production, legal considerations, and scaling strategies.',
    date: '2024-12-12',
    author: 'String Art Generator Team',
    category: 'Business',
    tags: ['business', 'commercial', 'selling', 'pricing', 'marketing'],
    image: '/blog/business-guide.webp',
  },
  {
    slug: 'string-art-gift-ideas-every-occasion',
    title: '30+ String Art Gift Ideas for Every Occasion: Complete Guide',
    description:
      'The ultimate gift guide for string art. Discover personalized gift ideas for weddings, birthdays, holidays, graduations, and special occasions with detailed project suggestions.',
    date: '2024-12-12',
    author: 'String Art Generator Team',
    category: 'Inspiration',
    tags: ['gifts', 'ideas', 'occasions', 'personalized', 'celebrations'],
    image: '/blog/gift-ideas.webp',
  },
];

export const blogCategories = [
  'History & Culture',
  'Inspiration',
  'Tutorials',
  'Mathematics',
  'Artist Profiles',
  'Business',
] as const;
