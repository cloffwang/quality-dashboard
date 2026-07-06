import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Every `test(...)` block in ui/ and api/ specs must call Allure's `description(...)`
// (imported from 'allure-js-commons') so the published report always shows intent beyond
// the test title. Plain text scan, not a full TS-AST parse — proportionate to this suite's
// flat `test('...', async (...) => {...})` shape.

const specDirs = ['ui', 'api'];
const topLevelTestCall = /(?<!\.)\btest\(/g;
const missing = [];

for (const dir of specDirs) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.spec.ts'))) {
    const path = join(dir, file);
    const src = readFileSync(path, 'utf8');
    const matches = [...src.matchAll(topLevelTestCall)];

    matches.forEach((match, i) => {
      const start = match.index;
      const end = i + 1 < matches.length ? matches[i + 1].index : src.length;
      const block = src.slice(start, end);
      if (!block.includes('description(')) {
        missing.push(`${path} — test #${i + 1}`);
      }
    });
  }
}

if (missing.length > 0) {
  console.error('Missing allure description() call in:');
  for (const entry of missing) console.error(`  - ${entry}`);
  process.exit(1);
}

console.log('OK — every test() block has a description() call.');
