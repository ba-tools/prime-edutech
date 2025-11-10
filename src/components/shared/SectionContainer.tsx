import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'gradient';
}

/**
 * Shared section container component for consistent spacing and layout
 */
export function SectionContainer({
  children,
  className,
  id,
  background = 'white',
}: SectionContainerProps) {
  const bgClass = {
    white: 'bg-white',
    gray: 'bg-gradient-to-b from-gray-50 to-white',
    gradient: 'bg-gradient-to-br from-blue-50 via-white to-blue-50',
  }[background];

  return (
    <section id={id} className={cn('py-16 md:py-24', bgClass, className)}>
      <div className="container mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}
