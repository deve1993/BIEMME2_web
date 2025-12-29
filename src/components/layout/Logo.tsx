import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {/* Icon Container */}
      <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-br from-primary-end to-primary-start">
        <span
          className="material-symbols-outlined text-white"
          style={{ fontSize: '24px' }}
        >
          construction
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className="text-xl font-medium uppercase tracking-tight text-text-primary">
          Biemme 2
        </span>
        <span className="text-[10px] font-light uppercase tracking-widest gradient-text">
          Costruzioni
        </span>
      </div>
    </Link>
  );
}
