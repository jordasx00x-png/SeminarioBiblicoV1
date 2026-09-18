// Helper to manage daily AI Tutor attempts quota
export const MAX_DAILY_AI_ATTEMPTS = 10;

export function getTodayKey(): string {
  const now = new Date();
  return `ai_tutor_attempts_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function getUsedAIAttempts(): number {
  try {
    const key = getTodayKey();
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function incrementAIAttempts(): number {
  try {
    const key = getTodayKey();
    const current = getUsedAIAttempts();
    const next = current + 1;
    localStorage.setItem(key, next.toString());
    return next;
  } catch {
    return 0;
  }
}

export function getRemainingAIAttempts(): number {
  const used = getUsedAIAttempts();
  return Math.max(0, MAX_DAILY_AI_ATTEMPTS - used);
}
