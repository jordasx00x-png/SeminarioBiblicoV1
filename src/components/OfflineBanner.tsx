import React, { useEffect } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import {
  downloadFullBibleOffline,
  getOfflineChapterCountAsync,
  TOTAL_BIBLE_CHAPTERS
} from '../utils/offlineStorage';

/**
 * OfflineBanner component:
 * Performs automatic silent background synchronization of the entire Bible and its versions
 * into IndexedDB without displaying any intrusive floating badges or UI buttons.
 */
export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (!isOnline) return;

    let active = true;

    // Perform background prefetching silently
    const syncBackground = async () => {
      try {
        const count = await getOfflineChapterCountAsync();
        if (count < TOTAL_BIBLE_CHAPTERS && active) {
          // Download in background silently
          await downloadFullBibleOffline(() => {
            // silent progress
          });
        }
      } catch (err) {
        // silent fail
      }
    };

    // Delay start of background sync slightly to avoid network contention during initial load
    const timer = setTimeout(() => {
      syncBackground();
    }, 3000);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [isOnline]);

  // Return null so no floating button or banner appears on screen
  return null;
}
