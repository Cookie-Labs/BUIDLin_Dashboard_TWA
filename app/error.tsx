'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(`Error: ${error}`);
  }, [error]);

  return (
    <div className="bg-primary flex min-h-[100vh] max-w-[100vw] flex-col items-center justify-center gap-12">
      <span className="text-title">Something went wrong!</span>
      <button
        className="cursor-pointer rounded-2xl bg-gray14 px-10 py-5 text-gray10 duration-200 hover:scale-105 hover:text-white active:scale-100"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
