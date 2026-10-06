/* Ajuste de tamanho (fit) e preflight automático por card. Preflight aprovado NÃO aprova o visual. */
(function () {
  const IGNORED = ['·', '|', '||'];
  const tokens = (s) => s.replace(/[_·|\s]+/g, '').split('').sort();
  const lum = (rgb) => { const [r, g, b] = rgb.map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; };
  const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05); };
  function bgOf(el) {
    for (let e = el; e; e = e.parentElement) {
      const c = parse(getComputedStyle(e).backgroundColor);
      if (c.length >= 3 && (c.length === 3 || c[3] > .9)) return c.slice(0, 3);
    }
    return [255, 255, 255];
  }
  function textNodes(root, skipUi) {
    const out = []; const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const n = w.currentNode; if (!n.textContent.trim()) continue;
      if (skipUi && n.parentElement.closest('[data-ui]')) continue;
      out.push(n);
    }
    return out;
  }
  function rectsOf(node) { const r = document.createRange(); r.selectNodeContents(node); return [...r.getClientRects()].filter((x) => x.width > 1 && x.height > 1); }

  function fit(card) {
    const stage = card.querySelector('.stage'); if (!stage) return;
    const cr = card.getBoundingClientRect();
    const steps = [...card.querySelectorAll('[data-fit]')].map((el) => { const [min, prio] = el.dataset.fit.split(',').map(Number); return { el, min, prio: prio ?? 1 }; }).sort((a, b) => a.prio - b.prio);
    const over = () => {
      const r = [...stage.children].map((c) => c.getBoundingClientRect());
      const top = Math.min(...r.map((x) => x.top)) - cr.top; const bottom = Math.max(...r.map((x) => x.bottom)) - cr.top;
      return bottom > 1204 || top < 84;
    };
    let guard = 400;
    while (over() && guard--) {
      let done = false;
      for (const s of steps) {
        const cur = parseFloat(getComputedStyle(s.el).fontSize);
        if (cur - 2 >= s.min) { s.el.style.fontSize = (cur - 2) + 'px'; done = true; break; }
      }
      if (!done) break;
    }
    card.querySelectorAll('[data-fitw]').forEach((el) => {
      const min = Number(el.dataset.fitw); let g = 200;
      while (el.scrollWidth > el.clientWidth + 1 && g--) { const cur = parseFloat(getComputedStyle(el).fontSize); if (cur - 2 < min) break; el.style.fontSize = (cur - 2) + 'px'; }
    });
  }

  function preflight(card) {
    const fails = []; const cr = card.getBoundingClientRect();
    const rel = (r) => ({ l: r.left - cr.left, t: r.top - cr.top, r: r.right - cr.left, b: r.bottom - cr.top });
    // 1. texto igual à copy
    const expected = JSON.parse(card.dataset.expected).join(' ');
    const dom = textNodes(card, true).map((n) => n.textContent).join(' ');
    const a = tokens(dom).join('\u0001'), b = tokens(expected).join('\u0001');
    if (a !== b) {
      const A = tokens(dom), B = tokens(expected); const cnt = (arr) => arr.reduce((m, x) => (m[x] = (m[x] || 0) + 1, m), {});
      const ca = cnt(A), cb = cnt(B); const diff = [];
      new Set([...Object.keys(ca), ...Object.keys(cb)]).forEach((k) => { if ((ca[k] || 0) !== (cb[k] || 0)) diff.push(`${k}: dom ${ca[k] || 0} x copy ${cb[k] || 0}`); });
      fails.push('texto DOM difere da copy: ' + diff.slice(0, 8).join('; '));
    }
    // 2. margens
    let minL = 9999, minT = 9999, minR = 9999, minB = 9999;
    const overlays = [...card.querySelectorAll('.postit, .carimbo:not(.fila .carimbo), .mascote, .polaroide')];
    const overlayBoxes = overlays.map((o) => ({ o, r: rel(o.getBoundingClientRect()) }));
    textNodes(card, false).forEach((n) => {
      rectsOf(n).forEach((rr) => {
        const r = rel(rr);
        minL = Math.min(minL, r.l); minT = Math.min(minT, r.t); minR = Math.min(minR, 1080 - r.r); minB = Math.min(minB, 1350 - r.b);
        const owner = overlays.find((o) => o.contains(n.parentElement));
        overlayBoxes.forEach(({ o, r: ob }) => {
          if (o === owner || o.contains(n.parentElement)) return;
          const s = 8;
          if (r.l < ob.r - s && r.r > ob.l + s && r.t < ob.b - s && r.b > ob.t + s) fails.push(`texto "${n.textContent.trim().slice(0, 30)}" colide com .${o.className.split(' ')[0]}`);
        });
      });
    });
    if (minL < 72 || minT < 72 || minR < 72 || minB < 72) fails.push(`margem < 72 px (esq ${minL.toFixed(0)}, topo ${minT.toFixed(0)}, dir ${minR.toFixed(0)}, base ${minB.toFixed(0)})`);
    // 3. tamanhos
    card.querySelectorAll('[data-min]').forEach((el) => { const fs = parseFloat(getComputedStyle(el).fontSize); if (fs + .1 < Number(el.dataset.min)) fails.push(`fonte ${fs}px < ${el.dataset.min}px em .${el.className.split(' ')[0]}`); });
    // 4. overflow
    card.querySelectorAll('.stage > *').forEach((el) => { const r = rel(el.getBoundingClientRect()); if (r.b > 1214 || r.t < 60) fails.push(`bloco fora da área útil (${r.t.toFixed(0)}..${r.b.toFixed(0)})`); });
    card.querySelectorAll('[data-fitw]').forEach((el) => { if (el.scrollWidth > el.clientWidth + 1) fails.push('texto focal transborda na largura'); });
    // 5. logo e pílula
    if (card.querySelectorAll('img.logo').length !== 1) fails.push('logo: esperado exatamente 1');
    const wantPill = card.dataset.pill === '1'; if ((card.querySelectorAll('.pill').length === 1) !== wantPill) fails.push('"Deslize" ' + (wantPill ? 'ausente' : 'presente fora de lugar'));
    // 6. contraste
    textNodes(card, false).forEach((n) => {
      const el = n.parentElement; const cs = getComputedStyle(el); const fg = parse(cs.color).slice(0, 3); const bg = bgOf(el);
      const size = parseFloat(cs.fontSize); const need = size >= 48 ? 3 : 4.5; const c = ratio(fg, bg);
      if (c < need) fails.push(`contraste ${c.toFixed(2)} < ${need} em "${n.textContent.trim().slice(0, 24)}"`);
    });
    // 7. fontes
    ['700 20px Rajdhani', '400 20px "IBM Plex Sans"', '700 20px "Space Grotesk"', '500 20px "IBM Plex Mono"', 'italic 400 20px "Instrument Serif"', '700 20px Caveat'].forEach((f) => { if (!document.fonts.check(f)) fails.push('fonte não carregada: ' + f); });
    // 8. travessão
    if (card.textContent.includes('—')) fails.push('travessão visível');
    return { fails, margins: { l: +minL.toFixed(1), t: +minT.toFixed(1), r: +minR.toFixed(1), b: +minB.toFixed(1) } };
  }

  window.__preflightAll = () => [...document.querySelectorAll('.card')].map((c) => ({ card: c.dataset.card, variant: c.dataset.variant, ...preflight(c) }));
  (async () => {
    await document.fonts.ready;
    await Promise.all(['700 20px Rajdhani', '400 20px "IBM Plex Sans"', '600 20px "IBM Plex Sans"', '700 20px "Space Grotesk"', '500 20px "IBM Plex Mono"', '600 20px "IBM Plex Mono"', 'italic 400 20px "Instrument Serif"', '700 20px Caveat'].map((f) => document.fonts.load(f, 'Aaçãõ0123')));
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
    document.querySelectorAll('.card').forEach(fit);
    window.__ready = true;
  })();
})();
