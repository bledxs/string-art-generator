// Server-safe reading time helper without react-dom/server.
// Accepts either a precomputed word count or a text snippet.
export function readingTime({
  words,
  text,
  wpm = 200,
  fallback = '5 min read',
}: {
  words?: number;
  text?: string;
  wpm?: number;
  fallback?: string;
}): string {
  try {
    const totalWords =
      typeof words === 'number'
        ? words
        : typeof text === 'string'
        ? text.trim().split(/\s+/).filter(Boolean).length
        : 0;
    if (!totalWords) return fallback;
    const minutes = Math.max(1, Math.round(totalWords / wpm));
    return `${minutes} min read`;
  } catch {
    return fallback;
  }
}

// Convenience: derive from meta object (e.g. exported in MDX) with optional wordCount or readingTime string.
import fs from 'fs';
import path from 'path';

function mdxFilePath(slug: string) {
  return path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.mdx`);
}

function extractWordCountFromSource(source: string): number {
  // Remove code fences & jsx imports
  const cleaned = source
    .replace(/```[\s\S]*?```/g, ' ') // code blocks
    .replace(/import[^\n]+\n/g, ' ') // imports
    .replace(/export const meta[^{]*{[\s\S]*?};/g, ' ') // meta block
    .replace(/<[^>]+>/g, ' ') // tags
    .replace(/&[a-z]+;/gi, ' '); // entities
  return cleaned.trim().split(/\s+/).filter(Boolean).length;
}

export function deriveReadingTime(
  meta: { wordCount?: number; readingTime?: string },
  fallback = '5 min read',
  slug?: string,
) {
  if (meta.readingTime) return meta.readingTime;
  if (meta.wordCount) return readingTime({ words: meta.wordCount, fallback });
  if (slug) {
    try {
      const file = fs.readFileSync(mdxFilePath(slug), 'utf-8');
      const count = extractWordCountFromSource(file);
      return readingTime({ words: count, fallback });
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export function getWordCount(slug: string): number | null {
  try {
    const file = fs.readFileSync(mdxFilePath(slug), 'utf-8');
    return extractWordCountFromSource(file);
  } catch {
    return null;
  }
}
