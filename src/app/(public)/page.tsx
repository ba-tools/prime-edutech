import dynamic from 'next/dynamic';
import FeaturesSection from "@/components/landing/FeaturesSection";
import Solutions360 from "@/components/landing/Solutions360";
import StudyAbroadDestinations from '@/components/landing/StudyAbroadDestinations';
import { studyAbroadDestinations } from '@/lib/destinationData';
import StudentTestimonials from '@/components/landing/StudentTestimonials';
import { studentTestimonials } from '@/lib/testimonialsData';
import FAQSection from '@/components/landing/FAQ';
import { mbbsAbroadFAQs } from '@/lib/faqData';
import WhySection from '@/components/landing/Why';

// Dynamically import animation-heavy components to improve initial bundle size
const Hero = dynamic(() => import('@/components/landing/Hero'), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
});

const ReadyToBegin = dynamic(() => import('@/components/landing/ReadyToBegin'), {
  ssr: true,
  loading: () => (
    <div className="py-16 md:py-24 bg-white flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
});

export default function HomePage() {


  return (
    <>
      {/* Awareness */}
      <Hero />

      {/* Interest */}
      <FeaturesSection />
      <WhySection />

      {/* Desire */}
      <StudyAbroadDestinations
        destinations={studyAbroadDestinations}
        exploreMoreLink="/destinations"
      />
      <Solutions360 />
      <StudentTestimonials
        testimonials={studentTestimonials}
      />
      <FAQSection faqs={mbbsAbroadFAQs} />

      {/* Action */}
      <ReadyToBegin />
    </>
  );
}
