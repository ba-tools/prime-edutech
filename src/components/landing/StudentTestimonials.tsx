'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  studentName: string;
  universityName: string;
  text: string;
  image: string;
  rating?: number; // 1-5 stars (optional)
}

interface StudentTestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  columns?: 2 | 3 | 4;
  showRatings?: boolean;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    studentName: 'Priya Sharma',
    universityName: 'University of Edinburgh, UK',
    text: 'The guidance provided was exceptional. They helped me navigate the entire application process smoothly and secured my admission to my dream university. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
    rating: 5,
  },
  {
    id: '2',
    studentName: 'Arjun Patel',
    universityName: 'University of Toronto, Canada',
    text: 'Excellent support throughout my journey. The counselors understood my goals and provided personalized advice. My admission was secured faster than expected!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    rating: 5,
  },
  {
    id: '3',
    studentName: 'Neha Singh',
    universityName: 'Humboldt University, Germany',
    text: 'Outstanding service! They made the complex visa and application process so simple. I got admitted and my visa approved within 4 months. Best decision ever!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
    rating: 5,
  },
  {
    id: '4',
    studentName: 'Rahul Verma',
    universityName: 'Universitat Autònoma de Barcelona, Spain',
    text: 'Their AI course finder tool is incredible! It matched me with the perfect program in Spain. The entire team was supportive and responsive throughout.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
    rating: 5,
  },
  {
    id: '5',
    studentName: 'Ananya Gupta',
    universityName: 'National University of Singapore',
    text: 'From course selection to final enrollment, every step was handled professionally. I am now pursuing my dream degree in Singapore. Thank you!',
    image: 'https://images.unsplash.com/photo-1507038957-40169c1b8e6c?w=500&h=500&fit=crop',
    rating: 5,
  },
  {
    id: '6',
    studentName: 'Vikram Desai',
    universityName: 'University of Amsterdam, Netherlands',
    text: 'The instant counselor feature helped me get answers to my doubts 24/7. Combined with expert human guidance, my journey was seamless and stress-free.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
    rating: 5,
  },
  {
    id: '7',
    studentName: 'Kavya Iyer',
    universityName: 'University College London, UK',
    text: 'Everything was transparent and well-organized. They guided me through every challenge and made my admission to UCL possible. Fantastic team!',
    image: 'https://images.unsplash.com/photo-1517330745675-c6428eaf7a6f?w=500&h=500&fit=crop',
    rating: 4,
  },
  {
    id: '8',
    studentName: 'Aman Kumar',
    universityName: 'RWTH Aachen University, Germany',
    text: 'The application support was thorough and detailed. They helped perfect my statement of purpose and essays. Now I am at my dream university!',
    image: 'https://images.unsplash.com/photo-1499378149411-f49db12ff774?w=500&h=500&fit=crop',
    rating: 5,
  },
  {
    id: '9',
    studentName: 'Shreya Menon',
    universityName: 'University of Melbourne, Australia',
    text: 'The entire experience was delightful. From initial consultation to post-admission support, they stood by me. Highly grateful for their expertise!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
    rating: 5,
  },
];

export default function StudentTestimonials({
  title = 'What Our Students Say',
  subtitle = 'Real success stories from students who achieved their dreams with our guidance',
  testimonials = defaultTestimonials,
  columns = 3,
  showRatings = true,
}: StudentTestimonialsProps) {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getGridCols = () => {
    switch (columns) {
      case 2:
        return 'md:grid-cols-2';
      case 4:
        return 'md:grid-cols-4';
      case 3:
      default:
        return 'md:grid-cols-3';
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-semibold text-sm md:text-base tracking-wider mb-4">
            SUCCESS STORIES
          </p>
          <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
            {title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className={`grid grid-cols-1 ${getGridCols()} lg:grid-cols-${columns} gap-8`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group"
            >
              <div className="h-full flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 overflow-hidden">
                {/* Card Content */}
                <div className="p-6 md:p-8 flex flex-col h-full">
                  {/* Stars */}
                  {showRatings && testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating!
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Testimonial Text */}
                  <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow">
                    &quot;{testimonial.text}&quot;
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 mb-6"></div>

                  {/* Student Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.studentName}
                        fill
                        sizes="56px"
                        className="rounded-full object-cover border-2 border-primary/20"
                      />
                    </div>

                    {/* Name and University */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {testimonial.studentName}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {testimonial.universityName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-lg mb-6">
            Ready to become our next success story?
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
            Start Your Journey
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
