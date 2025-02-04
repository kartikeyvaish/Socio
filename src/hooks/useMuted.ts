import { useEffect, useState } from 'react';

let interval;

export default function useMuted() {
  const [isMuted, setIsMuted] = useState(false);
  const [isMuteVisible, setIsMuteVisible] = useState(false);

  useEffect(() => {
    interval = setTimeout(() => {
      setIsMuteVisible(false);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isMuted]);

  return { isMuted, setIsMuted, isMuteVisible, setIsMuteVisible };
}
