'use client';

import { debugBech32 } from '../lib/utils';
import { bech32, bech32m } from 'bech32';
import { useEffect } from 'react';

export default function ExposeDebug() {
  useEffect(() => {
    (window as any).debugBech32 = debugBech32;
    // quick visibility of lib health
    console.log('[DBG] bech32.decode?', typeof bech32.decode);
    console.log('[DBG] bech32m.decode?', typeof bech32m.decode);
    console.log('[DBG] window.debugBech32 available');
  }, []);
  return null;
}
