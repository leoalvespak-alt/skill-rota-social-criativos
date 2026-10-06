#!/usr/bin/env node
/* Folha de contato de uma pasta de fotos (modelo pessoal orgânico).
   Uso: node kit/tools/folha-fotos.cjs <pasta-de-fotos> <saida.png>
   Gera uma imagem com todas as fotos (nome do arquivo + tamanho) para o agente ABRIR e escolher
   qual foto vai em cada card antes de desenhar. Lista no console o que o navegador não abre (HEIC etc.).
*/
const fs = require('fs');
const path = require('path');
const os = require('os');
const { pathToFileURL } = require('url');

function loadPlaywright() {
  const tries = [process.env.ROTA_PLAYWRIGHT, process.env.FEED_PLAYWRIGHT_PATH,
    'C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright', 'playwright'].filter(Boolean);
  for (const t of tries) { try { return require(t); } catch (_) { /* próximo */ } }
  console.error('Playwright não encontrado. Defina ROTA_PLAYWRIGHT ou rode: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

(async () => {
  const [pasta, saida] = process.argv.slice(2);
  if (!pasta || !saida) { console.error('uso: node folha-fotos.cjs <pasta-de-fotos> <saida.png>'); process.exit(2); }
  const todos = fs.readdirSync(pasta).filter((f) => fs.statSync(path.join(pasta, f)).isFile());
  const fotos = todos.filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
  const outros = todos.filter((f) => /\.(heic|heif|dng|raw|cr2|nef)$/i.test(f));
  if (outros.length) console.log(`Não abrem no navegador (converta para JPG antes de usar): ${outros.join(', ')}`);
  if (!fotos.length) { console.error('Nenhuma foto JPG/PNG/WEBP na pasta.'); process.exit(1); }

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1640, height: 800 } });
  const url = (f) => pathToFileURL(path.resolve(pasta, f)).href.replace(/'/g, '%27');
  const itens = fotos.map((f) => `<figure><div class="img" style="background-image:url('${url(f)}')"></div><img src="${url(f)}" hidden><figcaption>${f}</figcaption></figure>`).join('');
  const tmp = path.join(os.tmpdir(), `folha-fotos-${process.pid}.html`);
  fs.writeFileSync(tmp, `<meta charset="utf-8"><style>body{margin:0;background:#262626;display:grid;grid-template-columns:repeat(5,300px);gap:24px;padding:24px;font:15px monospace;color:#ddd}
    figure{margin:0}.img{width:300px;height:375px;background:#111 center/contain no-repeat}figcaption{margin-top:6px;word-break:break-all}</style>${itens}`);
  await page.goto(pathToFileURL(tmp).href);
  await page.evaluate(async () => { await Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; })))); });
  const info = await page.evaluate(() => [...document.images].map((im) => ({ ok: im.naturalWidth > 0, w: im.naturalWidth, h: im.naturalHeight })));
  await page.evaluate((info) => { document.querySelectorAll('figcaption').forEach((c, i) => { c.textContent += info[i].ok ? ` · ${info[i].w}×${info[i].h}` : ' · NÃO CARREGOU'; }); }, info);
  await page.screenshot({ path: saida, fullPage: true });
  await browser.close();
  fs.unlinkSync(tmp);
  fotos.forEach((f, i) => console.log(`${info[i].ok ? 'ok ' : 'ERRO'} ${f} ${info[i].w}x${info[i].h}${info[i].ok && info[i].w > info[i].h ? ' (horizontal: no 4:5 vai cortar as laterais)' : ''}`));
  console.log(`\nFolha: ${saida}. Abra a imagem e descreva cada foto antes de distribuir nos cards.`);
})();
