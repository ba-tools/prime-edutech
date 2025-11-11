/**
 * Chatbot Constants
 * Defines acceptable topics, boundaries, and rejection messages for the AI counsellor
 */

// Acceptable topics and keywords
export const ACCEPTABLE_TOPICS = {
  studyAbroad: [
    'university', 'universities', 'college', 'colleges', 'institution',
    'study abroad', 'international education', 'overseas education',
    'program', 'course', 'degree', 'bachelor', 'master', 'phd', 'diploma',
    'admission', 'application', 'apply', 'enroll', 'enrollment',
    'country', 'countries', 'usa', 'uk', 'canada', 'australia', 'europe',
  ],
  visaImmigration: [
    'visa', 'immigration', 'student visa', 'work permit',
    'passport', 'embassy', 'consulate', 'documentation',
    'visa process', 'visa requirements', 'visa application',
  ],
  financial: [
    'scholarship', 'scholarships', 'financial aid', 'funding',
    'tuition', 'fees', 'budget', 'cost', 'loan', 'education loan',
    'bank loan', 'finance', 'expenses', 'accommodation cost',
  ],
  services: [
    'prime edutech', 'consultancy', 'counsellor', 'counselor', 'guidance',
    'help', 'service', 'assistance', 'support', 'consultation',
    'advisor', 'expert', 'agency',
  ],
  admissions: [
    'requirement', 'requirements', 'eligibility', 'qualify',
    'gre', 'gmat', 'toefl', 'ielts', 'sat', 'act',
    'test score', 'language test', 'entrance exam',
    'application process', 'deadlines', 'documents',
  ],
  career: [
    'career', 'job', 'employment', 'work opportunity',
    'job prospects', 'placement', 'internship',
    'post-study work', 'career path',
  ],
};

// Unacceptable topics (automatic rejection)
export const UNACCEPTABLE_TOPICS = {
  generalEducation: [
    'math', 'mathematics', 'calculus', 'algebra', 'geometry',
    'physics', 'chemistry', 'biology', 'history', 'geography',
    'science homework', 'solve equation', 'explain concept',
    'what is photosynthesis', 'how does', 'formula for',
  ],
  offTopic: [
    'joke', 'story', 'poem', 'song', 'recipe',
    'weather', 'sports', 'politics', 'news', 'current events',
    'entertainment', 'movie', 'music', 'celebrity',
    'programming', 'code', 'javascript', 'python',
    'game', 'gaming', 'video game',
  ],
};

// Topic suggestions for rejected queries
export const TOPIC_SUGGESTIONS = `I can only help with questions about:

📚 **Studying Abroad**
   • Universities and programs in different countries
   • Admission requirements and application process
   • Choosing the right country and university

🛂 **Visa & Immigration**
   • Student visa application process
   • Required documentation
   • Embassy procedures

💰 **Financial Planning**
   • Scholarships and financial aid
   • Education loans and funding options
   • Cost of living and tuition fees

🎓 **Prime Edutech Services**
   • How we help students study abroad
   • Our consultancy services
   • Free counselling sessions

Could you rephrase your question to focus on these topics?`;

// Rejection message template
export const OFF_TOPIC_MESSAGE = `I'm specifically designed to help with study abroad and education consultancy questions.

${TOPIC_SUGGESTIONS}`;

// System prompt boundaries (examples)
export const ACCEPTABLE_EXAMPLES = [
  "What are the best universities for engineering in Canada?",
  "How does Prime Edutech help with visa applications?",
  "What are the scholarship options for Indian students?",
  "What documents do I need for a UK student visa?",
  "How much does it cost to study in Australia?",
  "What are the admission requirements for MBA programs?",
];

export const UNACCEPTABLE_EXAMPLES = [
  "Explain photosynthesis to me",
  "What is the quadratic formula?",
  "Tell me a joke",
  "Who won the cricket match?",
  "How do I code in Python?",
  "What's the weather like today?",
];

// Keywords that indicate the AI is refusing/redirecting (for validation)
export const REFUSAL_INDICATORS = [
  'I can only help',
  'I\'m designed to',
  'I specialize in',
  'I focus on',
  'study abroad',
  'education consultancy',
  'outside my scope',
  'not related to',
  'rephrase your question',
];

// Keywords that indicate on-topic response
export const ON_TOPIC_INDICATORS = [
  'university', 'universities', 'college',
  'study', 'abroad', 'international',
  'visa', 'admission', 'application',
  'scholarship', 'program', 'course',
  'country', 'prime edutech',
];
