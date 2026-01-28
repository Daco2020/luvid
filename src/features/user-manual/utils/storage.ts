import { UserManualStorage, userManualStorageSchema } from "../model/section1-schema";

export const STORAGE_KEY = "luvid_user_manual_v1";

/**
 * 로컬스토리지에서 사용자 데이터 불러오기
 */
export function loadUserManual(): UserManualStorage | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);
    const validated = userManualStorageSchema.parse(parsed);
    return validated;
  } catch (error) {
    console.error("Failed to load user manual from localStorage:", error);
    return null;
  }
}

/**
 * 로컬스토리지에 사용자 데이터 저장
 */
export function saveUserManual(data: UserManualStorage): void {
  try {
    const validated = userManualStorageSchema.parse(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
  } catch (error) {
    console.error("Failed to save user manual to localStorage:", error);
    throw error;
  }
}

/**
 * 새로운 사용자 매뉴얼 초기화
 */
export function initializeUserManual(): UserManualStorage {
  const data: UserManualStorage = {
    version: "1.0",
    userId: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
  };
  
  saveUserManual(data);
  return data;
}

/**
 * 로컬스토리지 데이터 삭제
 */
export function clearUserManual(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * 진행률 계산
 */
export function calculateProgress(data: UserManualStorage): number {
  let completed = 0;
  const total = 3; // 총 3개 섹션

  if (data.section1?.completed) completed++;
  // section2, section3는 나중에 추가

  return Math.round((completed / total) * 100);
}
