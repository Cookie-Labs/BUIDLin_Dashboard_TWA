'use client';

import { useState, useEffect } from 'react';
import { myEventsData } from '@/states/formUserState';
import { useRecoilValue } from 'recoil';

import ScrollToTopButton from '@/components/scroll-to-top-button';

export default function CreatedEventPage() {
  const eventsData = useRecoilValue(myEventsData);
  const [currentHref, setCurrentHref] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentHref(window.location.href);
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center gap-[3rem]">
      <div>CreatedEventPage</div>
      <div>{JSON.stringify(eventsData, null, 2)}</div>
      <div>{currentHref}</div>
      <ScrollToTopButton />
    </div>
  );
}
