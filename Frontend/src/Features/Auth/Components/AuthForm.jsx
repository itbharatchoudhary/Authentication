import React from 'react';

/**
 * Generic wrapper that adds the standard auth form chrome:
 * - Error banner
 * - Optional footer link
 */
export default function AuthForm({ error, children, footer }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <div style={{ background: 'rgba(255,79,79,0.08)', border: '1px solid rgba(255,79,79,0.22)', borderRadius: 'var(--r)', padding: '0.7rem 0.9rem', fontSize: '0.83rem', color: 'var(--red)', lineHeight: 1.5 }}>
          {error}
        </div>
      )}
      {children}
      {footer && (
        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
          {footer}
        </p>
      )}
    </div>
  );
}