import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });

  const set = (v) => {
    const next = typeof v === 'function' ? v(value) : v;
    setValue(next);
    try { localStorage.setItem(key, JSON.stringify(next)); }
    catch {}
  };

  const remove = () => {
    setValue(initial);
    localStorage.removeItem(key);
  };

  return [value, set, remove];
};