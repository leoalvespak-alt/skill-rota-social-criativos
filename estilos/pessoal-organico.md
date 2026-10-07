# Modelo pessoal orgânico (perfil pessoal de estudos)

**Ativa só com pedido explícito:** "modelo pessoal" ou "modelo pessoal orgânico" (também "estilo pessoal orgânico", "no meu perfil pessoal"). Sem essas palavras, **nunca** use este modelo. E com elas, **nunca** use os estilos da Rota.

**Para:** o perfil pessoal de estudos do usuário (dicas, estratégias, rotina, bastidor), com fotos reais dele estudando, treinando, correndo, tomando café. **Não é Rota de Ataque:** sem logo, sem card de fechamento, sem "Quem traça a Rota...", sem `rotadeataque.com.br`, sem CTA da plataforma.

**Referências:** `referencias/monteiro` (foto real do dia a dia em tela cheia + caixa de texto do Instagram com serifa de leitura) somada a `referencias/desenhossobtextos` (palavra circulada, riscado com correção, sublinhado à mão, nota manuscrita com seta).

## Pedido típico

> "Use a skill rota criativos na versão mais recente e crie os carrosséis X, Y e Z no modelo pessoal orgânico usando as imagens de fundo da pasta `<pasta>` e as copys do markdown `<arquivo.md>`."

## Arquivos

- CSS: `kit/estilos/pessoal-organico.css` (prefixo `pe`)
- Modelo: `kit/exemplos/pessoal-organico.html` (todas as variações + Story)
- PNG de referência: `kit/exemplos/out/pessoal-organico/prancha.png`
- Folha de fotos: `node kit/tools/folha-fotos.cjs <pasta-de-fotos> <saida.png>`
- Gerador: `kit/tools/pessoal.cjs` (plano, html, conferir) e `kit/tools/render-lote.cjs`

## Fluxo (substitui os passos 3 a 5 do SKILL.md neste modelo)

Tudo roda a partir da pasta da entrega, que contém `kit/`, `fotos/` e `_fonte/`. Ferramentas em `kit/tools/`.

1. **Copy congelada.** O markdown do usuário é lido por `pessoal.cjs`, que **nunca reescreve**: palavras, pontuação, ordem e quebra de cards vêm do arquivo (`## Carrossel NN · título` e `### Slide K`; parágrafo inteiro em `**negrito**` vira a frase em destaque). Marcações só envolvem trechos que já existem. Negrito no meio da frase vindo do markdown (`**trecho**`) é mantido. Travessão ou palavra vetada na copy do usuário viram aviso: **relate, não edite**. Linhas do tipo "Bastidores" e rótulos "Slide K · Capa" não entram na arte.
2. **Fotos.** Copie as fotos da pasta indicada para `fotos/` com nome simples (`f01.jpg`; HEIC/RAW: converta antes; lado maior até 2000 px). Rode `folha-fotos.cjs` (ou monte folhas de contato), **abra cada folha** e escreva `fotos/_catalogo.json`: `{ "f01": { "tipo": "pessoa|mesa|rua|treino|comida", "grupo": "estudo|outro", "zonas": ["base","topo","meio"], "pos": "50% 30%", "desc": "..." } }`. `zonas` = onde a caixa pode ficar sem cobrir o rosto, as mãos ou a tela (ordem de preferência); `pos` = recorte vertical. Exclua foto com desconhecidos em evidência ou marca de terceiros e diga ao usuário.
3. **Regras de foto do usuário** (padrão; o usuário pode mudar no pedido):
   - **Capas** só com foto dele estudando ou de mesa/caderno/tela. Rua, sol, paisagem, academia e comida só na capa quando o tema pede (ex.: carrossel do almoço → foto de comida). Exceções vão em `regras.excecoesCapa`.
   - **No mínimo 60%** dos cards com foto são do grupo `estudo` (ele estudando, caderno, mesa com monitor ou tela); até 40% podem ser academia, paisagem, rua etc. O gerador recusa o plano que viole isso.
   - **Pode repetir foto entre carrosséis** (principalmente as de estudo e de tela) para não faltar foto. Dentro do mesmo carrossel, não repita.
   - **Logo ou tela do produto que aparece dentro da foto** (monitor com a plataforma, boneco) **é permitido**. O que é proibido é aplicar logo da Rota por cima do criativo.
