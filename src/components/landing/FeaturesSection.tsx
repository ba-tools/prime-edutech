"use client";

import Image from "next/image";
import { BookOpen, Grid3x3, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAssetUrl } from "@/lib/assets";

export default function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Easily apply to multiple programs",
      description: "",
    },
    {
      icon: Grid3x3,
      title: "Find your perfect program from 140,000+ options in five top destinations",
      description: "",
    },
    {
      icon: BarChart3,
      title: "Get a higher chance of success with quality checks and AI technology",
      description: "",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            {/* Tag */}
            <div className="inline-flex w-fit mb-4 md:mb-6">
              <span className="text-primary text-xs md:text-sm font-bold tracking-widest">
                INTERNATIONAL STUDENTS
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-bold mb-4 md:mb-6 leading-tight" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
              Find Your Perfect Study Program
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-8 md:mb-10">
              We&apos;ve spent a decade perfecting a faster, easier, quality-first international study application process. Now, the world is yours to explore in just a few clicks.
            </p>

            {/* Features List */}
            <div className="space-y-6 mb-8 md:mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 md:gap-5">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base font-medium text-foreground">
                      {feature.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <Button size="lg" className="h-10 md:h-12 text-sm md:text-base px-6 md:px-8 rounded-lg">
                Try It Today
              </Button>
            </div>
          </div>

          {/* Right Column - Images and Stats */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-3 gap-4 h-96 md:h-[28rem]">
              {/* Main Student Image - Left Column */}
              <div className="col-span-2 row-span-2 relative">
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white">
                  <Image
                    src={getAssetUrl('/assets/hero-2.png')}
                    alt="Student with ipad"
                    fill
                    sizes="(max-width: 1024px) 0px, 400px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Stats Card - Top Right */}
              <div className="col-span-1 relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-blue-700 p-6 md:p-8 flex flex-col justify-center text-white">
                <div className="absolute top-4 right-4 opacity-80">
                  <BookOpen className="h-8 w-8" />
                </div>
                <p className="text-4xl md:text-5xl font-bold mb-2">95%</p>
                <p className="text-sm md:text-base font-medium">Acceptance Rate</p>
              </div>

              {/* Student Image - Bottom Right */}
              <div className="col-span-1 relative rounded-3xl overflow-hidden">
                <Image
                  src={getAssetUrl('/assets/hero-3.jpg')}
                  alt="Students studying"
                  fill
                  sizes="(max-width: 1024px) 0px, 200px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
