interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  gradient?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  description,
  centered = false,
  gradient = false,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {subtitle && (
        <p className="mb-2 text-sm font-light uppercase tracking-widest text-primary">
          {subtitle}
        </p>
      )}
      <h2
        className={`
          text-3xl font-light tracking-tight md:text-4xl lg:text-5xl
          ${gradient ? 'gradient-text' : 'text-text-primary'}
        `}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-lg font-light text-text-secondary ${centered ? 'mx-auto text-balance' : ''
            }`}
        >
          {description}
        </p>
      )}
      {/* Decorative gradient line */}
      <div
        className={`
          mt-6 h-0.5 w-20
          bg-gradient-to-r from-primary-end to-primary-start
          ${centered ? 'mx-auto' : ''}
        `}
      />
    </div>
  );
}
