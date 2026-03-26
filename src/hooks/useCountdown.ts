import { useState, useEffect } from 'react';
import { getCountdown } from '../utils/date';

export function useCountdown(targetDate: string) {
  const [countdown, setCountdown] = useState(getCountdown(targetDate));

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return countdown;
}
