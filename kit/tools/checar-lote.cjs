#!/usr/bin/env node
/* Verifica o mapa de um lote ANTES de desenhar.  Uso: node kit/tools/checar-lote.cjs direcao.json
   direcao.json:
   { "pecas": [ { "id": "P01", "tipo": "noticia", "estilo": "painel-oficial", "formato": "carrossel",
                  "capa": "C2", "internos": ["I1","I3","I4","I5"], "cta": "CTA-DATA", "fechamento": "F1" } ] }
   tipo: noticia | dica-estudo | conteudo | motivacao | frase | recurso | pessoal
   Modelo pessoal orgânico (tipo "pessoal", estilo "pessoal-organico"; só quando o usuário pedir "modelo pessoal"):
     sem fechamento; campo "caixas" com uma entrada "posição-cor" por card (capa incluída), ex.: ["meio-branca","topo-preta",...]
     posição: topo | meio | base | papel ; cor: branca | preta | vermelha | papel
   formato: carrossel | estatico | story
   Sai com código 1 se houver ERRO. AVISO não bloqueia, mas precisa de justificativa no mapa ("justificativa": "...").
*/
const fs = require('fs');
const ESTILOS = {
  'painel-oficial': { capas: ['C1','C2','C3','C4','C5','C6','C7','C8'], internos: ['I1','I2','I3','I4','I5','I6','I7','I8','I9'] },
  'ficha-missao':   { capas: ['RECIBO','PRAZO','RECIBO-FOTO','POSTER'], internos: ['A','B','C','D','E','F','G','H','A+M'] },
  'mapa-ilustrado': { capas: ['V0','V0-JANELAS','V0-PERSONAGEM'], internos: ['V1','V2','V3','V4','V5','V6','V7','V8'] },
  'anotado':        { capas: ['A1','A2','A3','A5'], internos: ['A1','A2','A3','A4','A5'] },
  'impacto':        { capas: ['I1','I2','I3','I4','I5'], internos: ['I1','I2','I3','I4','I5'] },
  'pessoal-organico': { capas: ['C1','C2','C3','C4'], internos: ['P1','P2','P3','P4','P5','P6','P7','P8','P9'] },
};
// tipo de conteúdo -> estilos permitidos (o primeiro é o padrão)
const ROTA = {
  'noticia':     ['painel-oficial'],
  'dica-estudo': ['ficha-missao', 'anotado'],
  'conteudo':    ['mapa-ilustrado', 'ficha-missao'],
  'motivacao':   ['anotado', 'impacto'],
  'frase':       ['impacto', 'anotado'],
  'recurso':     ['ficha-missao', 'mapa-ilustrado'],
  'pessoal':     ['pessoal-organico'],   // perfil pessoal do usuário: só com pedido explícito de "modelo pessoal"
};
// capa de impacto pode abrir carrossel de outros estilos (registre "capaEstilo": "impacto")

const arq = process.argv[2];
if (!arq) { console.error('uso: node checar-lote.cjs direcao.json'); process.exit(2); }
const { pecas } = JSON.parse(fs.readFileSync(arq, 'utf8'));
const erros = []; const avisos = [];
const E = (id, m) => erros.push(`${id}: ${m}`); const A = (id, m, p) => { if (!p?.justificativa) avisos.push(`${id}: ${m}`); };

function checarPessoal(p) {
  if (p.fechamento) E(p.id, 'modelo pessoal não tem card de fechamento da Rota (remova "fechamento")');
  if (p.capaEstilo) E(p.id, 'modelo pessoal não usa capa de outro estilo');
  const total = p.formato === 'carrossel' ? 1 + (p.internos || []).length : 1;
  const cx = p.caixas || [];
  if (cx.length !== total) return E(p.id, `"caixas" precisa de ${total} entradas "posição-cor" (uma por card), tem ${cx.length}`);
  const ok = /^(topo|meio|base)-(branca|preta|vermelha)$|^papel-papel$/;
  cx.forEach((c) => { if (!ok.test(c)) E(p.id, `caixa "${c}" inválida (use topo|meio|base + branca|preta|vermelha, ou papel-papel)`); });
  const pos = cx.map((c) => c.split('-')[0]); const cor = cx.map((c) => c.split('-')[1]);
  if (total >= 4 && new Set(pos.filter((x) => x !== 'papel')).size < 2) E(p.id, 'caixas sempre na mesma posição (varie topo, meio e base)');
  if (total >= 5 && new Set(pos.filter((x) => x !== 'papel')).size < 3) A(p.id, 'carrossel com 5+ cards usa só 2 posições de caixa', p);
  if (total >= 4 && new Set(cor.filter((x) => x !== 'papel')).size < 2) E(p.id, 'caixas sempre da mesma cor (alterne branca, preta, vermelha)');
  for (let k = 2; k < cx.length; k++) if (cx[k] === cx[k - 1] && cx[k] === cx[k - 2]) E(p.id, `3 cards seguidos com a mesma caixa "${cx[k]}"`);
  const verm = cor.filter((x) => x === 'vermelha').length;
  if (total >= 3 && verm / total > 0.4) A(p.id, `caixa vermelha em ${verm} de ${total} cards; o vermelho perde força quando domina`, p);
  if ((p.internos || []).filter((v) => v === 'P7').length > 1) A(p.id, 'mais de um card de papel sem foto no carrossel', p);
}

