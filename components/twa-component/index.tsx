'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  useBackButton,
  useClosingBehaviour,
  useViewport,
  useWebApp,
  useInitData,
} from '@tma.js/sdk-react';

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  const initData = useInitData();
  const backButton = useBackButton();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    const onBackButtonClick = () => handleBackButtonClick();
    backButton.on('click', onBackButtonClick);
    return () => {
      backButton.off('click', onBackButtonClick);
    };
  }, []);

  useEffect(() => {
    if (initData && initData.startParam) {
      if (pathname.includes('/event-detail')) {
        backButton.hide();
      } else {
        backButton.show();
      }
    } else {
      if (pathname === '/') {
        backButton.hide();
      } else {
        backButton.show();
      }
    }
  }, [backButton, pathname, initData]);

  return null;
}

export function ReadyAndExpand() {
  const webapp = useWebApp();
  const viewport = useViewport();
  const closingBehavior = useClosingBehaviour();

  useEffect(() => {
    webapp.ready();
    viewport.expand();
    closingBehavior.enableConfirmation();
  }, []);

  return null;
}

export default function TwaComponents() {
  return (
    <>
      <ReadyAndExpand />
      <BackButton />
    </>
  );
}
