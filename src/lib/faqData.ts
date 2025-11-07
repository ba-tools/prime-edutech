/**
 * FAQ Data for the Landing Page
 * Questions and answers about studying MBBS abroad
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

/**
 * Main FAQ data - 8 questions about MBBS abroad
 */
export const mbbsAbroadFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Who is eligible to study MBBS abroad?',
    answer:
      'Any Indian student who has completed 10+2 with Physics, Chemistry, and Biology (minimum 50% for General and 40% for OBC/SC/ST) and has qualified NEET can apply. English must be a compulsory subject.',
    category: 'Eligibility',
  },
  {
    id: 'faq-2',
    question: 'Is MBBS abroad recognized in India?',
    answer:
      'Yes. Degrees from MCI/NMC-approved foreign universities are recognized. Graduates must clear the FMGE (Screening Test) to practice in India.',
    category: 'Recognition',
  },
  {
    id: 'faq-3',
    question: 'Can I practice in India after studying abroad?',
    answer:
      'Yes. After returning, you need to pass the MCI Screening Test (FMGE) and register with the State or Indian Medical Council to begin practicing legally.',
    category: 'Practice',
  },
  {
    id: 'faq-4',
    question: 'What is the total cost of studying MBBS abroad?',
    answer:
      'The total expense (including tuition, hostel, and food) varies by country and university but usually ranges between ₹15–30 lakhs for the full course — much lower than private colleges in India.',
    category: 'Costs',
  },
  {
    id: 'faq-5',
    question: 'Is it safe for Indian students to study abroad?',
    answer:
      'Yes. All partner countries have good safety records and large Indian student communities. Universities provide secure hostels, and senior students or local representatives assist newcomers.',
    category: 'Safety',
  },
  {
    id: 'faq-6',
    question: 'What is the medium of instruction?',
    answer:
      'All courses are taught in English. Local language classes are also offered for communication and patient interaction.',
    category: 'Academics',
  },
  {
    id: 'faq-7',
    question: 'How do I get admission?',
    answer:
      "Submit your 10th & 12th marksheets and registration fee. After your application and visa process are completed, you'll receive a confirmed admission letter and travel schedule.",
    category: 'Admission',
  },
  {
    id: 'faq-8',
    question: 'Are there any donations or capitation fees?',
    answer:
      'No. Admissions are purely merit-based and transparent — no donation or capitation fees are required.',
    category: 'Admission',
  },
];

/**
 * Helper function to get FAQs by category
 * Example: getFAQsByCategory('Eligibility')
 */
export function getFAQsByCategory(category: string): FAQ[] {
  return mbbsAbroadFAQs.filter((faq) => faq.category === category);
}

/**
 * Helper function to get all FAQ categories
 */
export function getAllFAQCategories(): string[] {
  const categories = new Set(
    mbbsAbroadFAQs.map((faq) => faq.category).filter((c): c is string => Boolean(c))
  );
  return Array.from(categories);
}

/**
 * Helper function to search FAQs
 * Example: searchFAQs('cost')
 */
export function searchFAQs(query: string): FAQ[] {
  const lowerQuery = query.toLowerCase();
  return mbbsAbroadFAQs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Export all FAQs as default
 */
export const faqs = mbbsAbroadFAQs;