pecas.forEach((p, i) => {
  const st = ESTILOS[p.estilo];
  if (!st) return E(p.id, `estilo desconhecido "${p.estilo}"`);
  if (!ROTA[p.tipo]) E(p.id, `tipo desconhecido "${p.tipo}" (use: ${Object.keys(ROTA).join(', ')})`);
  else if (!ROTA[p.tipo].includes(p.estilo)) E(p.id, `tipo "${p.tipo}" não usa o estilo "${p.estilo}" (permitidos: ${ROTA[p.tipo].join(', ')})`);
  const capaSt = ESTILOS[p.capaEstilo || p.estilo];
  if (p.capa && !capaSt.capas.includes(p.capa)) E(p.id, `capa "${p.capa}" não existe em ${p.capaEstilo || p.estilo}`);
  if (p.formato === 'carrossel') {
    const ints = p.internos || [];
    ints.forEach((v) => { if (!st.internos.includes(v)) E(p.id, `variação interna "${v}" não existe em ${p.estilo}`); });
    const dist = new Set(ints.map((v) => v.replace('+M', ''))).size;
    if (ints.length >= 4 && dist < 3) E(p.id, `internos com só ${dist} arquiteturas (mínimo 3 em 4 cards)`);
    for (let k = 2; k < ints.length; k++) if (ints[k] === ints[k - 1] && ints[k] === ints[k - 2]) E(p.id, `3 cards seguidos com "${ints[k]}"`);
    if (!p.fechamento && p.estilo !== 'pessoal-organico') E(p.id, 'carrossel sem fechamento definido');
  }
  if (p.estilo === 'pessoal-organico') checarPessoal(p);
  const ant = pecas[i - 1];
  if (ant && ant.capa && p.capa && ant.capa === p.capa && (ant.capaEstilo || ant.estilo) === (p.capaEstilo || p.estilo)) E(p.id, `mesma capa (${p.capa}) da peça anterior ${ant.id}`);
  const ant2 = pecas[i - 2];
  if (ant && ant2 && [ant, ant2].every((q) => (q.capaEstilo || q.estilo) === (p.capaEstilo || p.estilo) && (q.fundo || '') === (p.fundo || ''))) A(p.id, `3 capas seguidas no mesmo estilo e fundo (${p.capaEstilo || p.estilo}/${p.fundo || '-'})`, p);
  if (ant && ant.fechamento && p.fechamento && ant.fechamento === p.fechamento) A(p.id, `mesmo fechamento (${p.fechamento}) da peça anterior`, p);
});

const carrosseis = pecas.filter((p) => p.formato === 'carrossel' && p.estilo !== 'pessoal-organico');
const fechs = new Set(carrosseis.map((p) => p.fechamento));
if (carrosseis.length >= 4 && fechs.size < 4) E('lote', `só ${fechs.size} arquiteturas de fechamento (mínimo 4)`);
const noticias = pecas.filter((p) => p.estilo === 'painel-oficial' && p.capa);
const c8 = noticias.filter((p) => p.capa === 'C8').length;
if (c8 > Math.max(1, Math.floor(noticias.length / 4))) E('lote', `${c8} capas C8 (foto cheia) em ${noticias.length} notícias; máximo 1 a cada 4`);
const cont = {}; pecas.forEach((p) => { cont[p.estilo] = (cont[p.estilo] || 0) + 1; });
const tipos = new Set(pecas.map((p) => p.tipo));
if (pecas.length >= 6 && tipos.size > 1) Object.entries(cont).forEach(([k, n]) => { if (n / pecas.length > 0.6) avisos.push(`lote: ${k} em ${Math.round(100 * n / pecas.length)}% das peças; confira se o tipo de conteúdo justifica`); });

console.log(`${pecas.length} peças · estilos: ${Object.entries(cont).map(([k, n]) => `${k} ${n}`).join(', ')}`);
[...new Set(erros)].forEach((e) => console.log('ERRO  ' + e)); [...new Set(avisos)].forEach((a) => console.log('aviso ' + a));
console.log(erros.length ? `\n${erros.length} erro(s). Ajuste o mapa antes de desenhar.` : '\nMapa aprovado na checagem automática.');
process.exit(erros.length ? 1 : 0);
