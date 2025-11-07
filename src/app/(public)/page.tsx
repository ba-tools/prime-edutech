import FeaturesSection from "@/components/layout/FeaturesSection";
import Solutions360 from "@/components/landing/Solutions360";
import Hero from '@/components/landing/Hero';
import StudyAbroadDestinations from '@/components/landing/StudyAbroadDestinations';
import { studyAbroadDestinations } from '@/lib/destinationData';
import StudentTestimonials from '@/components/landing/StudentTestimonials';
import { studentTestimonials } from '@/lib/testimonialsData';
import ReadyToBegin from '@/components/landing/ReadyToBegin';
import FAQSection from '@/components/landing/FAQ';
import { mbbsAbroadFAQs } from '@/lib/faqData';
import WhySection from '@/components/landing/Why';

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
