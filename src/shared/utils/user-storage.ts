const STORAGE_KEY = 'luvid_user_id';

export function getOrCreateUserId(): string {
  if (typeof window === 'undefined') return '';

  let userId = localStorage.getItem(STORAGE_KEY);
  
  if (!userId) {
    // 브라우저 네이티브 UUID 생성 사용 (없으면 폴백)
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      userId = crypto.randomUUID();
    } else {
      // 구형 브라우저 폴백: 타임스탬프 + 랜덤
      userId = `u-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
    }
    localStorage.setItem(STORAGE_KEY, userId);
  }
  
  return userId;
}
