'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

function ErrorPage(props: ErrorPageProps) {
  const { error, reset } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          className="error"
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            fontFamily: 'sans-serif',
            width: '100%',
          }}
        >
          <img
            src="/logo.png"
            alt="Portfolio Logo"
            style={{ maxWidth: '90px', marginBottom: '1.75rem' }}
          />

          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
            Something went wrong!
          </h2>

          <button
            type="button"
            onClick={() => reset()}
            style={{
              border: '1px solid',
              borderRadius: '3px',
              padding: '0.5rem 1.25rem',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
export default ErrorPage;
