/**
 * Unified animation configuration for landing page components
 * Provides consistent scroll reveal animations across the site
 */

import { Variants } from 'framer-motion';

// Standard viewport configuration for scroll-triggered animations
export const standardViewport = {
  once: true,
  margin: '-50px', // Trigger slightly before element enters viewport
};

// Standard animation durations
export const DURATIONS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
};

// Standard delays
export const DELAYS = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.3,
};

/**
 * Container animation with staggered children
 * Use this for parent elements containing multiple animated items
 */
export const containerVariants = (prefersReducedMotion: boolean): Variants => {
  if (prefersReducedMotion) {
    return { hidden: {}, visible: {} };
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
};

/**
 * Fade in from below - primary text reveal pattern
 * Consistent y-offset of 20px for all text blocks
 */
export const fadeInUp = (prefersReducedMotion: boolean, customDelay = 0): Variants => {
  if (prefersReducedMotion) {
    return { hidden: {}, visible: {} };
  }

  return {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.normal,
        delay: customDelay,
        ease: 'easeOut',
      },
    },
  };
};

/**
 * Fade in from above - for headers and titles
 */
export const fadeInDown = (prefersReducedMotion: boolean, customDelay = 0): Variants => {
  if (prefersReducedMotion) {
    return { hidden: {}, visible: {} };
  }

  return {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.normal,
        delay: customDelay,
        ease: 'easeOut',
      },
    },
  };
};

/**
 * Fade in from left
 */
export const fadeInLeft = (prefersReducedMotion: boolean, customDelay = 0): Variants => {
  if (prefersReducedMotion) {
    return { hidden: {}, visible: {} };
  }

  return {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: DURATIONS.normal,
        delay: customDelay,
        ease: 'easeOut',
      },
    },
  };
};

/**
 * Fade in from right
 */
export const fadeInRight = (prefersReducedMotion: boolean, customDelay = 0): Variants => {
  if (prefersReducedMotion) {
    return { hidden: {}, visible: {} };
  }

  return {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: DURATIONS.normal,
        delay: customDelay,
        ease: 'easeOut',
      },
    },
  };
};

/**
 * Simple fade in - no translation
 */
export const fadeIn = (prefersReducedMotion: boolean, customDelay = 0): Variants => {
  if (prefersReducedMotion) {
    return { hidden: {}, visible: {} };
  }

  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: DURATIONS.normal,
        delay: customDelay,
        ease: 'easeOut',
      },
    },
  };
};

/**
 * Scale + fade in - for images and cards
 */
export const scaleIn = (prefersReducedMotion: boolean, customDelay = 0): Variants => {
  if (prefersReducedMotion) {
    return { hidden: {}, visible: {} };
  }

  return {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: DURATIONS.slow,
        delay: customDelay,
        ease: 'easeOut',
      },
    },
  };
};

/**
 * Item variant for use within staggered containers
 * This is the child variant that pairs with containerVariants
 */
export const itemVariants = (prefersReducedMotion: boolean): Variants => {
  if (prefersReducedMotion) {
    return { hidden: {}, visible: {} };
  }

  return {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.normal,
        ease: 'easeOut',
      },
    },
  };
};
