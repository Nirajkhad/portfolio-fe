'use client';

import { useState, useEffect, useCallback } from 'react';
import { togglePostReaction, type PostReactions } from '@/lib/api';

const REACTIONS = [
  { type: 'like', emoji: '👍', label: 'Like' },
  { type: 'love', emoji: '❤️', label: 'Love' },
  { type: 'fire', emoji: '🔥', label: 'Fire' },
  { type: 'celebrate', emoji: '🎉', label: 'Celebrate' },
  { type: 'clap', emoji: '👏', label: 'Clap' },
] as const;

const ANIMATION_CLASSES: Record<string, string> = {
  like: 'animate-[like-bob_0.6s_ease]',
  love: 'animate-[heart-pulse_0.6s_ease]',
  fire: 'animate-[fire-flicker_0.5s_ease]',
  celebrate: 'animate-[celebrate-bounce_0.6s_ease]',
  clap: 'animate-[clap-shake_0.5s_ease]',
};

const HOVER_CLASSES: Record<string, string> = {
  like: 'hover:bg-[#4ade80]/8 hover:border-[#4ade80]/20 hover:text-[#4ade80]',
  love: 'hover:bg-[#f43f5e]/8 hover:border-[#f43f5e]/20 hover:text-[#f43f5e]',
  fire: 'hover:bg-[#f97316]/8 hover:border-[#f97316]/20 hover:text-[#f97316]',
  celebrate: 'hover:bg-[#a855f7]/8 hover:border-[#a855f7]/20 hover:text-[#a855f7]',
  clap: 'hover:bg-[#eab308]/8 hover:border-[#eab308]/20 hover:text-[#eab308]',
};

const ACTIVE_CLASSES: Record<string, string> = {
  like: 'bg-[#4ade80]/10 border-[#4ade80]/25 text-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.06)]',
  love: 'bg-[#f43f5e]/10 border-[#f43f5e]/25 text-[#f43f5e] shadow-[0_0_12px_rgba(244,63,94,0.06)]',
  fire: 'bg-[#f97316]/10 border-[#f97316]/25 text-[#f97316] shadow-[0_0_12px_rgba(249,115,22,0.06)]',
  celebrate: 'bg-[#a855f7]/10 border-[#a855f7]/25 text-[#a855f7] shadow-[0_0_12px_rgba(168,85,247,0.06)]',
  clap: 'bg-[#eab308]/10 border-[#eab308]/25 text-[#eab308] shadow-[0_0_12px_rgba(234,179,8,0.06)]',
};

interface ReactionsBarProps {
  slug: string;
  initialReactions: PostReactions;
  compact?: boolean;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  emoji: string;
}

export function ReactionsBar({ slug, initialReactions, compact = false }: ReactionsBarProps) {
  const [reactions, setReactions] = useState<PostReactions>(initialReactions);
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [animatingType, setAnimatingType] = useState<string | null>(null);
  const [popCount, setPopCount] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`reactions_${slug}`);
    if (stored) {
      try {
        setUserReactions(JSON.parse(stored));
      } catch { /* ignore */ }
    }
  }, [slug]);

  useEffect(() => {
    if (userReactions.length > 0) {
      localStorage.setItem(`reactions_${slug}`, JSON.stringify(userReactions));
    } else {
      localStorage.removeItem(`reactions_${slug}`);
    }
  }, [userReactions, slug]);

  const triggerSparkles = useCallback((type: string, x: number, y: number) => {
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (Math.PI * 2 * i) / 5 - Math.PI + (Math.random() - 0.5),
      emoji: REACTIONS.find((r) => r.type === type)?.emoji ?? '',
    }));
    setSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)));
    }, 700);
  }, []);

  const handleClick = async (type: string, e: React.MouseEvent) => {
    if (loading) return;
    setLoading(true);

    const wasActive = userReactions.includes(type);
    const prevReactions = { ...reactions };
    const prevUser = [...userReactions];

    // Optimistic update
    const newCount = wasActive
      ? Math.max(0, (reactions[type] || 0) - 1)
      : (reactions[type] || 0) + 1;

    setReactions((prev) => ({ ...prev, [type]: newCount }));

    if (wasActive) {
      setUserReactions((prev) => prev.filter((t) => t !== type));
    } else {
      setUserReactions((prev) => [...prev, type]);
      setAnimatingType(type);
      triggerSparkles(type, e.clientX, e.clientY);
      setTimeout(() => setAnimatingType(null), 600);
    }

    setPopCount(type);
    setTimeout(() => setPopCount(null), 300);

    try {
      const result = await togglePostReaction(slug, type);
      setReactions(result.reactions);
      setUserReactions(result.user_reactions);
    } catch {
      setReactions(prevReactions);
      setUserReactions(prevUser);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex ${compact ? 'gap-1' : 'gap-2'} relative`}>
      {REACTIONS.map(({ type, emoji, label }) => {
        const count = reactions[type] || 0;
        const isActive = userReactions.includes(type);
        const isAnimating = animatingType === type;

        return (
          <div key={type} className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); handleClick(type, e); }}
              disabled={loading}
              className={`
                relative flex items-center gap-1 font-mono rounded-md transition-all duration-200 cursor-pointer select-none
                ${compact ? 'text-[10px] px-1.5 py-1' : 'text-[11px] px-2.5 py-1.5'}
                border border-[#1e1e2a] bg-transparent text-[#52525b]
                ${isActive ? ACTIVE_CLASSES[type] : HOVER_CLASSES[type]}
                ${isAnimating ? ANIMATION_CLASSES[type] : ''}
                ${loading ? 'opacity-60 pointer-events-none' : ''}
              `}
              title={label}
            >
              <span className={isAnimating ? 'inline-block' : ''}>{emoji}</span>
              {count > 0 && (
                <span
                  className={`tabular-nums ${popCount === type ? 'animate-[count-pop_0.3s_ease]' : ''}`}
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        );
      })}

      {sparkles.map((s) => (
        <span
          key={s.id}
          className="fixed pointer-events-none z-50 text-xs"
          style={{
            left: s.x,
            top: s.y,
            animation: 'sparkle-fly 0.7s ease-out forwards',
            ['--dx' as string]: `${Math.cos(s.angle) * 40}px`,
            ['--dy' as string]: `${Math.sin(s.angle) * 40 - 20}px`,
          }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
}
