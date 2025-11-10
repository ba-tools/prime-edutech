import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

/**
 * Shared CTA button component for consistent styling across sections
 */
export function CTAButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  external = false,
}: CTAButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 hover:shadow-xl';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-indigo-700 text-white shadow-lg hover:scale-105',
    secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link
      href={href}
      {...linkProps}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Link>
  );
}
