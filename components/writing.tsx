'use client';

import { useEffect, useState } from 'react';
import { fetchPublishedPosts, type Post } from '@/lib/api';
import { SectionHeader } from './section-header';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { EmptySection } from './empty-section';
import { ReactionsBar } from './reactions-bar';

export function Writing() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchPublishedPosts();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  let content;
  if (loading) {
    content = (
      <div className="animate-pulse flex flex-col gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-[#18181b] border border-[#27272a] rounded-xl" />
        ))}
      </div>
    );
  } else if (error) {
    content = <div className="text-red-500 text-sm">Error: {error}</div>;
  } else if (!posts || posts.length === 0) {
    content = <EmptySection message="No writing to show yet." />;
  } else {
    content = (
      <div
        className="flex flex-col gap-3 sm:gap-4"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.96)',
          transition: 'opacity 1600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'opacity, transform'
        }}
      >
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
            className="border border-[#27272a]/50 rounded-xl px-5 sm:px-6 py-4 sm:py-5 flex justify-between items-start gap-4 cursor-pointer hover:border-[#4ade80]/40 transition-colors text-left"
          >
            <div className="flex-1">
              {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] sm:text-xs text-[#4ade80] bg-[#18181b] px-2.5 py-1 rounded-md border border-[#27272a]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {/* Title */}
              <div className="text-base sm:text-lg font-semibold text-[#f9fafb] mb-1">
                {post.title}
              </div>
              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-3">
                {post.excerpt}
              </p>
              {/* Meta + Reactions */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#71717a] flex gap-3">
                  {post.published_at && (
                    <span>
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                  <span>{post.read_time} min read</span>
                </div>
                <ReactionsBar slug={post.slug} initialReactions={post.reactions} compact />
              </div>
            </div>
            {/* Arrow */}
            <span className="text-base text-[#9ca3af] mt-1 flex-shrink-0">→</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <section id="writing" className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20 flex flex-col justify-center py-16" ref={ref}>
      <SectionHeader title="writing" />
      {content}
    </section>
  );
}
