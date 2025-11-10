import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Shared section header component for consistent typography and spacing
 */
export function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={cn('mb-12 md:mb-16', alignClass, className)}>
      {badge && (
        <p className="text-primary font-semibold text-sm md:text-base tracking-wider mb-4 uppercase">
          {badge}
        </p>
      )}
      <h2
        className="font-bold text-gray-900 mb-4"
        style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-base md:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
