'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getAssetUrl } from '@/lib/assets';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeInDown, fadeInUp, fadeIn, scaleIn, standardViewport, DELAYS } from '@/lib/animations';

export default function Solutions360() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative px-4 overflow-hidden" style={{ paddingTop: 'clamp(3rem, 8vh, 6rem)', paddingBottom: 'clamp(3rem, 8vh, 6rem)' }}>
      <div className="container mx-auto rounded-3xl pt-8 md:pt-12 max-w-7xl bg-gradient-to-br from-blue-50 via-white to-blue-50">

        {/* Top Content Section */}
        <div className="text-center mb-12 md:mb-16 space-y-6 max-w-5xl mx-auto">

          {/* Tag */}
          <motion.div
            variants={fadeInDown(prefersReducedMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
          >
            <span className="inline-block text-blue-600 font-semibold text-sm md:text-base tracking-wider uppercase">
              360 SOLUTIONS
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="font-bold text-gray-900 leading-tight px-4"
            style={{ fontSize: 'clamp(1.875rem, 4vw, 2.25rem)' }}
            variants={fadeInUp(prefersReducedMotion, DELAYS.short)}
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
          >
            Find Every Solution, From Applications to Accommodations
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-4"
            variants={fadeIn(prefersReducedMotion, DELAYS.medium)}
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
          >
            Access our full 360 Solutions, covering everything from application to arrival.
            Get instant language test vouchers, explore financial services, and invest in your
            future with flexible student loans. It&apos;s all here.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={fadeInUp(prefersReducedMotion, DELAYS.long)}
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
          >
            <motion.button
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-base md:text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Image - Fully Responsive */}
        <motion.div
          className="relative w-full max-w-6xl mx-auto"
          variants={scaleIn(prefersReducedMotion, DELAYS.long)}
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
        >
          <div className="relative w-full">
            <Image
              src={getAssetUrl('/assets/hero-4.png')}
              alt="360 Solutions - Student services including scholarships, visa services, and foreign exchange"
              width={1920}
              height={1080}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="w-full h-auto object-contain"
              quality={95}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}