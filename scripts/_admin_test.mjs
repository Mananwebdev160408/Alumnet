import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sa = JSON.parse(readFileSync(resolve(__dirname, '../firebase-service-account.json'), 'utf-8'));

console.log('project_id:', sa.project_id);
console.log('client_email:', sa.client_email);

initializeApp({ credential: cert(sa) });
const db = getFirestore();

console.log('Writing test document...');
try {
  await db.collection('_seed_test').doc('ping').set({ ok: true, ts: new Date() });
  console.log('✔ SUCCESS — Admin SDK write works!');
} catch (e) {
  console.error('✘ FAILED:', e.code, e.message);
  console.error('\nFull error:', e);
}
process.exit(0);
