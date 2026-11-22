// Regenerates CVDarioVillar.pdf (Spanish) and ResumeDarioVillar.pdf (English)
// from the live /cv/es and /cv/en routes, using the Chrome DevTools Protocol
// directly (Page.printToPDF with displayHeaderFooter: false).
//
// CLI flags like --print-to-pdf-no-header are unreliable across headless
// Chrome modes/versions and were leaving a date/URL header-footer baked into
// the PDF — driving Chrome via CDP is the only way to reliably suppress it.
//
// Usage:
//   1. npm start   (in another terminal — the dev server must be running on :3000)
//   2. npm run generate-pdfs
//
// Optional env vars: BASE_URL (default http://localhost:3000), CHROME_PATH.

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const CDP_PORT = 9333;
const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');

const TARGETS = [
  { path: '/cv/es', out: 'CVDarioVillar.pdf' },
  { path: '/cv/en', out: 'ResumeDarioVillar.pdf' },
];

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error('Could not find Chrome or Edge. Set CHROME_PATH env var.');
  }
  return found;
}

function httpRequest(method, port, reqPath) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, path: reqPath, method }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Non-JSON response from CDP: ${data.slice(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function waitForCdp(port, retries = 30) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      httpRequest('GET', port, '/json/version')
        .then(resolve)
        .catch((err) => {
          if (n <= 0) return reject(err);
          setTimeout(() => attempt(n - 1), 500);
        });
    };
    attempt(retries);
  });
}

async function printPdf(port, url, outFile) {
  const tab = await httpRequest('PUT', port, `/json/new?${encodeURIComponent(url)}`);
  const ws = new WebSocket(tab.webSocketDebuggerUrl, { maxPayload: 200 * 1024 * 1024 });

  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) => {
    const msgId = ++id;
    return new Promise((resolve) => {
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  };

  await new Promise((resolve) => ws.on('open', resolve));
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });

  await send('Page.enable');
  await new Promise((resolve) => setTimeout(resolve, 3000)); // let fonts/images settle

  const result = await send('Page.printToPDF', {
    printBackground: true,
    displayHeaderFooter: false,
    preferCSSPageSize: true,
  });

  fs.writeFileSync(outFile, Buffer.from(result.data, 'base64'));
  ws.close();
}

async function main() {
  const chromePath = findChrome();
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--remote-debugging-port=${CDP_PORT}`,
    '--remote-debugging-address=127.0.0.1',
    `--user-data-dir=${path.join(require('os').tmpdir(), 'dariovillar-pdf-chrome-profile')}`,
  ], { stdio: 'ignore' });

  try {
    await waitForCdp(CDP_PORT);

    for (const target of TARGETS) {
      const outFile = path.join(ASSETS_DIR, target.out);
      console.log(`Generating ${target.out}...`);
      await printPdf(CDP_PORT, `${BASE_URL}${target.path}`, outFile);
      console.log(`  -> ${outFile} (${fs.statSync(outFile).size} bytes)`);
    }
  } finally {
    chrome.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
