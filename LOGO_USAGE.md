# Logo System Documentation

## Files Created

```
public/
├── favicon.svg           # Browser favicon (64x64)
├── apple-touch-icon.svg  # Apple touch icon (180x180)
├── logo-navbar.svg       # Navbar logo (48x32)
└── logo-header.svg       # Header/hero logo (200x100)
```

## 1. Favicon (favicon.svg)

- **Size**: 64x64px
- **Background**: Dark (#111827)
- **Text**: White, bold, centered
- **Usage**: Automatically loaded via layout.tsx metadata

## 2. Navbar Logo (logo-navbar.svg)

- **Size**: 48x32px
- **Background**: Transparent
- **Text**: Green (#4ade80) matching your brand color
- **Usage**: Replace text in navbar component

### Integration Example:

```tsx
// components/navbar.tsx
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f11] border-b border-[#1f1f23]/50 px-4 sm:px-6 md:px-8 lg:px-10 py-3.5 flex justify-between items-center">
      <a href="/" className="flex items-center">
        <Image
          src="/logo-navbar.svg"
          alt="NK Logo"
          width={48}
          height={32}
          priority
        />
      </a>
      {/* ... rest of navbar ... */}
    </nav>
  );
}
```

**OR** keep text but add logo:

```tsx
<a href="/" className="flex items-center gap-2">
  <Image
    src="/logo-navbar.svg"
    alt="NK"
    width={32}
    height={24}
    className="hidden sm:block"
  />
  <span className="font-mono text-xs sm:text-[13px] text-[#4ade80] tracking-tight">
    niraj<span className="text-[#22d3ee]">.</span>com
    <span className="text-[#22d3ee]">.</span>np
  </span>
</a>
```

## 3. Header Logo (logo-header.svg)

- **Size**: 200x100px
- **Background**: Dark rounded rectangle
- **Text**: Gradient (blue to purple)
- **Usage**: Optional for hero section or footer

### Integration Example:

```tsx
// components/hero.tsx or app/page.tsx
import Image from "next/image";

<section
  id="home"
  className="pt-8 sm:pt-10 md:pt-[52px] px-4 sm:px-6 md:px-8 lg:px-10"
>
  <div className="flex flex-col items-center sm:items-start mb-8">
    <Image
      src="/logo-header.svg"
      alt="NK"
      width={200}
      height={100}
      className="mb-4"
      priority
    />
  </div>
  {/* ... rest of hero content ... */}
</section>;
```

## Quick Start

The favicon is already configured in `app/layout.tsx`. To use logos in components:

1. **Import next/image**:

   ```tsx
   import Image from "next/image";
   ```

2. **Add logo with optimized loading**:
   ```tsx
   <Image
     src="/logo-navbar.svg"
     alt="NK Logo"
     width={48}
     height={32}
     priority // for above-the-fold logos
   />
   ```

## Customization

All logos use SVG format for:

- ✅ Crisp rendering at any size
- ✅ Small file size (~1KB each)
- ✅ Easy color customization
- ✅ Retina display support

To change colors, edit the SVG files directly in `/public/` folder.
