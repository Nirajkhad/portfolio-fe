import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { fetchPostBySlug } from '@/lib/api';
import { ReactionsBar } from '@/components/reactions-bar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

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
    <div className="min-h-screen bg-[#0a0a0f]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#1e1e2a] px-6 sm:px-10 py-3.5 flex justify-between items-center">
        <Link href="/" className="transition-transform hover:scale-105 active:scale-95">
          <Image
            src="/logo-navbar.svg"
            alt="NK Logo"
            width={48}
            height={32}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
        <Link
          href="/#writing"
          className="text-xs sm:text-sm text-[#a1a1aa] hover:text-[#4ade80] transition-colors flex items-center gap-2 font-medium"
        >
          <span className="text-xs">&#8592;</span>
          back to writing
        </Link>
      </nav>

      <main className="max-w-[720px] mx-auto px-5 sm:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-5 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] sm:text-[10px] px-2 py-[3px] rounded-md text-[#4ade80] border border-[#4ade80]/20 bg-[#4ade80]/8 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e4e4e7] leading-tight mb-5 tracking-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="font-mono text-[10px] sm:text-xs text-[#52525b] flex items-center gap-3 mb-10 pb-8 border-b border-[#1e1e2a]">
          <span>{formattedDate}</span>
          <span className="opacity-40">&middot;</span>
          <span>{post.read_time} min read</span>
        </div>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="mb-10 rounded-xl overflow-hidden border border-[#1e1e2a]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        <div className="mb-10 relative">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#4ade80]/60 to-transparent rounded-full" />
          <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed italic pl-5 ml-0">
            {post.excerpt}
          </p>
        </div>

        {/* Body */}
        <article className="prose prose-invert prose-zinc max-w-none
          prose-headings:text-[#e4e4e7] prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
          prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-[#a1a1aa] prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed
          prose-a:text-[#4ade80] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#e4e4e7] prose-strong:font-semibold
          prose-code:text-[#4ade80] prose-code:bg-white/[0.04] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
          prose-pre:bg-[#10101a]/50 prose-pre:border prose-pre:border-[#1e1e2a] prose-pre:rounded-lg
          prose-ul:text-[#a1a1aa] prose-ul:text-sm sm:prose-ul:text-base
          prose-ol:text-[#a1a1aa] prose-ol:text-sm sm:prose-ol:text-base
          prose-li:marker:text-[#4ade80]
          prose-blockquote:border-l-[#4ade80] prose-blockquote:text-[#52525b] prose-blockquote:italic
          prose-img:rounded-lg prose-img:border prose-img:border-[#1e1e2a]
          prose-hr:border-[#1e1e2a]
          prose-table:text-sm
          prose-th:text-[#e4e4e7]
          prose-td:text-[#a1a1aa]
        ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {post.body}
          </ReactMarkdown>
        </article>

        {/* Reactions */}
        <div className="mt-12 pt-6 border-t border-[#1e1e2a]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs text-[#52525b] font-mono uppercase tracking-wider">
              Reactions
            </span>
            <ReactionsBar slug={post.slug} initialReactions={post.reactions} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/#writing"
            className="text-xs sm:text-sm text-[#a1a1aa] hover:text-[#4ade80] transition-colors flex items-center gap-2 font-medium"
          >
            <span className="text-xs">&#8592;</span>
            all posts
          </Link>
        </div>
      </main>
    </div>
  );
}
