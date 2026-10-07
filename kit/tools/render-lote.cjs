#!/usr/bin/env node
/* Renderiza vários HTML de uma pasta, cada um com o render.cjs (preflight obrigatório), em paralelo.
   Uso: node kit/tools/render-lote.cjs <pasta-html> <pasta-saida> [--paralelo 4] [--so-preflight] [--filtro 07,12]
   Saída: <pasta-saida>/<nome-do-html>/NN.png + prancha.png + preflight.json, e um resumo no console.
   --filtro: renderiza só os arquivos cujo nome começa com um dos prefixos. Nunca usa --forcar. */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const args = process.argv.slice(2);
const pasta = args[0]; const saida = args[1];
if (!pasta || !saida) { console.error('uso: render-lote.cjs <pasta-html> <pasta-saida> [--paralelo N] [--so-preflight] [--filtro 01,02]'); process.exit(2); }
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const par = Math.max(1, parseInt(opt('--paralelo') || '4', 10));
const filtro = (opt('--filtro') || '').split(',').map((x) => x.trim()).filter(Boolean);
const soPre = args.includes('--so-preflight');
const arqs = fs.readdirSync(pasta).filter((f) => f.endsWith('.html')).sort().filter((f) => !filtro.length || filtro.some((p) => f.startsWith(p)));
const render = path.join(__dirname, 'render.cjs');
const resumo = []; let i = 0; let ativos = 0;

function proximo() {
  while (ativos < par && i < arqs.length) {
    const f = arqs[i++]; const nome = f.replace(/\.html$/, ''); ativos++;
    const p = spawn(process.execPath, [render, path.join(pasta, f), path.join(saida, nome), ...(soPre ? ['--so-preflight'] : [])], { stdio: ['ignore', 'pipe', 'pipe'] });
    let log = ''; p.stdout.on('data', (d) => { log += d; }); p.stderr.on('data', (d) => { log += d; });
    p.on('close', (code) => {
      ativos--; resumo.push({ nome, code, log });
      fs.mkdirSync(saida, { recursive: true }); fs.writeFileSync(path.join(saida, nome + '.log.txt'), log);
      console.log(`${code === 0 ? 'ok    ' : 'FALHOU'} ${nome}`);
      if (i >= arqs.length && ativos === 0) fim(); else proximo();
    });
  }
}
function fim() {
  const ruins = resumo.filter((r) => r.code !== 0).sort((a, b) => a.nome.localeCompare(b.nome));
  console.log(`\n${resumo.length - ruins.length} de ${resumo.length} sem erro.`);
  ruins.forEach((r) => { console.log(`\n== ${r.nome}`); r.log.split('\n').filter((l) => /FALHOU|ERRO/.test(l)).forEach((l) => console.log(l)); });
  process.exit(ruins.length ? 1 : 0);
}
if (!arqs.length) { console.error('nenhum HTML encontrado'); process.exit(1); }
proximo();
