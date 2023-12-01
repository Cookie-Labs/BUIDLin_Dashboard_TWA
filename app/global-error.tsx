'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(`GlobalError: ${error}`);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            maxWidth: '100vw',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '3.25rem' }}>Something went wrong!</span>
          <button
            style={{
              cursor: 'pointer',
              borderRadius: '1rem',
              backgroundColor: '#242424',
              padding: '1.25rem 2.5rem',
              color: '#6F6F6F',
            }}
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
