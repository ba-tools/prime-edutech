'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getAssetUrl } from '@/lib/assets';

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
    url: 'mailto:contact@primeedutech.com',
    icon: <Mail className="w-5 h-5" />,
    color: 'hover:text-blue-500',
  },
  {
    id: 'phone',
    name: 'Phone',
    url: 'tel:+918797444844',
    icon: <Phone className="w-5 h-5" />,
    color: 'hover:text-indigo-500',
  },
];

// Default orbiting circles content
const DefaultOrbitingContent = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center">
    <div className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-900 to-gray-400 bg-clip-text text-center text-5xl md:text-6xl font-bold leading-none text-transparent dark:from-white dark:to-gray-600">
      <Image src={getAssetUrl('/assets/icon.png')} alt="Prime Edutech" height={64} width={64} sizes="64px" />
    </div>

    {/* Inner circles - smaller icons */}
    <OrbitingCircles
      className="size-[50px] border-none bg-transparent"
      duration={20}
      delay={5}
      radius={80}
    >
      <Image
        src={getAssetUrl('/assets/kyrgyzstan.png')}
        alt="Kyrgyzstan"
        width={50}
        height={50}
        className="rounded-full object-cover"
      />
    </OrbitingCircles>
    <OrbitingCircles
      className="size-[50px] border-none bg-transparent"
      duration={20}
      delay={15}
      radius={80}
    >
      <Image
        src={getAssetUrl('/assets/philippines.png')}
        alt="Philippines"
        width={50}
        height={50}
        className="rounded-full object-cover"
      />
    </OrbitingCircles>

    {/* Outer circles - larger icons (reverse direction) */}
    <OrbitingCircles
      className="size-[60px] border-none bg-transparent"
      radius={190}
      duration={20}
      delay={0}
      reverse
    >
      <Image
        src={getAssetUrl('/assets/russia.png')}
        alt="Russia"
        width={60}
        height={60}
        className="rounded-full object-cover"
      />
    </OrbitingCircles>
    <OrbitingCircles
      className="size-[60px] border-none bg-transparent"
      radius={190}
      duration={20}
      delay={10}
      reverse
    >
      <Image
        src={getAssetUrl('/assets/ukraine.png')}
        alt="Ukraine"
        width={60}
        height={60}
        className="rounded-full object-cover"
      />
    </OrbitingCircles>
  </div>
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
