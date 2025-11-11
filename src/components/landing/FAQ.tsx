'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { containerVariants, itemVariants, fadeInLeft, fadeIn, standardViewport, DELAYS } from '@/lib/animations';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  faqs: FAQ[];
  showContactCTA?: boolean;
  contactEmail?: string;
}

export default function FAQSection({
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know',
  description = 'Find answers to common questions about studying MBBS abroad and our services.',
  faqs,
  showContactCTA = true,
  contactEmail = 'contact@primeedutech.com',
}: FAQSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Static Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={fadeInLeft(prefersReducedMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
          >
            {/* Section Label */}
            <div>
              <p className="text-primary font-semibold text-sm md:text-base tracking-wider mb-2">
                HELPFUL RESOURCES
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
              <p className="text-lg text-gray-600">
                {subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-base text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Contact CTA */}
            {showContactCTA && (
              <motion.div
                className="pt-6 space-y-4"
                variants={fadeIn(prefersReducedMotion, DELAYS.long)}
                initial="hidden"
                whileInView="visible"
                viewport={standardViewport}
              >
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Didn&apos;t find what you&apos;re looking for?
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Get in touch with our expert counselors for personalized guidance.
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group"
                  >
                    Contact Us
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                  </a>
                </div>

                {/* Decorative elements */}
                <div className="space-y-3 mt-6">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Available 24/7 for your questions
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Expert guidance from admission specialists
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Personalized solutions for your needs
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div
            className="lg:col-span-3"
            variants={containerVariants(prefersReducedMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants(prefersReducedMotion)}
                >
                  <AccordionItem
                    value={faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 transition-colors data-[state=open]:border-primary"
                  >
                    <AccordionTrigger className="px-6 py-4 md:py-5 hover:bg-gray-50 hover:no-underline font-semibold text-gray-900 text-left text-base md:text-lg">
                      <span className="flex items-start gap-4 w-full">
                        <span className="text-primary font-bold text-sm md:text-base flex-shrink-0 mt-0.5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1">{faq.question}</span>
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 py-4 md:py-5 text-gray-600 text-base leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
