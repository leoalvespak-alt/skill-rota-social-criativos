# Kit de criativos Rota de Ataque

Tudo que uma peça precisa para renderizar igual em qualquer máquina. Copie a pasta `kit/` inteira para dentro da entrega.

```
kit/
  base.css                 tokens, fontes, canvas, rodapé, utilitários (sempre)
  estilos/
    painel-oficial.css     notícias            → classe do card: po (capas: po-capa c1…c8)
    ficha-missao.css(.js)  dicas de estudo     → card com data-bg; ver modelo
    mapa-ilustrado.css     conteúdo de matéria → mi
    anotado.css            motivação/estratégia→ an
    impacto.css            frases de impacto   → im
    pessoal-organico.css   perfil PESSOAL (só com "modelo pessoal") → pe; sem logo nem fechamento
  exemplos/<estilo>.html   modelos com TODAS as variações (copie as <section>)
  exemplos/out/<estilo>/   PNGs de referência + prancha.png
  fonts/                   TTF locais (licenças OFL/SIL; Anton e Literata com OFL-*.txt)
  assets/                  logos (claro, escuro, branco), mascote/ (Raposa trilha 1), itens/
  tools/
    render.cjs             HTML → PNG com preflight obrigatório + prancha + preflight.json
    preflight.js           regras medidas no DOM (injetado pelo render)
    checar-lote.cjs        valida direcao.json antes de desenhar
    folha-fotos.cjs        folha de contato de uma pasta de fotos (modelo pessoal)
```

## Fluxo

```bash
node kit/tools/checar-lote.cjs direcao.json
node kit/tools/render.cjs pecas/P01.html artes/P01
```

Playwright: o render procura `ROTA_PLAYWRIGHT`, o runtime do Codex nesta máquina ou `playwright` instalado (`npm i -D playwright && npx playwright install chromium`).

## Atributos que o preflight entende

| Atributo | Onde | Efeito |
|---|---|---|
| `data-arquivo="card-06-tiktok"` | `.card` | nome do PNG |
| `data-fechamento` / `data-estatico` | `.card` | último card / post único: proíbe "Deslize" |
| `data-papel="titulo"` / `"corpo"` | texto | piso de 60 px / 34 px |
| `data-sangria` | texto decorativo | pode passar da margem |
| `data-sobrepoe` | carimbo, adesivo | pode encostar em outro texto |
| `data-contraste-ok` | texto sobre foto | contraste conferido no PNG |
| `data-decor` | código de barras, xadrez | ignorado como texto |
| `data-data` | "14/10" isolado | não é contador de card |
| `data-perfil="pessoal"` | `.card` | modelo pessoal: proíbe logo e assinatura da Rota, "Deslize" opcional, travessão/palavra vetada viram aviso |
| `data-papel-sem-foto` | `.card` (pessoal) | card de papel sem foto de fundo (P7) |
