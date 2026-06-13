import type { MetadataRoute } from 'next';

const siteUrl = 'https://nirajkhadka.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, priority: 1.0, changeFrequency: 'monthly' },
  ];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/published`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const posts: { slug: string; updated_at?: string }[] = await res.json();
      const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        priority: 0.6,
        changeFrequency: 'weekly' as const,
        lastModified: post.updated_at ? new Date(post.updated_at) : undefined,
      }));
      return [...staticPages, ...blogPages];
    }
  } catch {}

  return staticPages;
}
