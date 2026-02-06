import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  saveUserIdToStorage,
  getUserIdFromStorage,
  saveMyLuvIdToStorage,
  getMyLuvIdFromStorage,
  clearMyLuvIdFromStorage,
  clearAllLuvIdStorage
} from "../luvid-storage";

describe("luvid-storage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe("userId storage", () => {
    it("should save userId to localStorage", () => {
      const userId = "test-user-123";
      saveUserIdToStorage(userId);
      
      expect(localStorage.getItem("luvid_user_id")).toBe(userId);
    });

    it("should retrieve userId from localStorage", () => {
      const userId = "test-user-456";
      localStorage.setItem("luvid_user_id", userId);
      
      const retrieved = getUserIdFromStorage();
      expect(retrieved).toBe(userId);
    });

    it("should return null when userId does not exist", () => {
      const retrieved = getUserIdFromStorage();
      expect(retrieved).toBeNull();
    });

    it("should handle localStorage errors gracefully when saving", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      saveUserIdToStorage("test-user");
      
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to save userId to localStorage:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
      setItemSpy.mockRestore();
    });
  });

  describe("Luv ID storage", () => {
    it("should save Luv ID to localStorage", () => {
      const luvId = "LUV-ABC123";
      saveMyLuvIdToStorage(luvId);
      
      expect(localStorage.getItem("luvid_id")).toBe(luvId);
    });

    it("should retrieve Luv ID from localStorage", () => {
      const luvId = "LUV-XYZ789";
      localStorage.setItem("luvid_id", luvId);
      
      const retrieved = getMyLuvIdFromStorage();
      expect(retrieved).toBe(luvId);
    });

    it("should return null when Luv ID does not exist", () => {
      const retrieved = getMyLuvIdFromStorage();
      expect(retrieved).toBeNull();
    });

    it("should clear Luv ID from localStorage", () => {
      const luvId = "LUV-CLEAR123";
      localStorage.setItem("luvid_id", luvId);
      
      clearMyLuvIdFromStorage();
      
      expect(localStorage.getItem("luvid_id")).toBeNull();
    });

    it("should handle localStorage errors gracefully when saving", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      saveMyLuvIdToStorage("LUV-ERROR");
      
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to save Luv ID to localStorage:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
      setItemSpy.mockRestore();
    });
  });

  describe("clearAllLuvIdStorage", () => {
    it("should clear both userId and Luv ID from localStorage", () => {
      localStorage.setItem("luvid_user_id", "test-user-123");
      localStorage.setItem("luvid_id", "LUV-ABC123");
      
      clearAllLuvIdStorage();
      
      expect(localStorage.getItem("luvid_user_id")).toBeNull();
      expect(localStorage.getItem("luvid_id")).toBeNull();
    });

    it("should not throw error when clearing non-existent items", () => {
      expect(() => clearAllLuvIdStorage()).not.toThrow();
    });
  });

  describe("integration scenarios", () => {
    it("should store userId and Luv ID independently", () => {
      const userId = "user-abc";
      const luvId = "LUV-XYZ123";
      
      saveUserIdToStorage(userId);
      saveMyLuvIdToStorage(luvId);
      
      expect(getUserIdFromStorage()).toBe(userId);
      expect(getMyLuvIdFromStorage()).toBe(luvId);
    });

    it("should allow clearing Luv ID without affecting userId", () => {
      const userId = "user-def";
      const luvId = "LUV-GHI456";
      
      saveUserIdToStorage(userId);
      saveMyLuvIdToStorage(luvId);
      
      clearMyLuvIdFromStorage();
      
      expect(getUserIdFromStorage()).toBe(userId);
      expect(getMyLuvIdFromStorage()).toBeNull();
    });

    it("should handle typical user flow: first visit -> create manual -> create Luv ID", () => {
      // Step 1: First visit - userId is created
      const userId = "new-user-123";
      saveUserIdToStorage(userId);
      expect(getUserIdFromStorage()).toBe(userId);
      expect(getMyLuvIdFromStorage()).toBeNull();
      
      // Step 2: User creates manual (no Luv ID yet)
      expect(getMyLuvIdFromStorage()).toBeNull();
      
      // Step 3: User creates Luv ID
      const luvId = "LUV-NEWUSER";
      saveMyLuvIdToStorage(luvId);
      expect(getMyLuvIdFromStorage()).toBe(luvId);
      
      // Both should exist now
      expect(getUserIdFromStorage()).toBe(userId);
      expect(getMyLuvIdFromStorage()).toBe(luvId);
    });
  });
});
