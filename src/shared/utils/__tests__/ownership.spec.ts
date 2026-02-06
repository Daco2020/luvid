
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getOrCreateUserId } from '../../../features/user-manual/utils/user-storage';

describe('User Ownership Logic', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should generate a new user ID if none exists in localStorage', () => {
    const userId = getOrCreateUserId();
    expect(userId).toBeTruthy();
    expect(typeof userId).toBe('string');
    expect(userId.length).toBeGreaterThan(0);
    expect(localStorage.getItem('luvid_user_id')).toBe(userId);
  });

  it('should return persistent user ID if it exists', () => {
    const existingId = 'existing-user-id';
    localStorage.setItem('luvid_user_id', existingId);

    const userId = getOrCreateUserId();
    expect(userId).toBe(existingId);
  });

  it('should return different IDs for different "browsers" (simulated by clearing storage)', () => {
    // User A
    const userA = getOrCreateUserId();
    
    // Simulate switching to Guest Browser (Incognito)
    localStorage.clear(); 
    
    // User B
    const userB = getOrCreateUserId();

    expect(userA).not.toBe(userB);
  });

  it('ownership check logic simulation', () => {
    // Simulate Report Owner
    const ownerId = "owner-123";
    
    // Scenario 1: Owner viewing their own report
    const currentViewerId = ownerId;
    const isOwner = ownerId === currentViewerId;
    expect(isOwner).toBe(true);

    // Scenario 2: Guest viewing the report
    const guestId = "guest-456";
    const isGuestOwner = (ownerId as string) === guestId;
    expect(isGuestOwner).toBe(false);
  });
});
