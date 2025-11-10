/**
 * Centralized Landing Page Content
 * All marketing copy, stats, and configuration in one place
 * This structure is CMS-ready and can be easily integrated with headless CMS like Contentful, Sanity, or Keystatic
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface HeroContent {
  badge: {
    text: string;
    showPulse: boolean;
  };
  headline: {
    line1: string;
    line2: string;
    line3: string;
  };
  description: string;
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
      external: boolean;
    };
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  floatingCountries: Array<{
    name: string;
    image: string;
  }>;
}

export interface FeaturesContent {
  badge: string;
  headline: string;
  description: string;
  features: Array<{
    icon: string; // Lucide icon name
    title: string;
  }>;
  cta: {
    text: string;
    href: string;
  };
}

export interface WhyContent {
  badge: string;
  headline: string;
  features: Array<{
    icon: string; // Lucide icon name
    title: string;
    description: string;
  }>;
}

export interface DestinationsContent {
  badge: string;
  headline: string;
  subtitle: string;
  exploreMoreText: string;
  exploreMoreLink: string;
}

export interface Solutions360Content {
  badge: string;
  headline: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
}

export interface TestimonialsContent {
  badge: string;
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaSubtext: string;
}

export interface FAQContent {
  badge: string;
  headline: string;
  subtitle: string;
}

export interface ContactContent {
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  connectText: string;
  footerText: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface LandingPageContent {
  company: CompanyInfo;
  hero: HeroContent;
  features: FeaturesContent;
  why: WhyContent;
  destinations: DestinationsContent;
  solutions360: Solutions360Content;
  testimonials: TestimonialsContent;
  faq: FAQContent;
  contact: ContactContent;
}

// ============================================================================
// CONTENT DATA
// ============================================================================

export const landingPageContent: LandingPageContent = {
  // Company Information
  company: {
    name: "Prime Edutech",
    tagline: "Your trusted partner in international education consulting",
    phone: "+917667432929",
    whatsapp: "917667432929",
    email: "info@primeedutech.com",
    address: "123 Education St, City",
  },

  // Hero Section
  hero: {
    badge: {
      text: "24x7 AI Counsellor",
      showPulse: true,
    },
    headline: {
      line1: "Your Path to",
      line2: "Study Abroad",
      line3: "Starts Here",
    },
    description:
      "We help students find, apply, and enroll in top universities worldwide. Let us guide you through every step of your international education journey.",
    cta: {
      primary: {
        text: "Free Consultation",
        href: "#contact",
      },
      secondary: {
        text: "Whatsapp",
        href: "https://wa.me/917667432929",
        external: true,
      },
    },
    stats: [
      { value: "10K+", label: "Students helped" },
      { value: "10+", label: "Years of Expertise" },
      { value: "50+", label: "Institutions" },
    ],
    floatingCountries: [
      { name: "Kyrgyzstan", image: "/assets/kyrgyzstan.png" },
      { name: "Philippines", image: "/assets/philippines.png" },
      { name: "Russia", image: "/assets/russia.png" },
      { name: "Ukraine", image: "/assets/ukraine.png" },
    ],
  },

  // Features Section
  features: {
    badge: "INTERNATIONAL STUDENTS",
    headline: "Find Your Perfect Study Program",
    description:
      "We've spent a decade perfecting a faster, easier, quality-first international study application process. Now, the world is yours to explore in just a few clicks.",
    features: [
      {
        icon: "BookOpen",
        title: "Easily apply to multiple programs",
      },
      {
        icon: "Grid3x3",
        title: "Find your perfect program from 140,000+ options in five top destinations",
      },
      {
        icon: "BarChart3",
        title: "Get a higher chance of success with quality checks and AI technology",
      },
    ],
    cta: {
      text: "Try It Today",
      href: "#contact",
    },
  },

  // Why Section
  why: {
    badge: "WHY CHOOSE US",
    headline: "Your Success is Our Mission",
    features: [
      {
        icon: "Target",
        title: "Personalized Guidance",
        description: "One-on-one counseling tailored to your academic goals and preferences",
      },
      {
        icon: "Shield",
        title: "Trusted Process",
        description: "Transparent, reliable, and proven admission process with no hidden fees",
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick turnaround times for applications and visa processing",
      },
    ],
  },

  // Destinations Section
  destinations: {
    badge: "INTERNATIONAL STUDIES",
    headline: "Study Abroad from Top Destination",
    subtitle: "Discover everything you need to know about your dream study destination abroad!",
    exploreMoreText: "Explore All Destinations",
    exploreMoreLink: "/destinations",
  },

  // Solutions 360 Section
  solutions360: {
    badge: "360 SOLUTIONS",
    headline: "Find Every Solution, From Applications to Accommodations",
    description:
      "Access our full 360 Solutions, covering everything from application to arrival. Get instant language test vouchers, explore financial services, and invest in your future with flexible student loans. It's all here.",
    cta: {
      text: "Register Now",
      href: "/register",
    },
  },

  // Testimonials Section
  testimonials: {
    badge: "SUCCESS STORIES",
    headline: "What Our Students Say",
    subtitle: "Real success stories from students who achieved their dreams with our guidance",
    ctaText: "Start Your Journey",
    ctaSubtext: "Ready to become our next success story?",
  },

  // FAQ Section
  faq: {
    badge: "FREQUENTLY ASKED QUESTIONS",
    headline: "Got Questions? We've Got Answers",
    subtitle: "Find answers to common questions about studying MBBS abroad",
  },

  // Contact/Ready to Begin Section
  contact: {
    headline: "Get Ready to Begin Your Journey",
    subtitle: "Explore more, stay informed, and start your journey to academic excellence.",
    ctaText: "Start Now",
    ctaLink: "https://wa.me/917667432929",
    connectText: "Connect with us:",
    footerText: "Join thousands of successful students already pursuing their dreams abroad.",
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get content for a specific section
 */
export function getSectionContent<K extends keyof LandingPageContent>(
  section: K
): LandingPageContent[K] {
  return landingPageContent[section];
}

/**
 * Get company info
 */
export function getCompanyInfo(): CompanyInfo {
  return landingPageContent.company;
}

/**
 * Get WhatsApp link
 */
export function getWhatsAppLink(): string {
  return `https://wa.me/${landingPageContent.company.whatsapp}`;
}

/**
 * Validate landing page content structure
 * Useful for CMS integration to ensure data integrity
 */
export function validateLandingContent(content: unknown): content is LandingPageContent {
  const data = content as LandingPageContent;
  return !!(
    data &&
    data.company &&
    data.hero &&
    data.features &&
    data.why &&
    data.destinations &&
    data.solutions360 &&
    data.testimonials &&
    data.faq &&
    data.contact
  );
}
