'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { togglePostReaction, type PostReactions } from '@/lib/api';

const REACTIONS = [
  { type: 'like', emoji: '👍', label: 'Like' },
  { type: 'love', emoji: '❤️', label: 'Love' },
  { type: 'fire', emoji: '🔥', label: 'Fire' },
  { type: 'celebrate', emoji: '🎉', label: 'Celebrate' },
  { type: 'clap', emoji: '👏', label: 'Clap' },
] as const;

const COOLDOWN_MS = 1200;

const ANIMATION_CLASSES: Record<string, string> = {
  like: 'animate-[like-explode_0.6s_ease]',
  love: 'animate-[love-explode_0.6s_ease]',
  fire: 'animate-[fire-explode_0.55s_ease]',
  celebrate: 'animate-[celebrate-explode_0.6s_ease]',
  clap: 'animate-[clap-explode_0.55s_ease]',
};

const HOVER_CLASSES: Record<string, string> = {
  like: 'hover:bg-[#4ade80]/10 hover:border-[#4ade80]/25 hover:text-[#4ade80] hover:shadow-[0_0_12px_rgba(74,222,128,0.08)]',
  love: 'hover:bg-[#f43f5e]/10 hover:border-[#f43f5e]/25 hover:text-[#f43f5e] hover:shadow-[0_0_12px_rgba(244,63,94,0.08)]',
  fire: 'hover:bg-[#f97316]/10 hover:border-[#f97316]/25 hover:text-[#f97316] hover:shadow-[0_0_12px_rgba(249,115,22,0.08)]',
  celebrate: 'hover:bg-[#a855f7]/10 hover:border-[#a855f7]/25 hover:text-[#a855f7] hover:shadow-[0_0_12px_rgba(168,85,247,0.08)]',
  clap: 'hover:bg-[#eab308]/10 hover:border-[#eab308]/25 hover:text-[#eab308] hover:shadow-[0_0_12px_rgba(234,179,8,0.08)]',
};

const ACTIVE_CLASSES: Record<string, string> = {
  like: 'bg-[#4ade80]/12 border-[#4ade80]/30 text-[#4ade80] shadow-[0_0_16px_rgba(74,222,128,0.12)]',
  love: 'bg-[#f43f5e]/12 border-[#f43f5e]/30 text-[#f43f5e] shadow-[0_0_16px_rgba(244,63,94,0.12)]',
  fire: 'bg-[#f97316]/12 border-[#f97316]/30 text-[#f97316] shadow-[0_0_16px_rgba(249,115,22,0.12)]',
  celebrate: 'bg-[#a855f7]/12 border-[#a855f7]/30 text-[#a855f7] shadow-[0_0_16px_rgba(168,85,247,0.12)]',
  clap: 'bg-[#eab308]/12 border-[#eab308]/30 text-[#eab308] shadow-[0_0_16px_rgba(234,179,8,0.12)]',
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
  dist: number;
  rot: number;
}

export function ReactionsBar({ slug, initialReactions, compact = false }: ReactionsBarProps) {
  const [reactions, setReactions] = useState<PostReactions>(initialReactions);
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [animatingType, setAnimatingType] = useState<string | null>(null);
  const [popCount, setPopCount] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [rings, setRings] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [rateLimited, setRateLimited] = useState<string | null>(null);
  const loadingRef = useRef(false);
  const cooldownRef = useRef<Map<string, number>>(new Map());

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
    const emoji = REACTIONS.find((r) => r.type === type)?.emoji ?? '';
    const count = 10;
    const now = Date.now();
    const newSparkles: Sparkle[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count - Math.PI + (Math.random() - 0.5) * 0.8;
      const dist = 30 + Math.random() * 50;
      return {
        id: now + i,
        x,
        y,
        angle,
        emoji,
        dist,
        rot: (Math.random() - 0.5) * 360,
      };
    });
    setSparkles((prev) => [...prev, ...newSparkles]);
    const colorMap: Record<string, string> = { like: '#4ade80', love: '#f43f5e', fire: '#f97316', celebrate: '#a855f7', clap: '#eab308' };
    const ringId = now + count;
    setRings((prev) => [...prev, { id: ringId, x, y, color: colorMap[type] || '#4ade80' }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id)));
    }, 700);
    setTimeout(() => {
      setRings((prev) => prev.filter((r) => r.id !== ringId));
    }, 500);
  }, []);

  const handleClick = async (type: string, e: React.MouseEvent) => {
    if (loadingRef.current) return;

    const now = Date.now();
    const lastClick = cooldownRef.current.get(type) || 0;
    if (now - lastClick < COOLDOWN_MS) return;

    loadingRef.current = true;
    cooldownRef.current.set(type, now);

    const wasActive = userReactions.includes(type);
    const prevReactions = { ...reactions };
    const prevUser = [...userReactions];

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
      setRateLimited(null);
      setReactions(result.reactions);
      setUserReactions(result.user_reactions);
    } catch (err) {
      cooldownRef.current.set(type, now - COOLDOWN_MS + 2000);
      setRateLimited(type);
      setTimeout(() => setRateLimited(null), 800);
      setReactions(prevReactions);
      setUserReactions(prevUser);
    } finally {
      loadingRef.current = false;
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
              className={`
                relative flex items-center gap-1 font-mono rounded-md transition-colors duration-150 cursor-pointer select-none
                hover:scale-110 hover:-translate-y-0.5 active:scale-90
                ${compact ? 'text-[10px] px-1.5 py-1' : 'text-[11px] px-2.5 py-1.5'}
                border border-[#1e1e2a] bg-transparent text-[#52525b]
                ${isActive ? ACTIVE_CLASSES[type] : HOVER_CLASSES[type]}
                ${isAnimating ? ANIMATION_CLASSES[type] : ''}
                ${rateLimited === type ? '!border-[#ef4444] !text-[#ef4444] animate-[shake_0.4s_ease]' : ''}
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
          className="fixed pointer-events-none z-50 text-sm"
          style={{
            left: s.x,
            top: s.y,
            animation: 'sparkle-explode 0.7s ease-out forwards',
            ['--dx' as string]: `${Math.cos(s.angle) * s.dist}px`,
            ['--dy' as string]: `${Math.sin(s.angle) * s.dist}px`,
            ['--rot' as string]: `${s.rot}deg`,
          }}
        >
          {s.emoji}
        </span>
      ))}
      {rings.map((r) => (
        <span
          key={r.id}
          className="fixed pointer-events-none z-40 rounded-full border-2"
          style={{
            left: r.x - 8,
            top: r.y - 8,
            width: 16,
            height: 16,
            borderColor: r.color,
            boxShadow: `0 0 6px ${r.color}40`,
            animation: 'ring-expand 0.5s ease-out forwards',
          }}
        />
      ))}
    </div>
  );
}
