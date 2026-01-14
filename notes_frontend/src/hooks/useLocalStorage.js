import { useEffect, useState } from 'react';

/**
 * Safely parse JSON from localStorage.
 * Falls back to defaultValue on parse errors.
 */
function readJson(key, defaultValue) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

/**
 * Safely write JSON to localStorage.
 */
function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

// PUBLIC_INTERFACE
export function useLocalStorage(key, defaultValue) {
  /**
   * React hook for persisting a value into localStorage.
   * - Initializes from localStorage on first render.
   * - Writes on changes.
   * - Syncs changes across tabs via `storage` event.
   *
   * @param {string} key localStorage key name
   * @param {*} defaultValue default when key is missing or invalid
   * @returns {[any, Function]} [value, setValue]
   */
  const [value, setValue] = useState(() => readJson(key, defaultValue));

  useEffect(() => {
    writeJson(key, value);
  }, [key, value]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.storageArea !== window.localStorage) return;
      if (e.key !== key) return;
      setValue(readJson(key, defaultValue));
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, defaultValue]);

  return [value, setValue];
}
