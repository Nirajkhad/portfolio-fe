'use client';

import { useEffect, useState } from 'react';
import { fetchPublishedPosts, type Post } from '@/lib/api';
import { SectionHeader } from './section-header';
import { EmptySection } from './empty-section';
import { ReactionsBar } from './reactions-bar';

export function Writing() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try { setLoading(true); setPosts(await fetchPublishedPosts()); }
      catch (err) { setError(err instanceof Error ? err.message : 'Failed'); }
      finally { setLoading(false); }
    };
    loadData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    const el = document.getElementById('writing');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let content;
  if (loading) {
    content = (
      <div className="animate-pulse flex flex-col gap-3 sm:gap-4">
        {[1, 2, 3].map((i) => <div key={i} className="h-28 bg-[#10101a] border border-[#1e1e2a] rounded-lg" />)}
      </div>
    );
  } else if (error) {
    content = <div className="text-[#ef4444] text-sm font-mono">{error}</div>;
  } else if (!posts || posts.length === 0) {
    content = <EmptySection message="No writing to show yet." />;
  } else {
    content = (
      <div className="flex flex-col gap-3 sm:gap-4">
        {posts.map((post, i) => {
          const delay = i * 100;
          return (
            <div
              key={post.id}
              onClick={() => window.location.href = `/blog/${post.slug}`}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') window.location.href = `/blog/${post.slug}`; }}
              className="group bg-[#10101a] border border-[#1e1e2a] rounded-lg border-l-2 border-l-transparent hover:border-l-[#f59e0b] hover:bg-[#141420] hover:border-[#2a2a3a] hover:translate-y-[-2px] transition-all duration-200 p-5 sm:p-6 cursor-pointer text-left"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] text-[#f59e0b] border border-[#f59e0b]/15 bg-[#f59e0b]/6 px-2 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="text-base sm:text-lg font-semibold text-[#e4e4e7] mb-1 truncate">{post.title}</div>
                  <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1 shrink-0 text-[#52525b]"><span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&#8599;</span></div>
              </div>
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#1e1e2a]">
                <div className="font-mono text-[10px] sm:text-[11px] text-[#52525b] flex gap-3">
                  {post.published_at && (<span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>)}
                  <span>{post.read_time} min read</span>
                </div>
                <ReactionsBar slug={post.slug} initialReactions={post.reactions} compact />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section id="writing" className="relative min-h-screen bg-[#10101a] border-b border-[#1e1e2a] px-4 sm:px-8 lg:px-16 flex flex-col justify-center py-20 sm:py-24">
      <SectionHeader title="writing" number="04" accent="amber" />
      {content}
    </section>
  );
}
