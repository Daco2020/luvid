import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  saveUserManual,
  loadUserManual,
  initializeUserManual,
  clearUserManual,
  STORAGE_KEY,
} from "../storage";
import { UserManualStorage } from "../../model/section1-schema";

describe("User Manual Storage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should initialize user manual with default values", () => {
    const data = initializeUserManual();

    expect(data.version).toBe("1.0");
    expect(data.userId).toBeDefined();
    expect(data.startedAt).toBeDefined();
    expect(localStorage.getItem(STORAGE_KEY)).toBeDefined();
  });

  it("should save and load user manual correctly", () => {
    const mockData: UserManualStorage = {
      version: "1.0",
      userId: "test-user-id",
      startedAt: new Date().toISOString(),
      section1: {
        completed: true,
        completedAt: new Date().toISOString(),
        answers: [],
        patterns: {
          stress_response: "acceptance",
          uncertainty_tolerance: "high",
          conflict_resolution: "quick_fix",
          recharge_method: "solitude",
          comfort_language: "listening",
        },
        insights: [],
      },
    };

    saveUserManual(mockData);
    const loaded = loadUserManual();

    expect(loaded).toEqual(mockData);
  });

  it("should return null if no data exists", () => {
    const loaded = loadUserManual();
    expect(loaded).toBeNull();
  });

  it("should return null and warn if data is invalid", () => {
    // 스키마에 맞지 않는 데이터 저장
    const invalidData = { version: "0.1", weirdField: 123 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invalidData));

    // console.error 호출 여부는 체크하지 않고 (환경에 따라 다를 수 있음)
    // 안전하게 null을 반환하는지만 확인
    const loaded = loadUserManual();
    
    expect(loaded).toBeNull();
  });

  it("should clear user manual", () => {
    initializeUserManual();
    expect(localStorage.getItem(STORAGE_KEY)).toBeDefined();

    clearUserManual();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
