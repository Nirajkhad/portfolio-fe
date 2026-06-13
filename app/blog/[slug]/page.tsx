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
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#1e1e2a] px-4 sm:px-8 lg:px-16 py-3.5 flex justify-between items-center">
        <Link href="/" className="transition-transform hover:scale-105 active:scale-95 shrink-0">
          <Image
            src="/logo-navbar.svg"
            alt="NK Logo"
            width={38}
            height={26}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
        <Link
          href="/#writing"
          className="group text-xs sm:text-sm text-[#71717a] hover:text-[#4ade80] transition-all duration-200 flex items-center gap-1.5 font-mono active:scale-95"
        >
          <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>back</span>
        </Link>
      </nav>

      <main className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-0 pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="px-0 sm:px-2">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] sm:text-[10px] px-2 py-[3px] rounded-md text-[#4ade80] border border-[#4ade80]/20 bg-[#4ade80]/6 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e4e4e7] leading-tight mb-4 tracking-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="font-mono text-[11px] sm:text-xs text-[#52525b] flex items-center gap-3 mb-8 pb-6 border-b border-[#1e1e2a]">
            <span>{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-[#1e1e2a]" />
            <span>{post.read_time} min read</span>
          </div>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="mb-8 rounded-xl overflow-hidden border border-[#1e1e2a] bg-[#10101a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          <div className="mb-10 relative">
            <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-gradient-to-b from-[#4ade80]/70 via-[#4ade80]/30 to-transparent rounded-full" />
            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed italic pl-5">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Body */}
        <article className="prose prose-invert prose-zinc max-w-none px-0 sm:px-2 break-words
          prose-headings:text-[#e4e4e7] prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
          prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-[#a1a1aa] prose-p:text-sm sm:prose-p:text-base prose-p:leading-[1.75]
          prose-a:text-[#4ade80] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#e4e4e7] prose-strong:font-semibold
          prose-code:text-[#4ade80] prose-code:bg-white/[0.04] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
          prose-pre:bg-[#10101a]/50 prose-pre:border prose-pre:border-[#1e1e2a] prose-pre:rounded-lg prose-pre:text-sm prose-pre:overflow-x-auto
          prose-ul:text-[#a1a1aa] prose-ul:text-sm sm:prose-ul:text-base prose-ul:leading-[1.75]
          prose-ol:text-[#a1a1aa] prose-ol:text-sm sm:prose-ol:text-base prose-ol:leading-[1.75]
          prose-li:marker:text-[#4ade80]
          prose-blockquote:border-l-[#4ade80] prose-blockquote:text-[#71717a] prose-blockquote:italic prose-blockquote:pl-5
          prose-img:rounded-lg prose-img:border prose-img:border-[#1e1e2a]
          prose-hr:border-[#1e1e2a]
          prose-table:text-sm
          prose-th:text-[#e4e4e7] prose-th:bg-white/[0.02]
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
        <div className="mt-12 pt-6 border-t border-[#1e1e2a] px-0 sm:px-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 justify-between">
            <span className="text-[10px] sm:text-xs text-[#52525b] font-mono uppercase tracking-wider">
              Reactions
            </span>
            <ReactionsBar slug={post.slug} initialReactions={post.reactions} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between px-0 sm:px-2">
          <Link
            href="/#writing"
            className="group text-xs sm:text-sm text-[#71717a] hover:text-[#4ade80] transition-all duration-200 flex items-center gap-1.5 font-mono active:scale-95"
          >
            <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>all posts</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