4. **Entrada.** `_fonte/entrada.json`: `copy`, `regras`, e por carrossel `fonte` (`serif` ou `sans`, uma por carrossel), `fotos` (uma por card, capa primeiro), `papel` (slide opcional que vira papel sem foto) e `marcas` (por slide, trechos exatos da copy e o tipo: `sub`, `circ` até 26 letras, `risco`, `mark`, `amarelo`, `cor`, `b`; máx. 3 por card). Escolha cada foto pelo sentido da copy e cada marcação pela palavra que carrega a ideia.
5. **Gerar e conferir.**
   ```bash
   node kit/tools/pessoal.cjs plano _fonte/entrada.json .     # resolve variação, posição e cor; grava plano.json, direcao.json e PLANO.md
   node kit/tools/pessoal.cjs html .                           # grava pecas/NN-slug.html
   node kit/tools/pessoal.cjs conferir .                       # compara o texto de cada card com o markdown (tem de dar "idênticos")
   node kit/tools/checar-lote.cjs direcao.json                 # variedade de capas, posições e cores
   node kit/tools/render-lote.cjs pecas png --paralelo 3       # preflight + PNG de todos
   ```
   Erro de preflight = ajustar variação/posição/foto (`ajustes` na entrada), nunca cortar copy nem usar `--forcar`.
6. **Inspeção.** Abra a `prancha.png` de cada carrossel e os PNGs com dúvida (caixa cobrindo rosto ou mão, marcação torta, contraste). Registre notas em `preflight.json`.

## Anatomia

- **Foto real em tela cheia** (`.pe-foto`, inline `background-image`). Sem filtro, sem gradiente pesado; `.sombra` só se a foto estiver estourada.
- **Caixa sólida** com texto (`.pe-caixa`), como a caixa de texto do Instagram: branca com texto preto, preta com texto branco ou vermelha (`#C1121F`) com texto branco. Cantos retos; `.torta` (leve inclinação) só em caixa curta.
- **Fonte de leitura do Instagram:** serifa Literata (padrão, igual à referência Monteiro) ou `.sans` (IBM Plex Sans, parecida com a "Clássica" do Instagram). Uma família por carrossel; a outra pode aparecer em no máximo um card de contraste.
- Capa centralizada; parágrafos alinhados à esquerda.
- **Sem** logo aplicada, contador, cabeçalho de série, "Deslize" (opcional `.pe-arrasta` só se o usuário pedir). Logo que já está na foto (tela do produto, boneco) pode.

## Variações

| Código | Nome | Use para |
|---|---|---|
| C1 | Caixa única centralizada | capa padrão: título em caixa branca ou preta, no terço que não cobre o rosto |
| C2 | Linhas destacadas | capa com cara de texto do Instagram (fundo por linha), frase de até 14 palavras |
| C3 | Caixa + nota à mão | capa com uma palavra circulada e uma nota manuscrita (trecho da copy) num papel com fita |
| C4 | Duas caixas | chamada curta vermelha + título em caixa branca (quando a copy da capa já vem em duas partes) |
| P1 | Parágrafo em caixa | o interno padrão (Monteiro): um parágrafo em caixa, topo, meio ou base |
| P2 | Duas caixas | frase curta destacada + parágrafo, quando a copy tem uma frase de abertura e uma explicação |
| P3 | Linhas destacadas | parágrafo curto (até 40 palavras) com fundo por linha |
| P4 | Lista em caixa | linhas curtas da copy, cada uma com marcador quadrado (sem numerar: a numeração não está na copy) |
| P5 | Riscado e corrigido | quando a copy contrasta o jeito errado e o certo (risca o trecho errado) |
| P6 | Nota à mão + seta | frase curta em caixa e um trecho da copy em nota manuscrita apontando para algo da foto |
| P9 | Caixas empilhadas | 2 a 4 parágrafos de 4 a 26 palavras, cada um em sua caixa, com cores alternadas (branca/preta) |
| P7 | Papel sem foto | respiro: frase forte sobre papel com marcação à mão. No máximo 1 por carrossel (`data-papel-sem-foto`, caixa `papel-papel` no mapa) |
| P8 | Faixa de borda a borda | último card ou frase de efeito: caixa preta/vermelha que sangra nas laterais |

