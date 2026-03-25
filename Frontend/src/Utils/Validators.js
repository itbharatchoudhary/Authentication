export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const passwordStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: 'var(--muted-2)' };
  let s = 0;
  if (pw.length >= 8)              s++;
  if (/[A-Z]/.test(pw))            s++;
  if (/[0-9]/.test(pw))            s++;
  if (/[^A-Za-z0-9]/.test(pw))     s++;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['var(--muted-2)', 'var(--red)', 'var(--amber)', '#8fc542', 'var(--green)'];
  return { score: s, label: labels[s], color: colors[s] };
};

export const required    = (v) => !v?.toString().trim() ? 'This field is required' : '';
export const minLength   = (n) => (v) => v?.length < n ? `Minimum ${n} characters` : '';
export const mustMatch   = (a, b, msg = "Values don't match") => a !== b ? msg : '';