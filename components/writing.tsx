'use client';

import { useEffect, useState } from 'react';
import { fetchPublishedPosts, type Post } from '@/lib/api';
import { SectionHeader } from './section-header';

export function Writing() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <section id="writing" className="px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20">
        <SectionHeader title="writing" />
        <div className="animate-pulse flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-[#18181b] border border-[#27272a] rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="writing" className="px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20">
        <SectionHeader title="writing" />
        <div className="text-red-500 text-sm">Error: {error}</div>
      </section>
    );
  }

  return (
    <section id="writing" className="px-4 sm:px-6 md:px-8 lg:px-10 scroll-mt-20">
      <SectionHeader title="writing" />

      <div className="flex flex-col gap-3 sm:gap-4">
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
            className="border border-[#27272a]/50 rounded-xl px-5 sm:px-6 py-4 sm:py-5 flex justify-between items-start gap-4 cursor-pointer hover:border-[#4ade80]/40 transition-colors text-left"
          >
            <div className="flex-1">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 mb-2 flex-wrap">
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
              <h3 className="text-sm sm:text-base font-semibold text-[#f9fafb] mb-2 leading-[1.3]">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-3">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="font-mono text-[9px] sm:text-[10px] text-[#71717a] flex gap-3 flex-wrap">
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
            </div>

            {/* Arrow */}
            <span className="text-base text-[#9ca3af] mt-1 flex-shrink-0">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
