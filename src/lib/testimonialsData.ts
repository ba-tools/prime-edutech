/**
 * Student Testimonials Data
 * This file contains sample testimonials that can be:
 * 1. Used as-is with default data
 * 2. Replaced with data fetched from an API/CMS
 * 3. Updated with real student testimonials
 */

export interface Testimonial {
  id: string;
  studentName: string;
  universityName: string;
  text: string;
  image: string;
  rating?: number; // 1-5 stars
  country?: string; // Optional: Country of study
  program?: string; // Optional: Program/Course name
  admissionYear?: number; // Optional: Year of admission
}

export const studentTestimonials: Testimonial[] = [
  {
    id: '1',
    studentName: 'Priya Sharma',
    universityName: 'University of Edinburgh, UK',
    text: 'The guidance provided was exceptional. They helped me navigate the entire application process smoothly and secured my admission to my dream university. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
    rating: 5,
    country: 'United Kingdom',
    program: 'MSc Computer Science',
    admissionYear: 2023,
  },
  {
    id: '2',
    studentName: 'Arjun Patel',
    universityName: 'University of Toronto, Canada',
    text: 'Excellent support throughout my journey. The counselors understood my goals and provided personalized advice. My admission was secured faster than expected!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    rating: 5,
    country: 'Canada',
    program: 'MBA',
    admissionYear: 2023,
  },
  {
    id: '3',
    studentName: 'Neha Singh',
    universityName: 'Humboldt University, Germany',
    text: 'Outstanding service! They made the complex visa and application process so simple. I got admitted and my visa approved within 4 months. Best decision ever!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
    rating: 5,
    country: 'Germany',
    program: 'MSc Environmental Science',
    admissionYear: 2024,
  },
  {
    id: '4',
    studentName: 'Rahul Verma',
    universityName: 'Universitat Autònoma de Barcelona, Spain',
    text: 'Their AI course finder tool is incredible! It matched me with the perfect program in Spain. The entire team was supportive and responsive throughout.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
    rating: 5,
    country: 'Spain',
    program: 'MSc Data Science',
    admissionYear: 2023,
  },
  {
    id: '5',
    studentName: 'Ananya Gupta',
    universityName: 'National University of Singapore',
    text: 'From course selection to final enrollment, every step was handled professionally. I am now pursuing my dream degree in Singapore. Thank you!',
    image: 'https://images.unsplash.com/photo-1507038957-40169c1b8e6c?w=500&h=500&fit=crop',
    rating: 5,
    country: 'Singapore',
    program: 'MEng Chemical Engineering',
    admissionYear: 2024,
  },
  {
    id: '6',
    studentName: 'Vikram Desai',
    universityName: 'University of Amsterdam, Netherlands',
    text: 'The instant counselor feature helped me get answers to my doubts 24/7. Combined with expert human guidance, my journey was seamless and stress-free.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
    rating: 5,
    country: 'Netherlands',
    program: 'MSc Business Administration',
    admissionYear: 2023,
  },
  {
    id: '7',
    studentName: 'Kavya Iyer',
    universityName: 'University College London, UK',
    text: 'Everything was transparent and well-organized. They guided me through every challenge and made my admission to UCL possible. Fantastic team!',
    image: 'https://images.unsplash.com/photo-1517330745675-c6428eaf7a6f?w=500&h=500&fit=crop',
    rating: 4,
    country: 'United Kingdom',
    program: 'LLM International Law',
    admissionYear: 2024,
  },
  {
    id: '8',
    studentName: 'Aman Kumar',
    universityName: 'RWTH Aachen University, Germany',
    text: 'The application support was thorough and detailed. They helped perfect my statement of purpose and essays. Now I am at my dream university!',
    image: 'https://images.unsplash.com/photo-1499378149411-f49db12ff774?w=500&h=500&fit=crop',
    rating: 5,
    country: 'Germany',
    program: 'MSc Mechanical Engineering',
    admissionYear: 2023,
  },
  {
    id: '9',
    studentName: 'Shreya Menon',
    universityName: 'University of Melbourne, Australia',
    text: 'The entire experience was delightful. From initial consultation to post-admission support, they stood by me. Highly grateful for their expertise!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
    rating: 5,
    country: 'Australia',
    program: 'MSc Biomedical Engineering',
    admissionYear: 2024,
  },
];
