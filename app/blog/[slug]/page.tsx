import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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
      <nav className="sticky top-0 z-50 bg-[#111113]/85 backdrop-blur-md border-b border-[#2a2a2e] px-6 sm:px-10 py-3.5 flex justify-between items-center">
        <Link href="/" className="transition-transform hover:scale-105">
          <Image 
            src="/logo-navbar.svg" 
            alt="NK Logo" 
            width={48} 
            height={32}
            priority
          />
        </Link>
        <Link
          href="/#writing"
          className="text-xs sm:text-sm text-[#d1d5db] hover:text-[#4ade80] transition-colors flex items-center gap-2 font-medium"
        >
          <span className="text-xs">←</span>
          back to writing
        </Link>
      </nav>

      <main className="max-w-[720px] mx-auto px-5 sm:px-8 py-10 sm:py-16">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-5 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] sm:text-[10px] px-2 py-[3px] rounded-md text-[#4ade80] border border-[#4ade80]/30 bg-[#4ade80]/10 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f9fafb] leading-tight mb-5 tracking-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="font-mono text-[10px] sm:text-xs text-[#71717a] flex items-center gap-3 mb-10 pb-8 border-b border-[#27272a]/50">
          <span>{formattedDate}</span>
          <span className="text-[#27272a]">·</span>
          <span>{post.read_time} min read</span>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="mb-10 rounded-xl overflow-hidden border border-[#27272a]/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed mb-10 italic border-l-2 border-[#4ade80]/40 pl-5">
          {post.excerpt}
        </p>

        {/* Body */}
        <div className="flex flex-col gap-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm sm:text-base text-[#d1d5db] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#27272a]/50 flex items-center justify-between">
          <Link
            href="/#writing"
            className="text-xs sm:text-sm text-[#9ca3af] hover:text-[#4ade80] transition-colors flex items-center gap-2 font-medium"
          >
            <span className="text-xs">←</span>
            all posts
          </Link>
        </div>
      </main>
    </div>
  );
}
