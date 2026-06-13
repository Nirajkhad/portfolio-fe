export function EmptySection({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[160px] py-8">
      <div className="font-mono text-[11px] text-[#52525b] mb-2">// no content</div>
      <div className="text-[#52525b] text-sm">{message || 'No content available.'}</div>
    </div>
  );
}
