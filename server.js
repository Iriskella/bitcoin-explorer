// server.js - quick mock API
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const ok = (res, data) => res.json(data);
const err = (res, code, msg) => res.status(code).json({ error: msg });

// Simple address validator
const isBase58 = (v) => /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(v);
const isBech32 = (v) => /^bc1[0-9ac-hj-np-z]{20,80}$/i.test(v);
const isHex64 = (v) => /^[0-9a-fA-F]{64}$/.test(v);

// Address endpoint
app.get('/address/:addr', (req, res) => {
  const { addr } = req.params;
  if (!(isBase58(addr) || isBech32(addr))) return err(res, 400, 'Invalid Bitcoin address');

  // demo data
  ok(res, {
    address: addr,
    balance: '0.12345678',
    transaction_count: 42,
  });
});

// Transaction endpoint
app.get('/transaction/:hash', (req, res) => {
  const { hash } = req.params;
  if (!isHex64(hash)) return err(res, 404, 'Transaction not found');

  // demo data
  ok(res, {
    hash,
    fee: '0.00012',
    inputs: [
      { address: 'bc1qexampleinput000000000000000000000', amount: '0.5' },
    ],
    outputs: [
      { address: 'bc1qexampleoutput00000000000000000000', amount: '0.49988' },
    ],
    transaction_index: 7,
    block_time: new Date().toISOString(),
  });
});

// Force server error for testing
app.get('/boom', (_req, res) => err(res, 500, 'Internal error'));

const port = 3001;
app.listen(port, () => console.log(`Mock API running on http://localhost:${port}`));
app.get('/health', (_req, res) => res.json({ ok: true }));
