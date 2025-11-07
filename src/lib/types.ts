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

// Quiz Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation?: string;
}
