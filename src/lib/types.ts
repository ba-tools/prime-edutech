// User Profile Types
export type LookingAs = "self" | "parents" | "other";
export type LevelOfStudy = "masters" | "bachelors" | "diploma";
export type FieldOfStudy = "medical" | "engineering" | "law" | "science" | "arts" | "business";

export interface UserProfile {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  lookingAs: LookingAs;
  levelOfStudy: LevelOfStudy;
  countries: string[];
  fieldOfStudy: FieldOfStudy;
  programOfStudy: string;
  budget: number; // in INR
  createdAt?: Date;
  updatedAt?: Date;
}

// Lead Types
export interface Lead {
  id?: string;
  userProfile: UserProfile;
  toolAccessed: "course-finder" | "counsellor" | "scholarship-test";
  action: string; // e.g., "expressed_interest", "initiated_chat", "completed_test"
  actionData?: Record<string, any>; // Tool-specific data
  createdAt?: Date;
  updatedAt?: Date;
}

// Course Types
export interface Course {
  id: string;
  name: string;
  university: string;
  country: string;
  field: FieldOfStudy;
  program: string;
  level: LevelOfStudy;
  duration: string; // e.g., "2 years"
  fees: number; // in INR
  description: string;
  requirements?: string[];
  intakeMonths?: string[];
}

// Scholarship Types
export interface Scholarship {
  id: string;
  name: string;
  type: string;
  amount: number; // in INR
  criteria: string[];
  description: string;
  link?: string;
}

// Form Data Types
export interface FormStep1Data {
  name: string;
  phone: string;
  email?: string;
  lookingAs: LookingAs;
}

export interface FormStep2Data {
  levelOfStudy: LevelOfStudy;
}

export interface FormStep3Data {
  countries: string[];
}

export interface FormStep4Data {
  fieldOfStudy: FieldOfStudy;
  programOfStudy: string;
}

export interface FormStep5Data {
  budget: number;
}

export interface FormData extends FormStep1Data, FormStep2Data, FormStep3Data, FormStep4Data, FormStep5Data {}

// Chat Types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatConversation {
  id: string;
  userProfile: UserProfile;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation?: string;
}

export interface QuizAttempt {
  id?: string;
  userProfile: UserProfile;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  score: number;
  totalQuestions: number;
  createdAt?: Date;
}

// Interest Tracking Types
export interface CourseInterest {
  id?: string;
  userProfile: UserProfile;
  courseId: string;
  courseName: string;
  createdAt?: Date;
}
