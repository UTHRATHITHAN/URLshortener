import { useState, useEffect } from 'react';

export default function StatusBar() {
  let windowObj;
  if(typeof window !== 'undefined')
{
  windowObj = window.navigator.onLine
}
  
  const [isOnline, setIsOnline] = useState(windowObj);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
