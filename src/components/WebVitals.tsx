'use client';

import { useEffect } from 'react';
import { onCLS, onLCP, onINP, onFCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Web Vitals monitoring component
 * Tracks Core Web Vitals and sends them to console (can be extended to send to analytics)
 */
export function WebVitals() {
  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          navigationType: metric.navigationType,
        });
      }

      // Send to analytics service (Google Analytics, Vercel Analytics, etc.)
      // Example for Google Analytics:
      // window.gtag?.('event', metric.name, {
      //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      //   metric_id: metric.id,
      //   metric_value: metric.value,
      //   metric_delta: metric.delta,
      //   metric_rating: metric.rating,
      // });

      // Example for custom endpoint:
      // fetch('/api/analytics/web-vitals', {
      //   method: 'POST',
      //   body: JSON.stringify(metric),
      //   headers: { 'Content-Type': 'application/json' },
      //   keepalive: true,
      // });
    };

    // Core Web Vitals
    onLCP(handleMetric); // Largest Contentful Paint
    onCLS(handleMetric); // Cumulative Layout Shift
    onINP(handleMetric); // Interaction to Next Paint (replaces FID)

    // Additional metrics
    onFCP(handleMetric); // First Contentful Paint
    onTTFB(handleMetric); // Time to First Byte
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Thresholds for Core Web Vitals
 * Good: Green zone
 * Needs Improvement: Yellow zone
 * Poor: Red zone
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },  // Largest Contentful Paint (ms)
  FID: { good: 100, poor: 300 },    // First Input Delay (ms)
  CLS: { good: 0.1, poor: 0.25 },   // Cumulative Layout Shift (score)
  INP: { good: 200, poor: 500 },    // Interaction to Next Paint (ms)
  FCP: { good: 1800, poor: 3000 },  // First Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 },  // Time to First Byte (ms)
};
