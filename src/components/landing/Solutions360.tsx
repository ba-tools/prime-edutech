'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Solutions360() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="relative min-h-screen px-4 overflow-hidden">
      <div className="container mx-auto rounded-3xl pt-8 md:pt-12 max-w-7xl bg-gradient-to-br from-blue-50 via-white to-blue-50">

        {/* Top Content Section */}
        <div className="text-center mb-12 md:mb-16 space-y-6 max-w-5xl mx-auto">

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-blue-600 font-semibold text-sm md:text-base tracking-wider uppercase">
              360 SOLUTIONS
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Find Every Solution, From Applications to Accommodations
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Access our full 360 Solutions, covering everything from application to arrival.
            Get instant language test vouchers, explore financial services, and invest in your
            future with flexible student loans. It's all here.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-base md:text-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>

        {/* Hero Image - Fully Responsive */}
        <motion.div
          className="relative w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-full">
            <Image
              src="/assets/hero-4.png"
              alt="360 Solutions - Student services including scholarships, visa services, and foreign exchange"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
              priority
              quality={95}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}