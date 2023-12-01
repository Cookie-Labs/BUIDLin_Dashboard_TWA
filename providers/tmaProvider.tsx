'use client';

import { useMemo, type PropsWithChildren } from 'react';
import { SDKProvider, useSDK } from '@tma.js/sdk-react';

/**
 * This component is the layer controlling the application display. It displays
 * application in case, the SDK is initialized, displays an error if something
 * went wrong, and a loader if the SDK is warming up.
 */
function DisplayGate({ children }: PropsWithChildren) {
  const { didInit, components, error } = useSDK();
  const errorMessage = useMemo<null | string>(() => {
    if (!error) {
      return null;
    }

    return error instanceof Error ? error.message : 'Unknown error';
  }, [error]);

  // There were no calls of SDK's init function. It means, we did not
  // even try to do it.
  if (!didInit) {
    return (
      <div className="flex min-h-[100vh] max-w-[100%] flex-col items-center justify-center gap-[2rem] bg-primary p-[1.6rem] pt-[3.2rem]">
        <span className="text-center text-[2rem] font-semiBold text-white">
          SDK init function is not yet called.
        </span>
      </div>
    );
  }

  // Error occurred during SDK init.
  if (error !== null) {
    return (
      <div className="flex min-h-[100vh] max-w-[100%] flex-col items-center justify-center gap-[2rem] bg-primary p-[1.6rem] pt-[3.2rem]">
        <span className="text-center text-[2rem] font-semiBold text-white">
          SDK was unable to initialize. Probably, current application is being
          used not in Telegram Web Apps environment.
        </span>
        <blockquote>
          <span className="text-center text-[1rem] font-regular text-white">
            Error: {errorMessage}
          </span>
        </blockquote>
      </div>
    );
  }

  // If components is null, it means, SDK is not ready at the
  // moment and currently initializing. Usually, it takes like
  // several milliseconds or something like that, but we should
  // have this check.
  if (components === null) {
    return (
      <div className="flex min-h-[100vh] max-w-[100%] flex-col items-center justify-center gap-[2rem] bg-primary p-[1.6rem] pt-[3.2rem]">
        <span className="text-center text-[2rem] font-semiBold text-white">
          Loading..
        </span>
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
