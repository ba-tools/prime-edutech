'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Gift, Award, Users, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetUrl } from '@/lib/assets';
import './globals.css';

// Types
interface FormData {
  countries: string[];
  fieldOfStudy: string;
  programOfStudy: string;
  budget: number;
  name: string;
  phone: string;
  email: string;
  lookingFor: string;
}

// Constants
const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
];

const FIELDS_OF_STUDY = [
  'Engineering',
  'Science',
  'Medicine',
  'Law',
  'Business',
  'Arts',
];

const PROGRAMS: Record<string, string[]> = {
  Engineering: ["Bachelor's", "Master's", 'Diploma'],
  Science: ["Bachelor's", "Master's", 'PhD', 'Diploma'],
  Medicine: ["Bachelor's", "Master's", 'MD', 'Diploma'],
  Law: ["Bachelor's", "Master's", 'LLM'],
  Business: ["Bachelor's", "Master's", 'MBA', 'Diploma'],
  Arts: ["Bachelor's", "Master's", 'MFA', 'Diploma'],
};

const TOTAL_STEPS = 4;

// Custom Select Component
function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-3 border-2 rounded-lg text-left flex items-center justify-between transition-colors ${
          disabled
            ? 'bg-gray-100 border-gray-200 cursor-not-allowed text-gray-500'
            : 'bg-white border-gray-200 hover:border-gray-300 focus:border-primary focus:outline-none'
        }`}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors ${
                    value === option.value
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RequestCallbackPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [hasInteractedWithSlider, setHasInteractedWithSlider] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    countries: [],
    fieldOfStudy: '',
    programOfStudy: '',
    budget: 2500000, // Default 25 lakhs
    name: '',
    phone: '',
    email: '',
    lookingFor: '',
  });

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // Reset slider interaction when entering step 3
      if (nextStep === 3) {
        setHasInteractedWithSlider(false);
      }
    } else {
      // Submit form
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to save lead');
        }

        const data = await response.json();
        setSessionId(data.sessionId);

        // Store sessionId in localStorage for chat page access
        localStorage.setItem('ai-counsellor-session', data.sessionId);

        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      // Reset slider interaction when entering step 3
      if (prevStep === 3) {
        setHasInteractedWithSlider(false);
      }
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.countries.length > 0;
      case 2:
        return formData.fieldOfStudy && formData.programOfStudy;
      case 3:
        return hasInteractedWithSlider;
      case 4:
        return formData.name && formData.phone; // Only name and phone are mandatory
      default:
        return false;
    }
  };

  if (isSubmitted && sessionId) {
    return <ConfirmationPage />;
  }

  return (
    <div
      className="min-h-screen flex flex-col relative onboarding-bg"
      style={{
        backgroundImage: `url(${getAssetUrl('/assets/bg.svg')})`,
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-indigo-500/10 pointer-events-none" />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Header - Fixed */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src={getAssetUrl('/assets/logo.png')} alt="Prime Edutech" height={100} width={200} />
          </Link>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl"
        >
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Card Header - Progress */}
            <div className="bg-gradient-to-r from-primary to-indigo-700 text-white p-6">
              <div className="flex items-center justify-end mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {currentStep}/{TOTAL_STEPS}
                </span>
              </div>

              {/* Progress Bars */}
              <div className="flex gap-2">
                {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 h-2 rounded-full overflow-hidden bg-white/20"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: index < currentStep ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Card Body - Form Steps */}
            <div className="p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <Step1Countries
                    key="step1"
                    selectedCountries={formData.countries}
                    onSelect={(countries) =>
                      setFormData({ ...formData, countries })
                    }
                  />
                )}
                {currentStep === 2 && (
                  <Step2Study
                    key="step2"
                    fieldOfStudy={formData.fieldOfStudy}
                    programOfStudy={formData.programOfStudy}
                    onFieldChange={(field) =>
                      setFormData({ ...formData, fieldOfStudy: field, programOfStudy: '' })
                    }
                    onProgramChange={(program) =>
                      setFormData({ ...formData, programOfStudy: program })
                    }
                  />
                )}
                {currentStep === 3 && (
                  <Step3Budget
                    key="step3"
                    budget={formData.budget}
                    onBudgetChange={(budget) => {
                      setFormData({ ...formData, budget });
                      setHasInteractedWithSlider(true);
                    }}
                  />
                )}
                {currentStep === 4 && (
                  <Step4PersonalInfo
                    key="step4"
                    data={{
                      name: formData.name,
                      phone: formData.phone,
                      email: formData.email,
                      lookingFor: formData.lookingFor,
                    }}
                    onChange={(field, value) =>
                      setFormData({ ...formData, [field]: value })
                    }
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Card Footer - Navigation */}
            <div className="border-t p-6 bg-gray-50 flex gap-4">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                {isSubmitting ? 'Submitting...' : currentStep === TOTAL_STEPS ? 'Submit' : 'Continue'}
                {!isSubmitting && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white/95 backdrop-blur-sm border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © 2025 Prime Edutech. All rights reserved.
        </div>
      </footer>
      </div>
    </div>
  );
}

// Step 1: Country Selection
function Step1Countries({
  selectedCountries,
  onSelect,
}: {
  selectedCountries: string[];
  onSelect: (countries: string[]) => void;
}) {
  const toggleCountry = (code: string) => {
    if (selectedCountries.includes(code)) {
      onSelect(selectedCountries.filter((c) => c !== code));
    } else {
      onSelect([...selectedCountries, code]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-bold mb-6">Which countries are you interested in?</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {COUNTRIES.map((country) => {
          const isSelected = selectedCountries.includes(country.code);
          return (
            <motion.button
              key={country.code}
              onClick={() => toggleCountry(country.code)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${isSelected
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="text-4xl mb-2">{country.flag}</div>
              <div className="text-sm font-medium text-gray-900 text-center">{country.name}</div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// Step 2: Study Field & Program
function Step2Study({
  fieldOfStudy,
  programOfStudy,
  onFieldChange,
  onProgramChange,
}: {
  fieldOfStudy: string;
  programOfStudy: string;
  onFieldChange: (field: string) => void;
  onProgramChange: (program: string) => void;
}) {
  const fieldOptions = FIELDS_OF_STUDY.map((field) => ({
    value: field,
    label: field,
  }));

  const programOptions = fieldOfStudy
    ? PROGRAMS[fieldOfStudy]?.map((program) => ({
        value: program,
        label: program,
      })) || []
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-bold mb-2">What would you like to study?</h3>
      <p className="text-gray-600 mb-6">Select your field and program</p>

      <div className="space-y-6">
        {/* Field of Study */}
        <div>
          <label className="block text-sm font-semibold mb-2">Field of Study</label>
          <CustomSelect
            value={fieldOfStudy}
            onChange={onFieldChange}
            options={fieldOptions}
            placeholder="Select a field..."
          />
        </div>

        {/* Program of Study */}
        <div>
          <label className="block text-sm font-semibold mb-2">Program of Study</label>
          <CustomSelect
            value={programOfStudy}
            onChange={onProgramChange}
            options={programOptions}
            placeholder={fieldOfStudy ? 'Select a program...' : 'Select field first...'}
            disabled={!fieldOfStudy}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Step 3: Budget Slider
function Step3Budget({
  budget,
  onBudgetChange,
}: {
  budget: number;
  onBudgetChange: (budget: number) => void;
}) {
  const formatBudget = (value: number) => {
    const lakhs = value / 100000;
    if (lakhs >= 100) {
      return `₹${(lakhs / 100).toFixed(1)} Cr`;
    }
    return `₹${lakhs.toFixed(0)} L`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-bold mb-2">Approximate budget for your study?</h3>
      <p className="text-gray-600 mb-8">Slide to set your budget range</p>

      <div className="px-4">
        {/* Budget Display */}
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-primary mb-2">
            {formatBudget(budget)}
          </div>
          <div className="text-sm text-gray-600">Total estimated budget</div>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min="500000"
            max="10000000"
            step="100000"
            value={budget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((budget - 500000) / (10000000 - 500000)) * 100
                }%, #e5e7eb ${((budget - 500000) / (10000000 - 500000)) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>₹5L</span>
            <span>₹1Cr</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Step 4: Personal Information
function Step4PersonalInfo({
  data,
  onChange,
}: {
  data: { name: string; phone: string; email: string; lookingFor: string };
  onChange: (field: string, value: string) => void;
}) {
  const lookingForOptions = [
    { value: 'self', label: 'Myself' },
    { value: 'child', label: 'My Child' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-2xl font-bold mb-2">A little about yourself?</h3>
      <p className="text-gray-600 mb-6">Help us personalize your experience</p>

      <div className="space-y-4">
        {/* First Row: Name & Looking for */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Looking for <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <CustomSelect
              value={data.lookingFor}
              onChange={(value) => onChange('lookingFor', value)}
              options={lookingForOptions}
              placeholder="Select..."
            />
          </div>
        </div>

        {/* Second Row: Phone & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Email Address <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Confirmation Page
function ConfirmationPage() {
  return (
    <div
      className="min-h-screen flex flex-col relative onboarding-bg"
      style={{
        backgroundImage: `url(${getAssetUrl('/assets/bg.svg')})`,
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white/80 to-indigo-100/50 pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src={getAssetUrl('/assets/logo.png')} alt="Prime Edutech" height={100} width={200} />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-3xl"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            {/* Success Message */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
              >
                <Check className="w-10 h-10 text-green-600" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Congratulations! 🎉
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                You have unlocked your personalised offer with exclusive benefits designed just for you!
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-center mb-6">Your exclusive benefits:</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Benefit 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-500 rounded-full mb-4">
                    <Gift className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">$500 Cashback</h3>
                  <p className="text-sm text-green-700">for early applicants</p>
                </motion.div>

                {/* Benefit 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full mb-4">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">Scholarship</h3>
                  <p className="text-sm text-blue-700">matched to your profile</p>
                </motion.div>

                {/* Benefit 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-500 rounded-full mb-4">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-2">Free 1:1 Session</h3>
                  <p className="text-sm text-purple-700">with your personal education advisor</p>
                </motion.div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/ai-counsellor"
                className="flex-1 px-8 py-4 bg-gradient-to-r from-primary to-indigo-700 text-white rounded-lg font-semibold text-center hover:shadow-xl transition-all"
              >
                Chat with AI Counsellor
              </Link>
              <Link
                href="/#contact"
                className="flex-1 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-center hover:bg-primary hover:text-white transition-all"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          © 2025 Prime Edutech. All rights reserved.
        </div>
      </footer>
      </div>
    </div>
  );
}
