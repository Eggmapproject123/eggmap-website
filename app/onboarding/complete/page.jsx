'use client';

import { useEffect } from 'react';

export default function OnboardingComplete() {
  const deepLink = 'eggmap://onboarding-complete';

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = deepLink;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#ffffff',
        color: '#111111',
        fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <h1 style={{ fontSize: 22, marginBottom: 10 }}>Returning to EggMap…</h1>
        <p style={{ fontSize: 15, color: '#444', marginBottom: 18 }}>
          If nothing happens automatically, tap the button below.
        </p>
        <a
          href={deepLink}
          style={{
            display: 'inline-block',
            padding: '10px 16px',
            borderRadius: 12,
            backgroundColor: '#ffbf3a',
            color: '#5a3b00',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Back to App
        </a>
      </div>
    </main>
  );
}
