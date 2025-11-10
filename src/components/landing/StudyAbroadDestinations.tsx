'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  optionsAvailable: number;
  icon?: React.ReactNode;
}

interface StudyAbroadDestinationsProps {
  title?: string;
  subtitle?: string;
  destinations: Destination[];
  exploreMoreLink?: string;
  showExploreMore?: boolean;
}

const defaultDestinations: Destination[] = [
  { id: '1', name: 'Georgia', optionsAvailable: 31 },
  { id: '2', name: 'Tajikistan', optionsAvailable: 6 },
  { id: '3', name: 'Russia', optionsAvailable: 58 },
  { id: '4', name: 'Uzbekistan', optionsAvailable: 6 },
  { id: '5', name: 'Bulgaria', optionsAvailable: 5 },
  { id: '6', name: 'Kazakhstan', optionsAvailable: 13 },
];

export default function StudyAbroadDestinations({
  title = 'Study Abroad from Top Destination',
  subtitle = 'Discover everything you need to know about your dream study destination abroad!',
  destinations = defaultDestinations,
  exploreMoreLink = '#',
  showExploreMore = true,
}: StudyAbroadDestinationsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-semibold text-sm md:text-base tracking-wider mb-4">
                INTERNATIONAL STUDIES
              </p>
              <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
                {title}
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl">
                {subtitle}
              </p>
            </motion.div>
          </div>

          {/* Explore More Button */}
          {showExploreMore && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={exploreMoreLink}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group"
              >
                Explore More
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Destinations Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              className="group relative"
            >
              <Link href="#contact">
                <div className="h-full p-6 md:p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 cursor-pointer border border-gray-100 hover:border-gray-200">
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {destination.name}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        {destination.optionsAvailable} options available
                      </p>
                    </div>
                  </div>

                  {/* Map Icon */}
                  <div className="flex justify-end">
                    {destination.icon || (
                      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <Globe className="w-12 h-12 md:w-16 md:h-16 text-gray-300" strokeWidth={1} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
