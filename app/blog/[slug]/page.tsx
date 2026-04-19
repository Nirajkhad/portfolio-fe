import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchPostBySlug } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await fetchPostBySlug(slug);
    return {
      title: `${post.title} | Niraj`,
      description: post.excerpt,
    };
  } catch {
    return { title: 'Post Not Found | Niraj' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await fetchPostBySlug(slug);
  } catch {
    notFound();
  }

  const paragraphs = post.body.split('\n\n').filter(Boolean);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date(post.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0f0f11] border-b border-[#1f1f23]/50 px-10 py-3.5 flex justify-between items-center">
        <Link href="/" className="font-mono text-[13px] text-[#4ade80] tracking-tight hover:opacity-80 transition-opacity">
          niraj<span className="text-[#22d3ee]">.</span>com<span className="text-[#22d3ee]">.</span>np
        </Link>
        <Link
          href="/#writing"
          className="font-mono text-[11px] text-[#3f3f46] hover:text-[#4ade80] transition-colors flex items-center gap-1.5"
        >
          <span className="text-[10px]">←</span>
          back to writing
        </Link>
      </nav>

      <main className="max-w-[680px] mx-auto px-6 py-12">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-[5px] mb-4 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] px-[7px] py-[2px] rounded text-[#4ade80] border border-[#4ade80]/20 bg-[#4ade80]/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-[22px] font-bold text-[#fafafa] leading-[1.35] mb-4 tracking-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="font-mono text-[10px] text-[#3f3f46] flex items-center gap-3 mb-8 pb-6 border-b border-[#1a1a1e]">
          <span>{formattedDate}</span>
          <span className="text-[#27272a]">·</span>
          <span>{post.read_time} min read</span>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="mb-8 rounded-[10px] overflow-hidden border border-[#1a1a1e]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        <p className="text-[13px] text-[#71717a] leading-[1.75] mb-8 italic border-l-2 border-[#4ade80]/30 pl-4">
          {post.excerpt}
        </p>

        {/* Body */}
        <div className="flex flex-col gap-5">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[13px] text-[#a1a1aa] leading-[1.8]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-[#1a1a1e] flex items-center justify-between">
          <Link
            href="/#writing"
            className="font-mono text-[11px] text-[#3f3f46] hover:text-[#4ade80] transition-colors flex items-center gap-1.5"
          >
            <span className="text-[10px]">←</span>
            all posts
          </Link>
          <span className="font-mono text-[10px] text-[#27272a]">
            niraj<span className="text-[#22d3ee]/50">.</span>com<span className="text-[#22d3ee]/50">.</span>np
          </span>
        </div>
      </main>
    </div>
  );
}
