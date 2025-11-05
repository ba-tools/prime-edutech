import { UserProfile } from "./types";

const STORAGE_KEY = "prime_user_profile";
const STORAGE_TIMESTAMP_KEY = "prime_user_profile_timestamp";
const STORAGE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Save user profile to localStorage with timestamp
 */
export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;

  try {
    const timestamp = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    localStorage.setItem(STORAGE_TIMESTAMP_KEY, timestamp.toString());
  } catch (error) {
    console.error("Error saving user profile to localStorage:", error);
  }
}

/**
 * Get user profile from localStorage
 * Returns null if not found or expired (>24 hours)
 */
export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;

  try {
    const profile = localStorage.getItem(STORAGE_KEY);
    const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);

    if (!profile || !timestamp) {
      return null;
    }

    const storedTime = parseInt(timestamp, 10);
    const currentTime = Date.now();
    const timeDiff = currentTime - storedTime;

    // Check if data has expired (older than 24 hours)
    if (timeDiff > STORAGE_DURATION) {
      clearUserProfile();
      return null;
    }

    return JSON.parse(profile) as UserProfile;
  } catch (error) {
    console.error("Error retrieving user profile from localStorage:", error);
    return null;
  }
}

/**
 * Check if user profile exists and is not expired
 */
export function hasUserProfile(): boolean {
  return getUserProfile() !== null;
}

/**
 * Clear user profile from localStorage
 */
export function clearUserProfile(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
  } catch (error) {
    console.error("Error clearing user profile from localStorage:", error);
  }
}

/**
 * Update specific fields in user profile
 */
export function updateUserProfile(
  updates: Partial<UserProfile>
): UserProfile | null {
  const currentProfile = getUserProfile();

  if (!currentProfile) {
    return null;
  }

  const updatedProfile = { ...currentProfile, ...updates };
  saveUserProfile(updatedProfile);
  return updatedProfile;
}

/**
 * Get remaining time until profile expires (in milliseconds)
 * Returns -1 if profile doesn't exist or has expired
 */
export function getProfileExpiryTime(): number {
  if (typeof window === "undefined") return -1;

  try {
    const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);

    if (!timestamp) {
      return -1;
    }

    const storedTime = parseInt(timestamp, 10);
    const currentTime = Date.now();
    const timeDiff = currentTime - storedTime;
    const remainingTime = STORAGE_DURATION - timeDiff;

    return remainingTime > 0 ? remainingTime : -1;
  } catch (error) {
    console.error("Error getting profile expiry time:", error);
    return -1;
  }
}
