'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Tilt } from '../ui/tilt';

export default function Hero() {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center overflow-hidden">

      {/* Container */}
      <div className="container mx-auto px-6 lg:px-8 pt-2 md:pt-0">
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
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                24x7 AI Counsellor
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold"
              variants={fadeInUp}
            >
              <span className="block text-gray-900">Your Path to</span>
              <span className="pb-1 block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                Study Abroad
              </span>
              <span className="block text-gray-900">Starts Here</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
              variants={fadeInUp}
            >
              We help students find, apply, and enroll in top universities worldwide. Let us guide you through every step of your international education journey.
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:gap-4 w-full"
              variants={fadeInUp}
            >
              <motion.button
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Free Consultation
              </motion.button>

              <motion.button
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200"
                whileHover={{ scale: 1.05, borderColor: "rgb(99, 102, 241)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="https://wa.me/917667432929" target="_blank" rel="noopener noreferrer">
                  <span className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>Whatsapp</span>
                  </span>
                </Link>
              </motion.button>
            </motion.div>

            <motion.div
              className="flex items-center gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {[
                { value: '10K+', label: 'Students helped' },
                { value: '10+', label: 'Years of Expertise' },
                { value: '50+', label: 'Institutions' },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div>
                    <motion.p
                      className="text-3xl font-bold text-gray-900"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                  {index < 2 && <div className="w-px h-12 bg-gray-300"></div>}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Floating Elements */}
          <div className="relative hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{ duration: 0.6, delay: 0.3, y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
            >
              <Tilt rotationFactor={8} isRevese>
                <div
                  style={{
                    borderRadius: '20px',
                    width: '480px',
                    height: '500px',
                  }}
                  className='relative overflow-hidden border-4 border-indigo-600 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-2xl transition-shadow duration-300'
                >
                  <Image
                    src='/assets/hero-1.png'
                    alt='Study Abroad'
                    fill
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                  />
                </div>
              </Tilt>
            </motion.div>
            {/* Floating Element 1 - Top Right */}
            {[
              {
                className: "absolute bottom-4 -right-8 z-10",
                transition: { duration: 0.6, delay: 0.4, y: { duration: 5, repeat: Infinity }, x: { duration: 5, repeat: Infinity } },
                animate: {
                  opacity: 1,
                  scale: 1,
                  y: [0, 0, 0],
                  x: [0, 10, 0],
                },
                img: "kyrgyzstan.png",
                text: "Kyrgyzstan",
              },
              {
                className: "absolute bottom-32 -left-16 w-28 lg:w-36 z-10",
                transition: { duration: 0.6, delay: 0.6, y: { duration: 6, repeat: Infinity }, x: { duration: 6, repeat: Infinity } },
                animate: {
                  opacity: 1,
                  scale: 1,
                  x: [0, -10, 0],
                  y: [0, 0, 0],
                },
                img: "philippines.png",
                text: "Philippines",
              },
              {
                className: "absolute top-14 -left-10 w-20 lg:w-24 z-15",
                transition: { duration: 0.6, delay: 0.8, y: { duration: 7, repeat: Infinity, ease: "easeInOut" }, x: { duration: 7, repeat: Infinity, ease: "easeInOut" } },
                animate: {
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                  x: [0, 0, 0],
                },
                img: "russia.png",
                text: "Russia",
              },
              {
                className: "absolute bottom-56 right-2 w-24 lg:w-32 z-15",
                transition: { duration: 0.6, delay: 1, y: { duration: 8, repeat: Infinity, ease: "easeInOut" }, x: { duration: 8, repeat: Infinity, ease: "easeInOut" } },
                animate: {
                  opacity: 1,
                  scale: 1,
                  y: [0, 0, 0],
                  x: [0, -13, 0],
                },
                img: "ukraine.png",
                text: "Ukraine",
              },
            ].map((el, idx) => (
              <motion.div
                key={idx}
                className={el.className}
                initial={{ opacity: 0, scale: 0 }}
                animate={el.animate}
                transition={el.transition}
              >
                <div className="flex items-center gap-2 bg-white rounded-xl border border-zinc-200 shadow-sm px-2 py-2 w-48">
                  <img
                    src={`/assets/${el.img}`}
                    alt={el.text}
                    className="border-2 border-green-200 rounded-full w-12 h-12 object-contain bg-white"
                    style={{ background: 'white' }}
                  />
                  <span
                    className="block text-gray-800 font-semibold text-base"
                    style={{ display: 'inline' }}
                  >
                    {el.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