Story (1080×1920): mesma linguagem, `class="card story pe"`; caixas entre y 250 e 1670.

## Capas repetidas (quando faltam fotos)

Se houver mais capas do que fotos de estudo/mesa/tela, o gerador reaproveita a foto e **muda o tratamento**: cor da caixa diferente da primeira capa com a mesma foto, variação de capa diferente (C1, C2 ou C4; se a frase tem uma sentença só e não sobra variação, muda ao menos cor, posição e recorte), recorte aproximado em 135% em outra região da foto (`focos` no catálogo, ou `ajustes.zoom` e `ajustes.bgpos` na entrada), caixa levemente inclinada e **tipo de marcação à mão diferente** (sublinhado, círculo, marca-texto, riscado). A repetição fica a pelo menos ~18 carrosséis da primeira capa. Capas vizinhas nunca têm a mesma variação.

## Fechamento sem negrito

Se o último slide não traz frase em negrito, a última frase vira a faixa de fechamento (só estilo, texto igual). Fechamento de parágrafo único alterna entre faixa e caixa simples. `papel: "auto"` na entrada deixa o gerador escolher o slide 4 ou 5 (abertura de 3 a 16 palavras, até 40 palavras no total) para virar papel sem foto.

## Marcações (de "desenhossobtextos")

| Classe | Efeito |
|---|---|
| `<b>` | negrito na serifa |
| `<span class="sub">` | sublinhado à mão (vermelho na branca, coral na preta, branco na vermelha) |
| `<span class="risco">` | riscado (para P5) |
| `<span class="circ">` | círculo à mão em 1 a 3 palavras |
| `<mark>` | marca-texto em bloco (vermelho na branca, branco na preta, preto na vermelha); `mark.amarelo` para realce amarelo |
| `<span class="cor">` | palavra na cor de ênfase da caixa |
| `.pe-nota` (+ `.papel`, `.papel-preto`, `.fita`, `.verm`) | nota em Caveat sobre papel; texto = trecho da copy |
| `svg.pe-seta` | seta à mão (branca com sombra sobre foto; `.tinta` ou `.verm` sobre papel) |

**Regras:** 1 a 3 marcações por card (nem todo card precisa); marque a palavra que carrega a ideia, não palavra aleatória. Marcação nunca muda o texto: só envolve palavras que já estão na copy. Nota manuscrita só com trecho da copy; se a copy não tem trecho curto para nota, não use nota.

## Limites e legibilidade

- Corpo 42 px (mínimo 40), títulos 62 a 76 px, nota à mão mínimo 50 px. Não reduza fonte para caber.
- Copy longa demais para uma caixa: troque a posição para a caixa crescer (topo → meio), use P2 (duas caixas) ou divida o parágrafo **no ponto em que a copy já tem frase completa** entre dois cards (relate ao usuário). Nunca corte palavras.
- Caixa até ~55% da altura do card; foto precisa continuar legível.
- Texto sempre sobre fundo sólido (caixa, linha destacada ou papel). Nota sobre a foto só com `.papel`/`.papel-preto`.

## Checklist

- [ ] Pedido disse "modelo pessoal"; nenhuma marca da Rota no card.
- [ ] Copy idêntica ao markdown (compare card a card).
- [ ] Cada foto aberta e descrita; caixa não cobre rosto nem a ação.
- [ ] Posições e cores variadas (o `checar-lote` cobra); vermelho sem dominar.
- [ ] 1 a 3 marcações por card, em palavras que carregam a ideia.
- [ ] `render.cjs` sem erro; prancha e cada PNG abertos e anotados no `preflight.json`.
