import React from 'react';
import Button from '../ui/Button.jsx';

export default class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(e) { return { error: e }; }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', gap: '1rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--red)', textTransform: 'uppercase' }}>Runtime Error</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--paper)' }}>Something broke.</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 400, fontSize: '0.875rem' }}>{this.state.error.message}</p>
        <Button onClick={() => window.location.reload()}>Reload Page</Button>
      </div>
    );
  }
}