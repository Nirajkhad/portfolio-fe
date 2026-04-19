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
      <section id="writing" className="px-10">
        <SectionHeader title="writing" />
        <div className="animate-pulse flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-[#18181b] rounded" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="writing" className="px-10">
        <SectionHeader title="writing" />
        <div className="text-red-500 text-sm">Error: {error}</div>
      </section>
    );
  }

  return (
    <section id="writing" className="px-10">
      <SectionHeader title="writing" />

      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <article
            key={post.id}
            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
            className="border border-[#1a1a1e] rounded-[10px] px-[18px] py-4 flex justify-between items-start gap-3 cursor-pointer hover:border-[#27272a] transition-colors"
          >
            <div className="flex-1">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-[5px] mb-[7px] flex-wrap">
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
              <h3 className="text-[13px] font-semibold text-[#d4d4d8] mb-[5px] leading-[1.4]">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[11px] text-[#3f3f46] leading-[1.6] mb-2">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="font-mono text-[10px] text-[#27272a] flex gap-3">
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
            <span className="text-[13px] text-[#27272a] mt-[2px]">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
