/**
 * Social Media Links Configuration
 * These links are used in the ReadyToBegin component
 * Easily customizable for your business needs
 */

import React from 'react';

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  color?: string;
  label?: string;
}

// Icons component (without React dependencies - just SVG strings)
export const SocialIcons: Record<string, React.ReactNode> = {
  whatsapp: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-green-500"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  ),

  email: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-blue-500"
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),

  phone: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-indigo-500"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),

  instagram: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-pink-500"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
    </svg>
  ),

  facebook: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-blue-600"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),

  linkedin: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-blue-700"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.424-.103.249-.129.597-.129.946v5.435h-3.554s.047-8.81 0-9.728h3.554v1.375c.427-.659 1.19-1.598 2.898-1.598 2.117 0 3.704 1.383 3.704 4.357v5.594zM5.337 9.433c-1.144 0-1.915-.759-1.915-1.71 0-.951.77-1.71 1.954-1.71 1.185 0 1.915.759 1.915 1.71 0 .951-.73 1.71-1.954 1.71zm1.6 11.019H3.738V8.704h3.199v11.748zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
    </svg>
  ),

  twitter: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-blue-400"
    >
      <path d="M23.953 4.57a10 10 0 002.856-3.915 10 10 0 01-2.856.973 5 5 0 00-8.618-3.487 5.009 5.009 0 00-1.61 5.218A14.95 14.95 0 012.5 4.5a5 5 0 001.55 6.684A5 5 0 01.5 9.016v.063a5 5 0 004.007 4.905 5 5 0 01-2.251.086 5 5 0 004.667 3.476 10.004 10.004 0 01-6.169 2.126 14.95 14.95 0 008.094 2.369c9.713 0 15.013-8.058 15.013-15.037 0-.23-.005-.46-.015-.69A10.744 10.744 0 0024 4.59z"/>
    </svg>
  ),

  youtube: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-red-600"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
};

/**
 * Default social media links
 * Update these with your actual contact information
 */
export const defaultSocialLinks = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://wa.me/917667432929',
    icon: SocialIcons.whatsapp,
    color: 'hover:text-green-500',
    label: 'Chat with us on WhatsApp',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:contact@educonsult.com',
    icon: SocialIcons.email,
    color: 'hover:text-blue-500',
    label: 'Send us an email',
  },
  {
    id: 'phone',
    name: 'Phone',
    url: 'tel:+917667432929',
    icon: SocialIcons.phone,
    color: 'hover:text-indigo-500',
    label: 'Call us',
  },
];

/**
 * Extended social links (all available)
 * Pick and choose which ones you want to use
 */
export const allAvailableSocialLinks = [
  ...defaultSocialLinks,
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/yourusername',
    icon: SocialIcons.instagram,
    color: 'hover:text-pink-500',
    label: 'Follow us on Instagram',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/yourpage',
    icon: SocialIcons.facebook,
    color: 'hover:text-blue-600',
    label: 'Like us on Facebook',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/yourcompany',
    icon: SocialIcons.linkedin,
    color: 'hover:text-blue-700',
    label: 'Connect on LinkedIn',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/yourhandle',
    icon: SocialIcons.twitter,
    color: 'hover:text-blue-400',
    label: 'Follow us on Twitter',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/yourchannel',
    icon: SocialIcons.youtube,
    color: 'hover:text-red-600',
    label: 'Subscribe on YouTube',
  },
];

/**
 * Quick setup: Copy and paste this to customize your links
 *
 * import { SocialIcons } from '@/lib/socialMediaLinks';
 *
 * const customSocialLinks = [
 *   {
 *     id: 'whatsapp',
 *     name: 'WhatsApp',
 *     url: 'https://wa.me/YOUR_NUMBER',
 *     icon: SocialIcons.whatsapp,
 *     color: 'hover:text-green-500',
 *   },
 *   // ... add more as needed
 * ];
 *
 * Then use in component:
 * <ReadyToBegin socialLinks={customSocialLinks} />
 */
