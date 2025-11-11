'use client';

import { Search, FileText, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { containerVariants, itemVariants, fadeInDown, standardViewport } from '@/lib/animations';

export default function WhySection() {
  const prefersReducedMotion = useReducedMotion();
  const features = [
    {
      icon: Search,
      title: "Course Finder",
      description: "AI-powered tool to find the perfect course and university for your goals."
    },
    {
      icon: FileText,
      title: "Application Support",
      description: "End-to-end assistance with applications, documents, and visa process."
    },
    {
      icon: MessageSquare,
      title: "AI Counsellor",
      description: "Get instant answers to your questions with our AI-powered counsellor."
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInDown(prefersReducedMotion)} initial="hidden" whileInView="visible" viewport={standardViewport} className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Why Choose Prime Edutech?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive services to guide you through every step of your education journey
          </p>
        </motion.div>

        <motion.div variants={containerVariants(prefersReducedMotion)} initial="hidden" whileInView="visible" viewport={standardViewport} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants(prefersReducedMotion)}>
              <Card className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <feature.icon className="h-10 w-10 md:h-12 md:w-12 text-primary" />
                  <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardTitle className="text-lg md:text-xl lg:text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
