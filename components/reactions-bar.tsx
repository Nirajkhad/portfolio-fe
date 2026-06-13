'use client';

import { useState, useCallback, useEffect } from 'react';
import { togglePostReaction } from '@/lib/api';

interface ReactionsBarProps {
  slug: string;
  initialReactions: Record<string, number>;
  compact?: boolean;
}

const REACTIONS = [
  { type: 'like', emoji: '👍', label: 'Like', activeColor: 'text-blue-400' },
  { type: 'love', emoji: '❤️', label: 'Love', activeColor: 'text-red-400' },
  { type: 'fire', emoji: '🔥', label: 'Fire', activeColor: 'text-orange-400' },
  { type: 'celebrate', emoji: '🎉', label: 'Celebrate', activeColor: 'text-yellow-400' },
  { type: 'clap', emoji: '👏', label: 'Clap', activeColor: 'text-purple-400' },
] as const;

export function ReactionsBar({ slug, initialReactions, compact = false }: ReactionsBarProps) {
  const storageKey = `portfolio_react_${slug}`;

  const [reactions, setReactions] = useState(initialReactions);
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [animating, setAnimating] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setUserReactions(JSON.parse(stored));
      }
    } catch {
      // localStorage unavailable
    }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(userReactions));
    } catch {
      // localStorage unavailable
    }
  }, [userReactions, storageKey, loaded]);

  const handleReaction = useCallback(async (type: string) => {
    if (loading) return;
    setLoading(type);
    setAnimating(type);
    setTimeout(() => setAnimating(null), 400);

    const wasActive = userReactions.includes(type);

    setUserReactions(prev =>
      wasActive ? prev.filter(t => t !== type) : [...prev, type]
    );
    setReactions(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (wasActive ? -1 : 1)),
    }));

    try {
      const result = await togglePostReaction(slug, type);
      setUserReactions(result.user_reactions);
      setReactions(result.reactions);
    } catch {
      setUserReactions(prev =>
        wasActive ? [...prev, type] : prev.filter(t => t !== type)
      );
      setReactions(prev => ({
        ...prev,
        [type]: Math.max(0, prev[type] + (wasActive ? 1 : -1)),
      }));
    } finally {
      setLoading(null);
    }
  }, [slug, loading, userReactions]);

  const total = Object.values(reactions).reduce((a, b) => a + b, 0);

  return (
    <div className={`flex ${compact ? 'gap-2' : 'gap-1 sm:gap-2'}`}>
      {REACTIONS.map(({ type, emoji, label, activeColor }) => {
        const isActive = userReactions.includes(type);
        const isAnimating = animating === type;

        return (
          <button
            key={type}
            onClick={(e) => { e.stopPropagation(); handleReaction(type); }}
            disabled={loading === type}
            title={label}
            className={`
              group flex items-center gap-1 rounded-lg transition-all duration-200 select-none
              ${compact
                ? 'px-1.5 py-0.5 text-xs'
                : 'px-2 sm:px-3 py-1.5 text-sm sm:text-base'
              }
              ${isActive
                ? `${activeColor} bg-[#27272a] scale-110`
                : 'text-[#9ca3af] hover:bg-[#27272a]/60 hover:scale-110'
              }
              ${isAnimating ? 'animate-[reaction-bounce_400ms_ease]' : ''}
              cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
            `}
            style={{
              willChange: 'transform',
            }}
          >
            <span
              className={`
                transition-transform duration-200
                group-hover:scale-125
                ${isAnimating ? 'scale-125' : ''}
              `}
            >
              {emoji}
            </span>
            {!compact && reactions[type] > 0 && (
              <span className="text-xs font-mono tabular-nums">{reactions[type]}</span>
            )}
          </button>
        );
      })}
      {compact && total > 0 && (
        <span className="text-xs text-[#71717a] font-mono self-center ml-1">{total}</span>
      )}
    </div>
  );
}
