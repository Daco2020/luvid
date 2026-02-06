/**
 * LocalStorage keys
 */
const LUVID_USER_ID_KEY = "luvid_user_id"; // Internal userId
const LUVID_ID_KEY = "luvid_id"; // Actual Luv ID (e.g., "LUV-ZXZ6OX")

/**
 * Save user's internal userId to localStorage
 */
export function saveUserIdToStorage(userId: string): void {
  try {
    localStorage.setItem(LUVID_USER_ID_KEY, userId);
  } catch (error) {
    console.error("Failed to save userId to localStorage:", error);
  }
}

/**
 * Retrieve user's internal userId from localStorage
 */
export function getUserIdFromStorage(): string | null {
  try {
    return localStorage.getItem(LUVID_USER_ID_KEY);
  } catch (error) {
    console.error("Failed to retrieve userId from localStorage:", error);
    return null;
  }
}

/**
 * Save user's Luv ID to localStorage
 */
export function saveMyLuvIdToStorage(luvId: string): void {
  try {
    localStorage.setItem(LUVID_ID_KEY, luvId);
  } catch (error) {
    console.error("Failed to save Luv ID to localStorage:", error);
  }
}

/**
 * Retrieve user's Luv ID from localStorage
 */
export function getMyLuvIdFromStorage(): string | null {
  try {
    return localStorage.getItem(LUVID_ID_KEY);
  } catch (error) {
    console.error("Failed to retrieve Luv ID from localStorage:", error);
    return null;
  }
}

/**
 * Clear user's Luv ID from localStorage
 */
export function clearMyLuvIdFromStorage(): void {
  try {
    localStorage.removeItem(LUVID_ID_KEY);
  } catch (error) {
    console.error("Failed to clear Luv ID from localStorage:", error);
  }
}

/**
 * Clear all Luv ID related data from localStorage
 */
export function clearAllLuvIdStorage(): void {
  clearMyLuvIdFromStorage();
  try {
    localStorage.removeItem(LUVID_USER_ID_KEY);
  } catch (error) {
    console.error("Failed to clear userId from localStorage:", error);
  }
}
