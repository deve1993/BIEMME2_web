import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant =
  | "gradient"
  | "solid"
  | "outline"
  | "outline-light"
  | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  gradient: `
    bg-gradient-to-r from-primary-end to-primary-start text-white
    hover:from-primary-start hover:to-primary-end
    hover:shadow-lg hover:shadow-primary/20
  `,
  solid: `
    bg-primary text-white
    hover:bg-primary-hover
  `,
  outline: `
    border-2 border-primary text-primary bg-transparent
    hover:bg-primary hover:text-white
    dark:border-white/80 dark:text-white dark:hover:bg-white dark:hover:text-primary
  `,
  "outline-light": `
    border-2 border-white/30 text-white bg-transparent
    hover:border-white hover:bg-white hover:text-primary
  `,
  ghost: `
    text-text-secondary bg-transparent
    hover:text-primary hover:bg-primary-muted
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "gradient",
      size = "md",
      href,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    // Transizioni solo su desktop (md:) per non impattare TBT mobile
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      rounded font-light uppercase tracking-wide
      md:transition-[color,background-color,border-color,box-shadow,transform] md:duration-150
      focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-primary focus-visible:ring-offset-2
      focus-visible:ring-offset-background
      disabled:opacity-50 disabled:pointer-events-none
    `;

    const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={styles}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
