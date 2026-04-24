import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

if (typeof window !== 'undefined' && window.AbortSignal) {
  globalThis.AbortSignal = window.AbortSignal;
}

afterEach(() => {
  cleanup();
});
