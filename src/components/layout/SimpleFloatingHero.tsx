'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Simple Floating Hero Section
 * 
 * Just drop in your images and you're ready to go!
 * Replace the image paths with your own.
 */

export default function SimpleFloatingHero() {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center overflow-hidden">

      {/* Container */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            className="space-y-8 z-10"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Now Available
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold"
              variants={fadeInUp}
            >
              <span className="block text-gray-900">Build Amazing</span>
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                Experiences
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
              variants={fadeInUp}
            >
              Create stunning web experiences with our powerful platform.
              Join thousands of creators building the future.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={fadeInUp}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </motion.button>

              <motion.button
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200"
                whileHover={{ scale: 1.05, borderColor: "rgb(99, 102, 241)" }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 pt-4"
              variants={fadeInUp}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-600">Join 10,000+ users</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Floating Elements */}
          <div className="relative h-[600px] lg:h-[700px]">

            {/* Background Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-indigo-300/30 via-purple-300/30 to-pink-300/30 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main Center Image */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 lg:w-96 z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -15, 0],
              }}
              transition={{ duration: 0.8, delay: 0.2, y: { duration: 4, repeat: Infinity } }}
            >
              <div className="relative aspect-square rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/400/400?random=1"
                  alt="Main hero image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Floating Element 1 - Top Right */}
            <motion.div
              className="absolute top-20 right-10 w-24 lg:w-32 z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -20, 0],
              }}
              transition={{ duration: 0.6, delay: 0.4, y: { duration: 5, repeat: Infinity } }}
            >
              <div className="relative aspect-square rounded-2xl shadow-xl overflow-hidden flex items-center justify-center bg-pink-400">
                <Image
                  src="https://picsum.photos/150/150?random=2"
                  alt="Floating element 1"
                  fill
                  className="object-cover"
                />
                <span className="absolute text-3xl z-10">⭐</span>
              </div>
            </motion.div>

            {/* Floating Element 2 - Bottom Left */}
            <motion.div
              className="absolute bottom-24 left-8 w-28 lg:w-36 z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -15, 0],
              }}
              transition={{ duration: 0.6, delay: 0.6, y: { duration: 6, repeat: Infinity } }}
            >
              <div className="relative aspect-square rounded-2xl shadow-xl overflow-hidden flex items-center justify-center bg-cyan-400">
                <Image
                  src="https://picsum.photos/150/150?random=3"
                  alt="Floating element 2"
                  fill
                  className="object-cover"
                />
                <span className="absolute text-3xl z-10">💎</span>
              </div>
            </motion.div>

            {/* Floating Element 3 - Top Left */}
            <motion.div
              className="absolute top-32 left-16 w-20 lg:w-24 z-15"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{ duration: 0.6, delay: 0.8, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div className="relative aspect-square rounded-2xl shadow-xl overflow-hidden flex items-center justify-center bg-yellow-400">
                <Image
                  src="https://picsum.photos/120/120?random=4"
                  alt="Floating element 3"
                  fill
                  className="object-cover"
                />
                <span className="absolute text-2xl z-10">✨</span>
              </div>
            </motion.div>

            {/* Floating Element 4 - Bottom Right */}
            <motion.div
              className="absolute bottom-32 right-20 w-24 lg:w-32 z-15"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -18, 0],
              }}
              transition={{ duration: 0.6, delay: 1, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div className="relative aspect-square rounded-2xl shadow-xl overflow-hidden flex items-center justify-center bg-green-400">
                <Image
                  src="https://picsum.photos/150/150?random=5"
                  alt="Floating element 4"
                  fill
                  className="object-cover"
                />
                <span className="absolute text-3xl z-10">🎯</span>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-10 left-10 w-16 h-16 border-4 border-indigo-300 rounded-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute bottom-16 right-16 w-12 h-12 bg-purple-300 rounded-full opacity-40"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

          </div>

        </div>
      </div>

    </section>
  );
}
