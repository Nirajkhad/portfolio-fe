export function EmptySection({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[180px] py-10">
      <svg width="44" height="44" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5" className="mb-3 text-[#4ade80]/60">
        <circle cx="24" cy="24" r="20" strokeDasharray="4 4" />
        <path d="M16 24h16M24 16v16" strokeLinecap="round" />
      </svg>
      <div className="text-[#a1a1aa] text-base font-medium">
        {message || 'No content available.'}
      </div>
    </div>
  );
}
