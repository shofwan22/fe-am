import { useEffect, useRef } from 'react';

export function useDraft(key: string, data: unknown) {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(data));
    }, 2000);
  }, [data, key]);
}
