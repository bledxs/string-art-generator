// Lead paragraph component for MDX blog posts
// Uses div to avoid MDX auto-wrapping text in <p>, which would cause <p> nesting
export function Lead({ children }: { children: React.ReactNode }) {
  return <div className='lead'>{children}</div>;
}
