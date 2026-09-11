import { useEffect, useRef } from 'react';

export function useStudyReminder(profile: { studyReminderEnabled?: boolean; studyReminderTime?: string }) {
  const lastNotifiedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!profile.studyReminderEnabled || !profile.studyReminderTime) return;

    const checkTime = () => {
      const now = new Date();
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const currentTime = `${currentHours}:${currentMinutes}`;
      const currentDate = now.toDateString();

      // Ensure we only notify once per day at the specified time
      if (currentTime === profile.studyReminderTime && lastNotifiedRef.current !== currentDate) {
        try {
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Seminario Teológico Digital', {
              body: '¡Es hora de tu estudio diario! Entra ahora para continuar aprendiendo.',
              icon: '/icon-192.png'
            });
            lastNotifiedRef.current = currentDate;
          }
        } catch (e) {
          // Notifications might be restricted in iframes
        }
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkTime, 30000);
    checkTime(); // Check immediately on mount/update

    return () => clearInterval(interval);
  }, [profile.studyReminderEnabled, profile.studyReminderTime]);
}
