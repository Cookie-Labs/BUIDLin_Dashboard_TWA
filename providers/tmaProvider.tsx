// ref. https://github.com/Telegram-Mini-Apps/tma.js/blob/master/apps/docs/packages/typescript/tma-js-sdk-react.md

'use client';

import { type PropsWithChildren } from 'react';
import { SDKProvider, useSDK } from '@tma.js/sdk-react';
import LoadingSpinner from '@/components/loading-spinner';

/**
 * This component is the layer controlling the application display. It displays
 * application in case, the SDK is initialized, displays an error if something
 * went wrong, and a loader if the SDK is warming up.
 */
function DisplayGate({ children }: PropsWithChildren) {
  const { didInit, components, error } = useSDK();

  // There were no calls of SDK's init function. It means, we did not
  // even try to do it.
  if (!didInit) {
    return (
      <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-center gap-[2rem] bg-primary p-[1.6rem] pt-[3.2rem]">
        <LoadingSpinner color="white"/>
      </div>
    );
  }

  // Error occurred during SDK init.
  if (error !== null) {
    return (
      <div className="flex min-h-[100vh] max-w-[100%] flex-col items-center justify-center gap-[2rem] bg-primary p-[1.6rem] pt-[3.2rem]">
        <span className="text-center text-[2rem] font-semiBold text-white">
          Please access this service through the Telegram Web App environment.
        </span>
        <button
          onClick={() => {
            window.location.href = 'https://t.me/buidlin_bot/dashboard';
          }}
          className="cursor-pointer text-[2rem] font-regular text-blue07 underline duration-200 hover:scale-110 active:scale-100"
        >
          Open Telegram Web App
        </button>
      </div>
    );
  }

  // If components is null, it means, SDK is not ready at the
  // moment and currently initializing. Usually, it takes like
  // several milliseconds or something like that, but we should
  // have this check.
  if (components === null) {
    return (
      <div className="relative flex min-h-[100vh] max-w-[100%] flex-col items-center justify-center gap-[2rem] bg-primary p-[1.6rem] pt-[3.2rem]">
        <LoadingSpinner color="white" />
      </div>
    );
  }

  // Safely render application.
  return children;
}

/**
 * Root component of the whole project.
 */
export function TmaProvider({ children }: PropsWithChildren) {
  return (
    <SDKProvider initOptions={{ debug: true, cssVars: true }}>
      <DisplayGate>{children}</DisplayGate>
    </SDKProvider>
  );
}
