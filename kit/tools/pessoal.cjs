#!/usr/bin/env node
/* Gerador do MODELO PESSOAL ORGÂNICO: markdown de copy + plano -> HTML, com copy intocável.
   Uso (a partir da pasta da entrega, que contém kit/ e fotos/):
     node kit/tools/pessoal.cjs plano    <entrada.json> <pasta-entrega>   resolve layout, grava plano.json, direcao.json e PLANO.md
     node kit/tools/pessoal.cjs html     <pasta-entrega>                  grava pecas/NN-slug.html a partir do plano.json
     node kit/tools/pessoal.cjs conferir <pasta-entrega>                  abre os HTML no navegador e compara o texto de cada card com o markdown

   entrada.json:
   { "copy": "caminho/do/arquivo.md",
     "carrosseis": {                                   (chave = número do carrossel no markdown)
        "1": { "fonte": "serif" | "sans",
               "fotos": ["f07","f11","f12","f33","f45","f43"],    (1 por card, na ordem; capa primeiro)
               "papel": 4,                              (opcional: esse card vira papel sem foto)
               "marcas": { "1": [["trecho exato","sub"]], "3": [["outro trecho","circ"]] },
               "ajustes": { "3": { "variante": "P3", "pos": "meio", "cor": "preta" } } } } }
   Catálogo das fotos: <pasta-entrega>/fotos/_catalogo.json  { "f07": { "zonas": ["base","topo"], "pos": "50% 40%", "desc": "..." } }
   (zonas = onde a caixa pode ficar sem cobrir o assunto, em ordem de preferência; pos = background-position)

   Marcas (máx. 3 por card): sub (sublinhado à mão) | circ (círculo) | risco (riscado) | mark (marca-texto) | amarelo | cor | b (negrito)
   O texto vem SEMPRE do markdown. O gerador nunca reescreve: marcas só envolvem trechos que já existem. */
'use strict';
const fs = require('fs');
const path = require('path');

