import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      {/* Logo Image - next/image ottimizzato con dimensioni esplicite */}
      <Image
        src="/img/logo.webp"
        alt="Biemme 2 - Costruzioni"
        width={180}
        height={56}
        priority // Logo è above-the-fold, preload
        className="h-14 w-auto object-contain"
      />
    </Link>
  );
}
