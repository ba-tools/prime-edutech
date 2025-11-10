'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  color?: string;
}

interface ReadyToBeginProps {
  title?: string;
  subtitle?: string;
  ctaButtonText?: string;
  socialLinks?: SocialLink[];
  showOrbitingCircles?: boolean;
  orbitingContent?: React.ReactNode;
}

// Default social links
const defaultSocialLinks: SocialLink[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://wa.me/917667432929',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: 'hover:text-green-500',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:contact@educonsult.com',
    icon: <Mail className="w-5 h-5" />,
    color: 'hover:text-blue-500',
  },
  {
    id: 'phone',
    name: 'Phone',
    url: 'tel:+917667432929',
    icon: <Phone className="w-5 h-5" />,
    color: 'hover:text-indigo-500',
  },
];

// Default orbiting circles content
const DefaultOrbitingContent = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center">
    <div className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-900 to-gray-400 bg-clip-text text-center text-5xl md:text-6xl font-bold leading-none text-transparent dark:from-white dark:to-gray-600">
      <Image src="/assets/icon.png" alt="Prime Edutech" height={64} width={64} sizes="64px" />
    </div>

    {/* Inner circles - smaller icons */}
    <OrbitingCircles
      className="size-[30px] border-none bg-transparent"
      duration={20}
      delay={5}
      radius={80}
    >
      <WhatsAppIcon />
    </OrbitingCircles>
    <OrbitingCircles
      className="size-[30px] border-none bg-transparent"
      duration={20}
      delay={15}
      radius={80}
    >
      <MailIcon />
    </OrbitingCircles>

    {/* Outer circles - larger icons (reverse direction) */}
    <OrbitingCircles
      className="size-[50px] border-none bg-transparent"
      radius={190}
      duration={20}
      delay={0}
      reverse
    >
      <GlobeIcon />
    </OrbitingCircles>
    <OrbitingCircles
      className="size-[50px] border-none bg-transparent"
      radius={190}
      duration={20}
      delay={10}
      reverse
    >
      <BookIcon />
    </OrbitingCircles>
  </div>
);

// Icon components for orbiting circles
const WhatsAppIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-green-500"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-blue-500"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="text-primary"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const BookIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="text-pink-500"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
  </svg>
);

export default function ReadyToBegin({
  title = 'Get Ready to Begin Your Journey',
  subtitle = 'Explore more, stay informed, and start your journey to academic excellence.',
  ctaButtonText = 'Start Now',
  socialLinks = defaultSocialLinks,
  showOrbitingCircles = true,
  orbitingContent,
}: ReadyToBeginProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      };

  const itemVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Title */}
            <motion.div variants={itemVariants}>
              <h2 className="font-bold text-gray-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
                {title}
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants}>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                {subtitle}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link href="https://wa.me/917667432929" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {ctaButtonText}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-6">
                <span className="text-sm font-semibold text-gray-600">
                  Connect with us:
                </span>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-gray-100 text-gray-700 transition-all duration-300 hover:bg-primary hover:text-white ${link.color}`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      title={link.name}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-gray-200"
            >
              <p className="text-sm text-gray-500">
                Join thousands of successful students already pursuing their dreams abroad.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Orbiting Circles Animation */}
          {showOrbitingCircles && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { duration: 0.3 }}
              viewport={{ once: true }}
              className="relative h-[500px] w-full flex flex-col items-center justify-center overflow-hidden "
            >
              {orbitingContent || <DefaultOrbitingContent />}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
