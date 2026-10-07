/* Preflight Rota de Ataque. Roda DENTRO da página (injetado pelo render.cjs).
   Retorna { cards: [{ id, erros: [], avisos: [] }] }. Erro bloqueia a exportação.
   Marcações aceitas no HTML:
     .card[data-fechamento]  último card do carrossel (sem "Deslize")
     .card[data-estatico]    post único (sem "Deslize")
     [data-sangria]          tipografia decorativa que pode sair da margem/canvas
     [data-sobrepoe]         texto que pode encostar em outro texto de propósito (carimbo, adesivo)
     [data-contraste-ok]     texto sobre foto já tratada (gradiente/camada), conferido no PNG
     [data-decor]            elemento sem leitura (código de barras, números decorativos de selo)
     .card[data-perfil=pessoal] modelo pessoal orgânico: perfil pessoal, NÃO Rota de Ataque.
                             Proíbe logo e assinatura da Rota; "Deslize" opcional; travessão e
                             palavra vetada viram aviso (a copy é do usuário e é congelada: relate, não edite).
*/
(() => {
  const MARGEM_MIN = 72;
  const PISO = { geral: 24, corpo: 34, mao: 42, titulo: 60 };
  const PROIBIDAS = ['utiliz', 'transform', 'otimiz', 'alavanc', 'crucial', 'mergulh', 'revolucion', 'implement'];
  const out = { cards: [] };
  const cards = [...document.querySelectorAll('.card')];

  const lum = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null;
    const p = m[1].split(',').map((x) => parseFloat(x));
    const a = p[3] === undefined ? 1 : p[3];
    const ch = p.slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return { L: 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2], a };
  };
  const bgDe = (el) => {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e);
      const bi = cs.backgroundImage || 'none';
      if (/linear-gradient/.test(bi)) { const gm = bi.match(/rgba?\([^)]+\)/); const gl = gm && lum(gm[0]); if (gl && gl.a > 0.6) return gl; }   // fundo sólido feito com gradiente (marca-texto)
      if (bi !== 'none' && !/gradient|data:image\/svg/.test(bi)) return { foto: true };
      const l = lum(cs.backgroundColor);
      if (l && l.a > 0.6) return l;
    }
    return lum('rgb(244,241,235)');
  };
  const visivel = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
    const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0;
  };
  const tem = (el, attr) => !!el.closest(`[${attr}]`);

  cards.forEach((card, i) => {
    const id = card.dataset.arquivo || card.id || `card-${String(i + 1).padStart(2, '0')}`;
    const erros = []; const avisos = [];
    const cr = card.getBoundingClientRect();
    const H = card.classList.contains('story') ? 1920 : 1350;
    if (Math.round(cr.width) !== 1080 || Math.round(cr.height) !== H) erros.push(`canvas ${cr.width}x${cr.height}, esperado 1080x${H}`);

    // nós de texto visíveis
    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
    const linhas = []; let texto = '';
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const t = n.textContent.replace(/\s+/g, ' ').trim(); if (!t) continue;
      const el = n.parentElement; if (!visivel(el) || tem(el, 'data-decor')) continue;
      texto += ' ' + t;
      const cs = getComputedStyle(el);
      const fs = parseFloat(cs.fontSize);
      const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
      const papel = el.closest('[data-papel]')?.dataset.papel || '';
      const curto = t.length > 60 ? t.slice(0, 57) + '...' : t;
      // pisos de tamanho
      if (fs < PISO.geral) erros.push(`fonte ${fs}px < ${PISO.geral}px: "${curto}"`);
      if (fam === 'Caveat' && fs < PISO.mao) erros.push(`manuscrito ${fs}px < ${PISO.mao}px: "${curto}"`);
      if (papel === 'corpo' && fs < PISO.corpo) erros.push(`corpo ${fs}px < ${PISO.corpo}px: "${curto}"`);
      if (papel === 'titulo' && fs < PISO.titulo) erros.push(`título ${fs}px < ${PISO.titulo}px: "${curto}"`);
      // margens e corte
      const range = document.createRange(); range.selectNodeContents(n);
      const rects = [...range.getClientRects()].filter((r) => r.width > 1 && r.height > 1);
      const sangria = tem(el, 'data-sangria');
      for (const r0 of rects) {
        // caixa da tinta: o retângulo do range vai da ascendente à descendente da fonte, independente do line-height.
        // Aproxima a tinta pela linha de base: de 0,95em acima até 0,05em abaixo do fundo menos a descendente (~0,2em).
        const base = r0.bottom - fs * 0.2;
        const r = { left: r0.left, right: r0.right, top: Math.max(r0.top, base - fs * 0.78), bottom: Math.min(r0.bottom, base + fs * (/[gjpqyçÇ,;Q]/.test(t) ? 0.2 : 0.03)) };
        const x0 = r.left - cr.left, y0 = r.top - cr.top, x1 = r.right - cr.left, y1 = r.bottom - cr.top;
        if (!sangria && (x0 < MARGEM_MIN - 0.5 || y0 < MARGEM_MIN - 0.5 || x1 > 1080 - MARGEM_MIN + 0.5 || y1 > H - MARGEM_MIN + 0.5)) {
          erros.push(`texto fora da margem de ${MARGEM_MIN}px (x ${Math.round(x0)}–${Math.round(x1)}, y ${Math.round(y0)}–${Math.round(y1)}): "${curto}"`); break;
        }
        linhas.push({ el, r, t: curto });
      }
      // contraste
      if (!tem(el, 'data-contraste-ok')) {
        const fg = lum(cs.color); const bg = bgDe(el);
        if (bg.foto) avisos.push(`texto sobre foto sem data-contraste-ok: "${curto}" (confira no PNG)`);
        else if (fg && bg) {
          const c = (Math.max(fg.L, bg.L) + 0.05) / (Math.min(fg.L, bg.L) + 0.05);
          const need = fs >= 48 || (fs >= 32 && parseInt(cs.fontWeight, 10) >= 600) ? 3 : 4.5;
          if (c < need) erros.push(`contraste ${c.toFixed(2)}:1 < ${need}:1: "${curto}"`);
        }
      }
      // overflow do próprio bloco
      if (el.scrollWidth > el.clientWidth + 2 && ['hidden', 'clip'].includes(cs.overflowX)) erros.push(`texto cortado no bloco: "${curto}"`);
    }

    // sobreposição entre linhas de elementos diferentes
    for (let a = 0; a < linhas.length; a++) for (let b = a + 1; b < linhas.length; b++) {
      const A = linhas[a], B = linhas[b];
      if (A.el === B.el || A.el.contains(B.el) || B.el.contains(A.el)) continue;
      if (tem(A.el, 'data-sobrepoe') || tem(B.el, 'data-sobrepoe')) continue;
      const w = Math.min(A.r.right, B.r.right) - Math.max(A.r.left, B.r.left);
      const h = Math.min(A.r.bottom, B.r.bottom) - Math.max(A.r.top, B.r.top);
      if (w > 4 && h > 4) erros.push(`texto sobreposto: "${A.t}" × "${B.t}"`);
    }

    // regras de copy e navegação
    texto = texto.trim();
    const pessoal = card.dataset.perfil === 'pessoal';
    const copyMsg = pessoal ? avisos : erros;
    if (texto.includes('—')) copyMsg.push(pessoal ? 'travessão "—" na copy do usuário (não edite; relate ao usuário)' : 'travessão "—" na arte');
    const low = texto.toLowerCase();
    PROIBIDAS.forEach((p) => { if (low.includes(p)) copyMsg.push(`palavra vetada na copy: "${p}…"${pessoal ? ' (copy do usuário: relate, não edite)' : ''}`); });
    if (pessoal && /quem traça a rota|rotadeataque\.com/i.test(texto)) erros.push('modelo pessoal com assinatura ou site da Rota de Ataque (proibido)');
    else if (pessoal && /rota de ataque/i.test(texto)) avisos.push('modelo pessoal cita "Rota de Ataque": confira se está na copy do usuário');
    [...card.querySelectorAll('*')].forEach((el) => {
      if (el.children.length === 0 && /^\s*\d{1,2}\s*\/\s*\d{1,2}\s*$/.test(el.textContent) && !tem(el, 'data-data')) erros.push(`contador de card "${el.textContent.trim()}" (proibido; se for data, marque data-data)`);
    });
    const fim = card.hasAttribute('data-fechamento') || card.hasAttribute('data-estatico');
    const temDeslize = /deslize/i.test(texto);
    if (fim && temDeslize) erros.push('"Deslize" no último card ou post estático');
    if (!fim && !temDeslize && !pessoal) erros.push('falta "Deslize →" (marque data-fechamento no último card ou data-estatico no post)');
    const logos = [...card.querySelectorAll('img')].filter((im) => /logo/i.test(im.getAttribute('src') || '') && visivel(im));
    if (pessoal) { if (logos.length) erros.push(`${logos.length} logo(s) no modelo pessoal (proibido: perfil pessoal não leva logo da Rota)`); }
    else if (logos.length !== 1) erros.push(`${logos.length} logos visíveis (exigido: 1)`);
    if (pessoal) {
      const pl = card.querySelector('.pe-pilha');
      if (pl) {
        const h = pl.getBoundingClientRect().height;
        if (h > 0.72 * H) erros.push(`blocos de texto ocupam ${Math.round(100 * h / H)}% do card (máx. 72%): mude de posição/variação, não corte a copy`);
        else if (h > 0.58 * H) avisos.push(`blocos de texto ocupam ${Math.round(100 * h / H)}% do card; confira se a foto ainda aparece`);
      }
    }
    if (pessoal && !card.hasAttribute('data-papel-sem-foto') && !card.querySelector('.pe-foto')) erros.push('modelo pessoal sem foto de fundo (.pe-foto); card de papel precisa de data-papel-sem-foto');
    [...card.querySelectorAll('img')].forEach((im) => { if (!im.complete || im.naturalWidth === 0) erros.push(`imagem não carregou: ${im.getAttribute('src')}`); });

    out.cards.push({ id, estilo: card.dataset.estilo || '', variante: card.dataset.variante || '', erros: [...new Set(erros)], avisos: [...new Set(avisos)] });
  });

  // fontes
  const falhas = [...document.fonts].filter((f) => f.status === 'error').map((f) => f.family);
  if (falhas.length) out.cards.forEach((c) => c.erros.push(`fonte não carregou: ${[...new Set(falhas)].join(', ')}`));
  return out;
})();