const PAD_COR = ['branca', 'preta', 'branca', 'vermelha', 'preta'];   // rotação de cor (sem vizinhas iguais)
const MARCAS = { sub: ['<span class="sub">', '</span>'], circ: ['<span class="circ">', '</span>'], risco: ['<span class="risco">', '</span>'],
  mark: ['<mark>', '</mark>'], amarelo: ['<mark class="amarelo">', '</mark>'], cor: ['<span class="cor">', '</span>'], b: ['<b>', '</b>'] };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const nPal = (t) => t.trim().split(/\s+/).length;
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const slugar = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 42).replace(/-+$/, '');
const fim = (t) => /[.!?”"…]$/.test(t.trim());

/* ------------------------------------------------------------------ leitura do markdown */
function lerCopy(arq) {
  const linhas = fs.readFileSync(arq, 'utf8').split(/\r?\n/);
  const cars = []; let c = null; let s = null; let par = [];
  const fechaPar = () => {
    if (!par.length || !s) { par = []; return; }
    const t = norm(par.join(' ')); par = [];
    const m = t.match(/^\*\*(.+)\*\*$/);
    if (m && !m[1].includes('**')) { s.paras.push({ t: m[1], b: true }); return; }
    if (!t.includes('**')) { s.paras.push({ t, b: false }); return; }
    // negrito no meio da frase: remove os ** e guarda os trechos em negrito (a copy do usuário continua igual, só sem os asteriscos)
    let plano = ''; const bs = []; let pos = 0; const re = /\*\*(.+?)\*\*/g; let mm;
    while ((mm = re.exec(t))) { plano += t.slice(pos, mm.index); bs.push([plano.length, plano.length + mm[1].length]); plano += mm[1]; pos = mm.index + mm[0].length; }
    plano += t.slice(pos);
    if (plano.includes('**')) throw new Error(`negrito mal fechado no slide ${s.k} do carrossel ${c.n}: "${t}"`);
    s.paras.push({ t: plano, b: false, bs });
  };
  for (const ln of linhas) {
    let m;
    if ((m = ln.match(/^## (?:Carrossel\s+)?(\d+)\s*[.·|-]\s*(.+)$/))) { fechaPar(); s = null; c = { n: +m[1], titulo: m[2].trim(), slides: [] }; cars.push(c); continue; }
    if ((m = ln.match(/^### Slide (\d+)/)) && c) { fechaPar(); s = { k: +m[1], paras: [] }; c.slides.push(s); continue; }
    if (/^(---|#{1,3} )/.test(ln)) { fechaPar(); s = null; continue; }
    if (!s) continue;
    if (!ln.trim()) fechaPar(); else par.push(ln.trim());
  }
  fechaPar();
  return cars;
}

/* ------------------------------------------------------------------ marcas */
function resolverMarcas(paras, marcas, ctx) {
  const spans = [];
  for (const [trecho, tipo] of marcas || []) {
    if (!MARCAS[tipo]) throw new Error(`${ctx}: marca desconhecida "${tipo}" (use ${Object.keys(MARCAS).join(', ')})`);
    if (tipo === 'circ' && trecho.length > 26) throw new Error(`${ctx}: círculo em "${trecho}" (${trecho.length} letras): círculo só em trecho de até 26 letras, que não quebra de linha; use sub, mark ou cor`);
    let ok = false;
    for (let i = 0; i < paras.length && !ok; i++) {
      const a = paras[i].t.indexOf(trecho);
      if (a >= 0) { spans.push({ i, a, z: a + trecho.length, tipo }); ok = true; }
    }
    if (!ok) throw new Error(`${ctx}: trecho "${trecho}" não existe na copy deste card`);
  }
  if (spans.length > 3) throw new Error(`${ctx}: ${spans.length} marcações (máximo 3 por card)`);
  paras.forEach((p, i) => (p.bs || []).forEach(([a, z]) => spans.push({ i, a, z, tipo: 'b', auto: true })));
  spans.sort((x, y) => x.i - y.i || x.a - y.a);
  for (let k = 1; k < spans.length; k++) if (spans[k].i === spans[k - 1].i && spans[k].a < spans[k - 1].z) throw new Error(`${ctx}: marcações sobrepostas (inclui o negrito que já vem da copy)`);
  return spans;
}
function htmlPar(p, i, spans) {
  let out = ''; let pos = 0;
  for (const s of spans.filter((x) => x.i === i)) { out += esc(p.t.slice(pos, s.a)) + MARCAS[s.tipo][0] + esc(p.t.slice(s.a, s.z)) + MARCAS[s.tipo][1]; pos = s.z; }
  out += esc(p.t.slice(pos));
  return p.b ? `<b>${out}</b>` : out;
}

/* ------------------------------------------------------------------ decisões de layout */
function escolherInterno(par, ctx) {
  const n = par.length; const ws = par.map((p) => nPal(p.t)); const W = ws.reduce((a, b) => a + b, 0); const maxW = Math.max(...ws);
  const curtos = ws.filter((x) => x <= 9).length; const resto = W - ws[0];
  const ok = {
    P4: n >= 4 && curtos >= n - 1 && maxW <= 14,
    P2: n >= 2 && ws[0] >= 3 && ws[0] <= 18 && resto >= 8 && fim(par[0].t),
    P6: n >= 2 && !ctx.usouP6 && ((ws[n - 1] >= 3 && ws[n - 1] <= 12 && fim(par[n - 1].t)) || (ws[0] >= 3 && ws[0] <= 12 && fim(par[0].t))),
    P9: n >= 2 && n <= 4 && ws.every((w) => w >= 4 && w <= 26),
    P3: W <= 40,
    P1: true,
  };
  if (ok.P4 && ctx.anterior !== 'P4') return 'P4';
  const prio = [['P9', 'P2', 'P3', 'P6', 'P1'], ['P2', 'P6', 'P9', 'P1', 'P3'], ['P6', 'P3', 'P9', 'P2', 'P1'], ['P1', 'P9', 'P2', 'P3', 'P6'], ['P3', 'P2', 'P1', 'P9', 'P6']][(ctx.n + ctx.k) % 5];
  const cand = prio.filter((v) => ok[v]);
  const recentes = ctx.recentes || [];
  return cand.find((v) => v !== ctx.anterior && !(recentes.length >= 2 && recentes.slice(-2).every((r) => r === v))) || cand.find((v) => v !== ctx.anterior) || cand[0];
}
function dividirSentencas(t) { return t.split(/(?<=[.!?”"])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ“"])/); }

function resolver(entrada, cars, catalogo) {
  const plano = { copy: entrada.copy, gerado: new Date().toISOString(), carrosseis: [] };
  let capaAnt = null; const capaUsos = {};
  const uso = {}; const usoGlobal = {};
  for (const c of cars) {
    const e = (entrada.carrosseis || {})[String(c.n)];
    if (!e) continue;
    if (!e.fotos || e.fotos.length < c.slides.length) throw new Error(`carrossel ${c.n}: precisa de ${c.slides.length} fotos, veio ${(e.fotos || []).length}`);
    const sans = e.fonte === 'sans';
    const o = c.n % 5;
    let prevPos = null; let prevVar = null; let usouP6 = false; let usouP7 = false; const usoLocal = {}; const vars = [];
    const cards = [];
    // papel sem foto: slide indicado, ou escolhido sozinho ("auto": slide 4 ou 5 com abertura curta e até 40 palavras)
    let papelSlide = e.papel;
    if (e.papel === 'auto') {
      const cand = c.slides.filter((sl, i) => i > 0 && i < c.slides.length - 1 && sl.k >= 4)
        .map((sl) => ({ k: sl.k, W: sl.paras.reduce((a, p) => a + nPal(p.t), 0), a: nPal(sl.paras[0].t) }))
        .filter((x) => x.W <= 40 && x.a <= 16 && x.a >= 3);
      papelSlide = cand.length ? cand.sort((x, y) => x.W - y.W)[0].k : null;
    }
    c.slides.forEach((sl, idx) => {
      const k = sl.k; const par = sl.paras; const ctx = `carrossel ${c.n}, slide ${k}`;
      const ajuste = ((e.ajustes || {})[String(k)]) || {};
      const foto = e.fotos[idx]; const cat = catalogo[foto];
      if (!cat) throw new Error(`${ctx}: foto "${foto}" não está em fotos/_catalogo.json`);
      if (!fs.existsSync(path.join(entrada._pasta, 'fotos', foto + '.jpg'))) throw new Error(`${ctx}: fotos/${foto}.jpg não existe`);
      const cor = ajuste.cor || PAD_COR[(o + idx) % PAD_COR.length];
      const zonas = cat.zonas && cat.zonas.length ? cat.zonas : ['base', 'topo', 'meio'];
      // posição: a zona livre da foto menos usada neste carrossel e no lote (nunca igual à do card anterior, se houver outra)
      const ordenadas = [...zonas].sort((x, y) => (usoLocal[x] || 0) - (usoLocal[y] || 0) || (usoGlobal[x] || 0) - (usoGlobal[y] || 0));
      let pos = ajuste.pos || ordenadas.find((z) => z !== prevPos) || ordenadas[0];
      const ultimo = idx === c.slides.length - 1;
      const card = { k, foto, bgpos: ajuste.bgpos || cat.pos || '50% 50%', pos, blocos: [], paras: par.length };
      const W = par.reduce((a, p) => a + nPal(p.t), 0);

      if (idx === 0) {                                              // capa
        const sent = dividirSentencas(par.map((p) => p.t).join(' '));
        const antes = capaUsos[foto] || [];                         // capas anteriores com esta MESMA foto
        const todas = [];
        for (const v of ['C1', 'C4', 'C2']) {
          if (v === 'C4' && sent.length < 2) continue;
          const combos = v === 'C4' ? [['vermelha', 'branca'], ['preta', 'branca'], ['vermelha', 'preta'], ['branca', 'preta'], ['preta', 'vermelha']]
            : [['branca'], ['preta'], ['vermelha']];
          combos.forEach((cb) => todas.push({ v, cb, principal: cb[cb.length - 1] }));
        }
        const rot = (c.n * 7 + 1) % todas.length;
        const ordem = todas.slice(rot).concat(todas.slice(0, rot));
        const livre = (x) => !antes.some((a) => a.variante === x.v || a.principal === x.principal);   // variação E cor diferentes da outra capa com a mesma foto
        const semVizinha = (x) => x.v !== capaAnt;
        let esc1 = ajuste.variante ? ordem.find((x) => x.v === ajuste.variante && (!ajuste.cor || x.principal === ajuste.cor)) : null;
        const livreCor = (x) => !antes.some((a) => a.principal === x.principal);
        esc1 = esc1 || ordem.find((x) => semVizinha(x) && livre(x)) || ordem.find((x) => semVizinha(x) && livreCor(x)) || ordem.find((x) => livre(x)) || ordem.find((x) => livreCor(x)) || ordem.find(semVizinha) || ordem[0];
        const v = esc1.v; card.variante = v; capaAnt = v; card.corCapa = esc1.principal;
        const repetida = antes.length > 0;
        // posição: se a foto já foi capa, usa outra zona livre quando existir
        if (!ajuste.pos && repetida) { const outras = zonas.filter((z) => !antes.some((a) => a.pos === z)); if (outras.length) card.pos = outras[0]; }
        // recorte e efeito diferentes quando a foto repete: aproxima em outra região da foto e inclina a caixa
        if (repetida) {
          const focos = (cat.focos && cat.focos.length ? cat.focos : ['78% 22%', '22% 30%', '50% 78%']);
          card.zoom = ajuste.zoom || 135; card.bgpos = ajuste.bgpos || focos[(antes.length - 1) % focos.length];
          card.efeito = 'recorte ' + card.zoom + '% em ' + card.bgpos + ', caixa inclinada';
        } else if (ajuste.zoom) { card.zoom = ajuste.zoom; }
        const incl = repetida ? ' torta' : '';
        if (v === 'C1') card.blocos.push({ tipo: 'caixa', cor: esc1.cb[0], estilo: 'centro' + incl, texto: 'titulo', paras: [0] });
        else if (v === 'C2') card.blocos.push({ tipo: 'linhas', cor: esc1.cb[0], estilo: 'centro', texto: 'titulo', paras: [0] });
        else { card.blocos.push({ tipo: 'caixa', cor: esc1.cb[0], estilo: 'curta estreita' + incl, texto: 'curta', paras: [0], fatia: [0, 1] });
               card.blocos.push({ tipo: 'caixa', cor: esc1.cb[1], estilo: '', texto: 'titulo', paras: [0], fatia: [1, sent.length] }); card.sentencas = sent; }
        capaUsos[foto] = antes.concat([{ variante: v, principal: esc1.principal, pos: card.pos, carrossel: c.n }]);
      } else if (papelSlide === k) {
        card.variante = 'P7'; usouP7 = true; card.pos = 'papel';
        card.blocos.push({ tipo: 'papel', cor: 'papel', paras: par.map((_, i) => i) });
      } else if (ultimo) {                                          // fechamento
        const ib0 = par.findIndex((p) => p.b); const nP = par.length;
        const corPre = cor === 'preta' ? 'preta' : 'branca';
        let pre = []; let bolds = []; let dep = []; let faixaUnica = false;
        if (ib0 >= 0) {                                             // há frase em negrito na copy: ela vira a faixa
          let fb = ib0; while (fb + 1 < nP && par[fb + 1].b) fb++;
          pre = par.map((_, i) => i).filter((i) => i < ib0); bolds = par.map((_, i) => i).filter((i) => i >= ib0 && i <= fb); dep = par.map((_, i) => i).filter((i) => i > fb);
        } else if (nP === 1 && c.n % 2 === 0) {                     // sem negrito e parágrafo único: caixa simples no fechamento (varia o lote)
          faixaUnica = true;
        } else {                                                    // sem negrito: a última frase da copy vira a faixa (só estilo, texto igual)
          pre = par.map((_, i) => i).filter((i) => i < nP - 1); bolds = [nP - 1];
        }
        if (faixaUnica) {
          card.variante = 'P1';
          card.blocos.push({ tipo: 'caixa', cor: corPre, estilo: '', texto: 'txt g', paras: [0] });
        } else {
          const corFaixa = ajuste.faixa || (corPre === 'preta' ? 'vermelha' : (c.n % 2 ? 'preta' : 'vermelha'));
          card.variante = 'P8';
          if (pre.length) card.blocos.push({ tipo: 'caixa', cor: corPre, estilo: '', texto: 'txt', paras: pre });
          card.blocos.push({ tipo: 'faixa', cor: corFaixa, estilo: 'faixa', texto: 'faixa', paras: bolds });
          if (dep.length) {
            const pd = dep.reduce((a, i) => a + nPal(par[i].t), 0);
            if (pd <= 16) card.blocos.push({ tipo: 'nota', cor: 'papel', estilo: `fita${c.n % 2 ? ' dir' : ''}${c.n % 3 === 0 ? ' verm' : ''}`, paras: dep, rot: c.n % 2 ? 3 : -3 });
            else card.blocos.push({ tipo: 'caixa', cor: 'branca', estilo: 'estreita', texto: 'txt', paras: dep });
          }
        }
      } else {                                                      // interno
        const v = ajuste.variante || escolherInterno(par, { n: c.n, k, anterior: prevVar, usouP6, recentes: vars });
        card.variante = v; const todos = par.map((_, i) => i);
        const corPrincipal = cor;
        if (v === 'P9') {
          const alt = corPrincipal === 'branca' ? 'preta' : (corPrincipal === 'preta' ? 'branca' : 'branca');
          todos.forEach((i, q) => card.blocos.push({ tipo: 'caixa', cor: q % 2 ? alt : corPrincipal, estilo: '', texto: 'txt', paras: [i] }));
        } else if (v === 'P4') card.blocos.push({ tipo: 'caixa', cor: corPrincipal, estilo: '', texto: 'lista', paras: todos });
        else if (v === 'P3') card.blocos.push({ tipo: 'linhas', cor: corPrincipal, estilo: '', texto: W <= 22 ? 'media' : 'menor', paras: todos });
        else if (v === 'P2') {
          const hc = corPrincipal === 'branca' ? (c.n % 2 ? 'vermelha' : 'preta') : 'branca';
          card.blocos.push({ tipo: 'caixa', cor: hc, estilo: `curta estreita${(c.n + k) % 2 ? ' torta' : ' torta inv'}${(c.n + k) % 3 === 0 ? ' dir' : ''}`, texto: 'curta', paras: [0] });
          card.blocos.push({ tipo: 'caixa', cor: corPrincipal, estilo: '', texto: 'txt', paras: todos.slice(1) });
        } else if (v === 'P6') {
          usouP6 = true; const n = par.length;
          const primeira = nPal(par[0].t) >= 3 && nPal(par[0].t) <= 9 && fim(par[0].t);
          const iN = primeira ? 0 : n - 1;
          const nota = { tipo: 'nota', cor: 'papel', estilo: `fita${(c.n + k) % 2 ? ' dir' : ''}${(c.n + k) % 3 === 0 ? ' verm' : ''}`, paras: [iN], rot: (c.n + k) % 2 ? 4 : -4 };
          const resto = { tipo: 'caixa', cor: corPrincipal, estilo: '', texto: 'txt', paras: todos.filter((i) => i !== iN) };
          card.blocos = primeira ? [nota, resto] : [resto, nota];
        } else { // P1
          card.blocos.push({ tipo: 'caixa', cor: corPrincipal, estilo: '', texto: W <= 20 ? 'txt g' : 'txt', paras: todos });
        }
      }
      card.marcas = resolverMarcas(par, (e.marcas || {})[String(k)], ctx);
      if (card.variante === 'P1' && card.marcas.some((m) => m.tipo === 'risco')) card.variante = 'P5';
      const bp = card.blocos.find((b) => b.tipo !== 'nota') || card.blocos[0];
      card.caixa = card.variante === 'P7' ? 'papel-papel' : `${card.pos}-${bp.cor}`;
      if (card.variante !== 'P7') { usoLocal[card.pos] = (usoLocal[card.pos] || 0) + 1; usoGlobal[card.pos] = (usoGlobal[card.pos] || 0) + 1; }
      prevPos = card.variante === 'P7' ? prevPos : card.pos; prevVar = card.variante; if (idx > 0) vars.push(card.variante);
      uso[foto] = (uso[foto] || 0) + (card.variante === 'P7' ? 0 : 1);
      cards.push(card);
    });
    plano.carrosseis.push({ n: c.n, titulo: c.titulo, slug: `${String(c.n).padStart(2, '0')}-${slugar(c.titulo)}`, fonte: e.fonte || 'serif', cards });
  }
  plano.usoFotos = uso;
  return plano;
}

/* ------------------------------------------------------------------ regras de foto do usuário */
// catálogo: cada foto tem grupo "estudo" (você estudando, caderno, mesa com monitor/tela) ou "outro" (rua, sol, academia, comida...)
function regrasFoto(plano, catalogo, regras) {
  const r = Object.assign({ minEstudo: 0.6, capasSoEstudo: true, excecoesCapa: [] }, regras || {});
  const erros = []; let com = 0, estudo = 0; const capasFora = [];
  for (const c of plano.carrosseis) c.cards.forEach((d, i) => {
    if (d.variante === 'P7') return;
    com++; const g = (catalogo[d.foto] || {}).grupo;
    if (g === 'estudo') estudo++;
    if (i === 0 && r.capasSoEstudo && g !== 'estudo' && !r.excecoesCapa.includes(c.n)) capasFora.push(`${String(c.n).padStart(2, '0')} (${d.foto})`);
  });
  const pct = com ? estudo / com : 1;
  if (pct < r.minEstudo) erros.push(`só ${Math.round(100 * pct)}% dos cards com foto são de estudo/caderno/mesa (mínimo ${Math.round(100 * r.minEstudo)}%)`);
  if (capasFora.length) erros.push(`capas sem foto de estudo/mesa/tela: ${capasFora.join(', ')} (exceções liberadas: ${r.excecoesCapa.join(', ') || 'nenhuma'})`);
  // por carrossel: nenhum com menos de 50% de estudo
  for (const c of plano.carrosseis) {
    const fs = c.cards.filter((d) => d.variante !== 'P7'); const e = fs.filter((d) => (catalogo[d.foto] || {}).grupo === 'estudo').length;
    if (fs.length && e / fs.length < 0.5) erros.push(`carrossel ${c.n}: só ${e} de ${fs.length} fotos de estudo/mesa`);
  }
  plano.fotoStats = { comFoto: com, estudo, outros: com - estudo, pctEstudo: Math.round(100 * pct) };
  return erros;
}

/* ------------------------------------------------------------------ HTML */
function blocoHtml(b, card, car, cars) {
  const sl = cars.find((x) => x.n === car.n).slides.find((s) => s.k === card.k); const par = sl.paras;
  const sansCls = car.fonte === 'sans' ? ' sans' : '';
  const sp = card.marcas;
  const P = (i) => htmlPar(card.k === 1 ? { ...par[i], b: false } : par[i], i, sp);
  const txtCls = (t) => ({ titulo: 'pe-titulo', curta: 'pe-curta', txt: 'pe-txt', 'txt g': 'pe-txt g', faixa: 'pe-faixa-txt' }[t]);
  if (b.tipo === 'caixa' && b.texto === 'lista') return `  <div class="pe-caixa ${b.cor}${sansCls}"><ul class="pe-lista marcas" data-papel="corpo">${b.paras.map((i) => `<li>${P(i)}</li>`).join('')}</ul></div>`;
  if (b.tipo === 'caixa' || b.tipo === 'faixa') {
    const papel = b.texto === 'titulo' ? 'titulo' : 'corpo';
    let corpo;
    if (b.fatia) {            // capa com duas caixas: fatia de sentenças do parágrafo único
      const sent = card.sentencas; const txt = sent.slice(b.fatia[0], b.fatia[1]).join(' ');
      const ini = par[0].t.indexOf(txt);
      const dentro = sp.filter((s) => s.i === 0 && s.a >= ini && s.z <= ini + txt.length).map((s) => ({ ...s, a: s.a - ini, z: s.z - ini }));
      corpo = `<p class="${txtCls(b.texto)}" data-papel="${papel}">${htmlPar({ t: txt, b: false }, 0, dentro)}</p>`;
    } else corpo = b.paras.map((i) => `<p class="${txtCls(b.texto)}" data-papel="${papel}">${P(i)}</p>`).join('');
    return `  <div class="pe-caixa ${b.cor}${b.estilo ? ' ' + b.estilo : ''}${sansCls}">${corpo}</div>`;
  }
  if (b.tipo === 'linhas') {
    const cls = b.texto === 'titulo' ? '' : ` class="${b.texto}"`; const papel = b.texto === 'titulo' ? 'titulo' : 'corpo';
    return `  <div class="pe-linhas ${b.cor}${b.estilo ? ' ' + b.estilo : ''}${sansCls}">${b.paras.map((i) => `<p${cls} data-papel="${papel}"><span>${P(i)}</span></p>`).join('')}</div>`;
  }
  if (b.tipo === 'nota') return `  <p class="pe-nota papel ${b.estilo}" style="--rot:${b.rot}deg">${b.paras.map(P).join(' ')}</p>`;
  throw new Error('bloco desconhecido ' + b.tipo);
}
function cardHtml(car, card, cars, ultimo) {
  const attrs = `class="card pe" data-perfil="pessoal" data-estilo="pessoal-organico" data-variante="${card.variante}-${card.k === 1 ? 'capa' : 's' + card.k}" data-arquivo="${String(car.n).padStart(2, '0')}-s${card.k}"${ultimo ? ' data-fechamento' : ''}`;
  const sl = cars.find((x) => x.n === car.n).slides.find((s) => s.k === card.k); const par = sl.paras;
  if (card.variante === 'P7') {
    const b = card.blocos[0]; const sp = card.marcas; const sans = car.fonte === 'sans' ? ' sans' : '';
    const t = `<p class="pe-titulo" data-papel="titulo">${htmlPar(par[0], 0, sp)}</p>`;
    const r = par.slice(1).map((_, i) => `<p class="pe-txt" data-papel="corpo">${htmlPar(par[i + 1], i + 1, sp)}</p>`).join('');
    return `<section ${attrs.replace('class="card pe"', 'class="card pe" data-bg="papel" data-papel-sem-foto')}>\n  <div class="grao"></div>\n  <div class="pe-papel${sans}" style="--marca:var(--vermelho);--marca-fundo:var(--vermelho);--marca-tinta:#fff">${t}${r}</div>\n</section>`;
  }
  const blocos = card.blocos.map((b) => blocoHtml(b, card, car, cars)).join('\n');
  return `<section ${attrs}>\n  <div class="pe-foto" style="background-image:url('../fotos/${card.foto}.jpg');background-position:${card.bgpos}${card.zoom ? ';background-size:' + card.zoom + '% auto' : ''}"></div>\n <div class="pe-pilha ${card.pos}">\n${blocos}\n </div>\n</section>`;
}
function gerarHtml(raiz, plano, cars) {
  fs.mkdirSync(path.join(raiz, 'pecas'), { recursive: true });
  for (const car of plano.carrosseis) {
    const secs = car.cards.map((cd, i) => cardHtml(car, cd, cars, i === car.cards.length - 1)).join('\n\n');
    const html = `<!doctype html>\n<html lang="pt-BR"><head><meta charset="utf-8">\n<title>Carrossel ${String(car.n).padStart(2, '0')} · ${esc(car.titulo)}</title>\n<link rel="stylesheet" href="../kit/base.css"><link rel="stylesheet" href="../kit/estilos/pessoal-organico.css">\n</head><body>\n<!-- Modelo pessoal orgânico. Texto vem do markdown (${esc(plano.copy)}), gerado por kit/tools/pessoal.cjs. Não edite a copy aqui. -->\n\n${secs}\n</body></html>\n`;
    fs.writeFileSync(path.join(raiz, 'pecas', car.slug + '.html'), html);
  }
}

/* ------------------------------------------------------------------ plano em markdown + direcao.json */
function planoMd(plano, cars) {
  const L = [];
  L.push('# Plano · modelo pessoal orgânico', '', `Copy: \`${plano.copy}\` · ${plano.carrosseis.length} carrosséis · ${plano.carrosseis.reduce((a, c) => a + c.cards.length, 0)} cards`, '');
  const tot = {}; plano.carrosseis.forEach((c) => c.cards.forEach((d) => { tot[d.variante] = (tot[d.variante] || 0) + 1; }));
  if (plano.fotoStats) L.push(`Fotos: ${plano.fotoStats.pctEstudo}% de estudo/caderno/mesa (${plano.fotoStats.estudo} de ${plano.fotoStats.comFoto} cards com foto); outros ${plano.fotoStats.outros}.`, '');
  L.push('## Variações no lote', '', Object.entries(tot).sort().map(([k, v]) => `${k}: ${v}`).join(' · '), '');
  const pos = {}, cor = {}; plano.carrosseis.forEach((c) => c.cards.forEach((d) => { const [p, q] = d.caixa.split('-'); pos[p] = (pos[p] || 0) + 1; cor[q] = (cor[q] || 0) + 1; }));
  L.push('Posição da caixa: ' + Object.entries(pos).map(([k, v]) => `${k} ${v}`).join(' · '), '', 'Cor da caixa: ' + Object.entries(cor).map(([k, v]) => `${k} ${v}`).join(' · '), '');
  for (const car of plano.carrosseis) {
    L.push(`## ${String(car.n).padStart(2, '0')} · ${car.titulo}`, '', `Fonte: ${car.fonte === 'sans' ? 'sans (Plex Sans)' : 'serifa (Literata)'}`, '', '| Slide | Foto | Variação | Caixa | Marcações | Texto |', '|---|---|---|---|---|---|');
    const sls = cars.find((x) => x.n === car.n).slides;
    car.cards.forEach((d, i) => {
      const par = sls[i].paras; const ms = d.marcas.map((m) => `${m.tipo}: ${par[m.i].t.slice(m.a, m.z)}`).join('; ') || '-';
      L.push(`| ${d.k} | ${d.variante === 'P7' ? '(papel)' : d.foto}${d.efeito ? ' (' + d.efeito + ')' : ''} | ${d.variante} | ${d.caixa} | ${ms.replace(/\|/g, '/')} | ${par[0].t.slice(0, 48).replace(/\|/g, '/')}… |`);
    });
    L.push('');
  }
  return L.join('\n');
}
function direcao(plano) {
  return { pecas: plano.carrosseis.map((c) => ({
    id: 'E' + String(c.n).padStart(2, '0'), tipo: 'pessoal', estilo: 'pessoal-organico', formato: 'carrossel',
    capa: c.cards[0].variante, internos: c.cards.slice(1).map((d) => d.variante), caixas: c.cards.map((d) => d.caixa),
    justificativa: 'lote do perfil pessoal: a variação vem de capa, posição e cor da caixa e tipo de card',
    fotos: c.cards.map((d) => d.foto) })) };
}

/* ------------------------------------------------------------------ conferência da copy no navegador */
async function conferir(raiz, plano, cars) {
  const tries = [process.env.ROTA_PLAYWRIGHT, process.env.FEED_PLAYWRIGHT_PATH,
    'C:/Users/Lenovo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright', 'playwright'].filter(Boolean);
  let pw; for (const t of tries) { try { pw = require(t); break; } catch (_) { /* próximo */ } }
  if (!pw) { console.error('Playwright não encontrado (ROTA_PLAYWRIGHT).'); process.exit(2); }
  const browser = await pw.chromium.launch();
  let erros = 0, cartoes = 0;
  for (const car of plano.carrosseis) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 1500 } });
    await page.goto('file:///' + path.resolve(raiz, 'pecas', car.slug + '.html').replace(/\\/g, '/'), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const reais = await page.$$eval('.card', (els) => els.map((e) => e.innerText));
    await page.close();
    const sls = cars.find((x) => x.n === car.n).slides;
    car.cards.forEach((d, i) => {
      cartoes++;
      const esperado = norm(sls[i].paras.map((p) => p.t).join(' '));
      const real = norm(reais[i] || '');
      if (esperado !== real) { erros++; console.log(`DIFERENÇA ${car.slug} slide ${d.k}\n  esperado: ${esperado}\n  no card : ${real}`); }
    });
  }
  await browser.close();
  console.log(erros ? `\n${erros} card(s) com texto diferente do markdown.` : `Copy conferida: ${cartoes} cards idênticos ao markdown.`);
  process.exit(erros ? 1 : 0);
}

/* ------------------------------------------------------------------ CLI */
(async () => {
  const [cmd, a, b] = process.argv.slice(2);
  try {
    if (cmd === 'plano') {
      const entrada = JSON.parse(fs.readFileSync(a, 'utf8')); const raiz = path.resolve(b); entrada._pasta = raiz;
      const md = path.resolve(path.dirname(path.resolve(a)), entrada.copy).replace(/\\/g, '/'); const cars = lerCopy(fs.existsSync(md) ? md : path.resolve(entrada.copy));
      const catalogo = JSON.parse(fs.readFileSync(path.join(raiz, 'fotos', '_catalogo.json'), 'utf8'));
      const plano = resolver(entrada, cars, catalogo); plano.copy = path.basename(entrada.copy);
      const errFoto = regrasFoto(plano, catalogo, entrada.regras);
      if (errFoto.length) throw new Error('regras de foto: ' + errFoto.join(' | '));
      plano.copyAbs = fs.existsSync(md) ? md : path.resolve(entrada.copy);
      fs.writeFileSync(path.join(raiz, 'plano.json'), JSON.stringify(plano, null, 1));
      fs.writeFileSync(path.join(raiz, 'direcao.json'), JSON.stringify(direcao(plano), null, 1));
      fs.writeFileSync(path.join(raiz, 'PLANO.md'), planoMd(plano, cars));
      console.log(`Plano: ${plano.carrosseis.length} carrosséis, ${plano.carrosseis.reduce((x, c) => x + c.cards.length, 0)} cards -> plano.json, direcao.json, PLANO.md`);
    } else if (cmd === 'html' || cmd === 'conferir') {
      const raiz = path.resolve(a); const plano = JSON.parse(fs.readFileSync(path.join(raiz, 'plano.json'), 'utf8')); const cars = lerCopy(plano.copyAbs);
      if (cmd === 'html') { gerarHtml(raiz, plano, cars); console.log(`${plano.carrosseis.length} HTML em ${path.join(raiz, 'pecas')}`); }
      else await conferir(raiz, plano, cars);
    } else { console.error('uso: pessoal.cjs plano <entrada.json> <pasta> | html <pasta> | conferir <pasta>'); process.exit(2); }
  } catch (err) { console.error('ERRO: ' + err.message); process.exit(1); }
})();
