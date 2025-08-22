'use client';

import React, { useCallback, useEffect, useReducer } from 'react';
import { detectInputType, isValidBtcAddress, isValidTxHash } from '../lib/utils';
import { fetchAddress, fetchTransaction } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { AddressResult } from '../components/AddressResult';
import { TransactionResult } from '../components/TransactionResult';


type Kind = 'address' | 'transaction';

type State = {
  q: string;
  loading: boolean;
  error: string | null;
  kind: Kind | null;
  data: any | null;
  history: string[];
};

type Action =
  | { type: 'SET_Q'; q: string }
  | { type: 'LOADING' }
  | { type: 'ERROR'; error: string }
  | { type: 'RESULT'; kind: Kind; data: any }
  | { type: 'CLEAR' }
  | { type: 'PUSH_HISTORY'; q: string };

const initial: State = {
  q: '',
  loading: false,
  error: null,
  kind: null,
  data: null,
  history: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_Q':
      return { ...state, q: action.q };
    case 'LOADING':
      return { ...state, loading: true, error: null, kind: null, data: null };
    case 'ERROR':
      return { ...state, loading: false, error: action.error };
    case 'RESULT':
      return { ...state, loading: false, error: null, data: action.data, kind: action.kind };
    case 'CLEAR':
      return { ...state, error: null, data: null, kind: null };
    case 'PUSH_HISTORY':
      return { ...state, history: [action.q, ...state.history.filter((x) => x !== action.q)].slice(0, 8) };
    default:
      return state;
  }
}

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initial);

  const handleSearch = useCallback(async () => {
    const value = state.q.trim();
    if (!value) return;
  
    dispatch({ type: 'CLEAR' });
    const kind: Kind = detectInputType(value);
  
    // Bonus:Robust client-side validation BEFORE fetching
    if (kind === 'address' && !isValidBtcAddress(value)) {
      dispatch({ type: 'ERROR', error: 'Invalid Bitcoin address' });
      return;
    }
    if (kind === 'transaction' && !isValidTxHash(value)) {
      dispatch({ type: 'ERROR', error: 'Invalid transaction hash' });
      return;
    }
  
    dispatch({ type: 'LOADING' });
  
    try {
      const result = kind === 'transaction'
        ? await fetchTransaction(value)
        : await fetchAddress(value);
  
      dispatch({ type: 'RESULT', kind, data: result });
      dispatch({ type: 'PUSH_HISTORY', q: value });
    } catch (err: any) {
      dispatch({ type: 'ERROR', error: err?.message || 'Something went wrong' });
    }
  }, [state.q]);
  

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '');

  // hydrate from localStorage on first client render
useEffect(() => {
  try {
    const raw = localStorage.getItem('history');
    if (raw) {
      const arr = JSON.parse(raw) as string[];
      if (Array.isArray(arr) && arr.length) {
        // seed state by dispatching a fake push (cheap way to set history)
        arr.forEach((q) => dispatch({ type: 'PUSH_HISTORY', q }));
      }
    }
  } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  try {
    localStorage.setItem('history', JSON.stringify(state.history));
  } catch {}
}, [state.history]);

  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-4 py-10 md:py-16">
      <section className="mb-8 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">Bitcoin Explorer</h1>
        <p className="mt-2 text-base text-base-muted max-w-prose">
          Enter a Bitcoin address or transaction hash. The app calls the backend at{' '}
          <code className="text-[color:var(--color-accent-primary)]">{apiBase}</code> and renders the response.
        </p>
      </section>

      <Card>
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            placeholder="Paste BTC address or transaction hash..."
            value={state.q}
            onChange={(e) => dispatch({ type: 'SET_Q', q: e.target.value })}
            onKeyDown={onKeyDown}
            aria-label="Search input"
          />
          <Button onClick={handleSearch} aria-label="Search">
            Search
          </Button>
        </div>

        {state.history.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {state.history.map((h) => (
              <button
                key={h}
                onClick={() => dispatch({ type: 'SET_Q', q: h })}
                className="text-xs px-2 py-1 rounded-lg border border-base-border/60 hover:bg-white/5 transition"
                title="Click to load this query"
              >
                {h.slice(0, 10)}{h.length > 10 ? '…' : ''}
              </button>
            ))}
            <button
              onClick={() => {
                // reset history only
                localStorage.removeItem('history');
                dispatch({ type: 'CLEAR' });
                state.history.length = 0; 
              }}
              className="ml-auto text-xs text-base-muted underline hover:text-[color:var(--color-text)]"
              aria-label="Clear search history"
            >
              Clear history
            </button>
          </div>
        )}
      </Card>
      {state.loading && (
        <Card className="mt-6">
          <div className="animate-pulse text-base-muted">Loading…</div>
        </Card>
      )}

      {state.error && (
        <Card className="mt-6 border-red-500/40">
          <div className="text-red-400">Error: {state.error}</div>
        </Card>
      )}

      {!state.loading && state.data && state.kind === 'address' && (
        <AddressResult className="mt-6" data={state.data} />
      )}

      {!state.loading && state.data && state.kind === 'transaction' && (
        <TransactionResult className="mt-6" data={state.data} />
      )}
    </div>
  );
}
