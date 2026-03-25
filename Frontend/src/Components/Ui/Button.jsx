import React from 'react';

const V = {
  primary: { bg: 'var(--cyan)',     color: 'var(--ink)',  border: 'transparent' },
  outline: { bg: 'transparent',    color: 'var(--cyan)', border: 'var(--border-cyan)' },
  ghost:   { bg: 'transparent',    color: 'var(--muted)',border: 'var(--border)' },
  danger:  { bg: 'rgba(255,79,79,0.1)', color: 'var(--red)', border: 'rgba(255,79,79,0.25)' },
  dark:    { bg: 'var(--ink-3)',    color: 'var(--paper)',border: 'var(--border)' },
};

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, fullWidth = false, style = {}, ...props
}) {
  const v   = V[variant] || V.primary;
  const pad = { sm: '0.45rem 1rem', md: '0.7rem 1.5rem', lg: '0.9rem 2rem' }[size];
  const fs  = { sm: '0.75rem', md: '0.85rem', lg: '0.95rem' }[size];

  return (
    <button
      disabled={loading || props.disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: '0.45rem', padding: pad, fontSize: fs,
        fontFamily: 'var(--font-body)', fontWeight: 600,
        letterSpacing: '0.05em', textTransform: 'uppercase',
        borderRadius: 'var(--r)', border: `1px solid ${v.border}`,
        background: v.bg, color: v.color,
        cursor: loading || props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled && !loading ? 0.45 : 1,
        width: fullWidth ? '100%' : 'auto',
        transition: 'all var(--t)',
        ...style,
      }}
      onMouseEnter={(e) => { if (!loading && !props.disabled) { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
      {...props}
    >
      {loading && <span style={{ width: 13, height: 13, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.65s linear infinite', display: 'inline-block' }} />}
      {children}
    </button>
  );
}