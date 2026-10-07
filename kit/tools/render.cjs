#!/usr/bin/env node
/* Render Rota de Ataque: HTML -> PNG com preflight obrigatório.
   Uso:
     node kit/tools/render.cjs <arquivo.html> <pasta-saida> [--so-preflight] [--forcar "motivo"]
   - Cada .card vira um PNG. Nome: data-arquivo (ex.: "card-06-tiktok") ou card-NN.
   - O preflight roda antes. Com erro, NADA é exportado (exit 1), salvo --forcar "motivo",
     que grava o motivo no relatório. Use --forcar só com autorização explícita do usuário.
   - Gera <pasta-saida>/preflight.json e <pasta-saida>/prancha.png (todas as artes lado a lado).
   Playwright: variável ROTA_PLAYWRIGHT ou 'playwright' instalado (npm i -D playwright && npx playwright install chromium).
*/
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function loadPlaywright() {
  const tries = [process.env.ROTA_PLAYWRIGHT, process.env.FEED_PLAYWRIGHT_PATH,
    'C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright', 'playwright'].filter(Boolean);
  for (const t of tries) { try { return require(t); } catch (_) { /* próximo */ } }
  console.error('Playwright não encontrado. Defina ROTA_PLAYWRIGHT ou rode: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

(async () => {
  const args = process.argv.slice(2);
  const html = args[0]; const saida = args[1];
  if (!html || !saida) { console.error('uso: node render.cjs <arquivo.html> <pasta-saida> [--so-preflight] [--forcar "motivo"]'); process.exit(2); }
  const soPre = args.includes('--so-preflight');
  const fi = args.indexOf('--forcar'); const forcar = fi >= 0 ? (args[fi + 1] || 'sem motivo') : null;
  fs.mkdirSync(saida, { recursive: true });

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 1500 }, deviceScaleFactor: 1 });
  await page.goto('file:///' + path.resolve(html).replace(/\\/g, '/'), { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; }))));
  });
  await page.waitForTimeout(150);

  const preflight = await page.evaluate(fs.readFileSync(path.join(__dirname, 'preflight.js'), 'utf8'));
  // imagens de fundo (fotos via CSS) precisam carregar: um caminho errado deixa a área vazia sem erro visível
  const fundos = await page.evaluate(async () => {
    const res = [];
    const cards = [...document.querySelectorAll('.card')];
    for (let i = 0; i < cards.length; i++) {
      for (const el of [cards[i], ...cards[i].querySelectorAll('*')]) {
        const bi = getComputedStyle(el).backgroundImage;
        for (const m of bi.matchAll(/url\("?([^")]+)"?\)/g)) {
          if (m[1].startsWith('data:')) continue;
          const ok = await new Promise((r) => { const im = new Image(); im.onload = () => r(im.naturalWidth > 0); im.onerror = () => r(false); im.src = m[1]; });
          if (!ok) res.push({ i, url: m[1] });
        }
      }
    }
    return res;
  });
  fundos.forEach((f) => preflight.cards[f.i].erros.push(`imagem de fundo não carregou: ${decodeURI(f.url)}`));
  const totalErros = preflight.cards.reduce((s, c) => s + c.erros.length, 0);
  for (const c of preflight.cards) {
    const st = c.erros.length ? 'FALHOU' : 'ok';
    console.log(`[${st}] ${c.id}${c.variante ? ' (' + c.variante + ')' : ''}`);
    c.erros.forEach((e) => console.log('   ERRO  ' + e));
    c.avisos.forEach((e) => console.log('   aviso ' + e));
  }
  const rel = { arquivo: path.resolve(html), data: new Date().toISOString(), totalErros, forcado: forcar, cards: preflight.cards, pngs: [] };

  if (soPre || (totalErros && !forcar)) {
    fs.writeFileSync(path.join(saida, 'preflight.json'), JSON.stringify(rel, null, 2));
    await browser.close();
    if (totalErros && !forcar) { console.log(`\n${totalErros} erro(s). Nada exportado. Corrija o layout (não reduza a fonte abaixo do piso, não corte copy).`); process.exit(1); }
    return;
  }

  // remove PNGs gerados pelo render anterior nesta pasta (evita variante antiga misturada ao lote atual)
  const relAnt = path.join(saida, 'preflight.json');
  if (fs.existsSync(relAnt)) {
    try { (JSON.parse(fs.readFileSync(relAnt, 'utf8')).pngs || []).forEach((p) => { const f = path.join(saida, p.arquivo); if (fs.existsSync(f)) fs.unlinkSync(f); }); } catch (_) { /* relatório antigo ilegível: segue */ }
  }
  const els = await page.$$('.card');
  const nomes = [];
  for (let i = 0; i < els.length; i++) {
    const nome = (await els[i].getAttribute('data-arquivo')) || `card-${String(i + 1).padStart(2, '0')}`;
    const f = path.join(saida, `${nome}.png`);
    await els[i].screenshot({ path: f });
    const sha = crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
    rel.pngs.push({ arquivo: path.basename(f), sha256: sha, visual: 'pendente' });
    nomes.push(f);
  }

  // prancha: até 7 artes por linha, 360px de largura cada (escala de celular)
  const porLinha = Math.min(7, nomes.length);
  const miniatura = async (f) => { const pg = await browser.newPage({ viewport: { width: 720, height: 960 } }); await pg.setContent(`<body style="margin:0"><img id=i src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}" style="width:720px;display:block"></body>`, { timeout: 180000, waitUntil: 'load' }); const b = await (await pg.$('#i')).screenshot({ type: 'jpeg', quality: 80 }); await pg.close(); return b.toString('base64'); };
  const minis = []; for (const f of nomes) minis.push(await miniatura(f));
  const thumbs = nomes.map((f, i) => `<figure style="margin:0"><img src="data:image/jpeg;base64,${minis[i]}" style="width:360px;display:block"><figcaption style="font:14px monospace;color:#bbb;margin-top:6px">${path.basename(f)}</figcaption></figure>`).join('');
  const p2 = await browser.newPage({ viewport: { width: 400 * porLinha + 40, height: 600 } });
  await p2.setContent(`<body style="margin:0;background:#2b2b2b;display:grid;grid-template-columns:repeat(${porLinha},360px);gap:30px 40px;padding:20px">${thumbs}</body>`, { timeout: 180000, waitUntil: 'domcontentloaded' });
  await p2.waitForTimeout(300);
  await p2.screenshot({ path: path.join(saida, 'prancha.png'), fullPage: true });

  fs.writeFileSync(path.join(saida, 'preflight.json'), JSON.stringify(rel, null, 2));
  await browser.close();
  console.log(`\n${nomes.length} PNG(s) em ${saida}. Estado visual: PENDENTE até abrir cada imagem e registrar nota (ver SKILL.md, passo 6).`);
})();
