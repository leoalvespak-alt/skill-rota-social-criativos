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

## Fluxo (substitui os passos 3 a 5 do SKILL.md neste modelo)

1. **Copy (congelada).** Abra o markdown indicado e localize só as peças pedidas. Use o texto exatamente como está: palavras, pontuação, maiúsculas, emojis, quebras de card. Não reescreva, não resuma, não "melhore", não acrescente CTA. Se o markdown não deixar claro onde um card termina, siga títulos/numeração/separadores (`---`, "Card 1", "Slide 2", "1/9"); se ainda houver dúvida, pergunte. O preflight avisa travessão ou palavra vetada: **relate ao usuário, não edite**.
2. **Fotos.** Rode `folha-fotos.cjs` na pasta indicada e **abra a folha**. Para cada foto anote: o que mostra (estudando, treinando, correndo, café...), onde está o rosto/assunto e onde há área calma para a caixa. Copie as fotos escolhidas para `fotos/` dentro da entrega com nome simples (`01-cafe.jpg`, sem espaço e sem parênteses). HEIC/RAW: converta para JPG antes (diga ao usuário se não conseguir). Não altere a foto além de recorte/posição.
3. **Distribuição.** Combine cada card com a foto pelo sentido da copy (copy sobre corrida → foto correndo; sobre revisão → foto na mesa). Mesma foto no máximo 2 vezes no carrossel e nunca em cards vizinhos. Capa: a foto mais forte, com o usuário visível de preferência.
4. **Caixa.** Escolha posição pela foto, nunca por rodízio: a caixa **não cobre rosto, mãos em ação ou o objeto que explica a cena**. Ajuste com `style="top:XXXpx"` e `background-position` da foto. Varie a posição (topo, meio, base) e a cor (branca, preta, vermelha) ao longo do carrossel.
5. **Mapa.** `direcao.json` com `"tipo": "pessoal"`, `"estilo": "pessoal-organico"`, sem `fechamento`, e `"caixas"` com uma entrada `posição-cor` por card (capa incluída). Registre também `"fotos"` (card → arquivo). Rode `checar-lote.cjs`.
6. **HTML e render.** Parta de `kit/exemplos/pessoal-organico.html`. Cada card: `class="card pe" data-perfil="pessoal" data-estilo="pessoal-organico" data-variante data-arquivo`. Último card do carrossel: `data-fechamento` (só marca o fim; não cria card novo). Post único: `data-estatico`. Render com `render.cjs`; abra prancha e cada PNG.

## Anatomia

- **Foto real em tela cheia** (`.pe-foto`, inline `background-image`). Sem filtro, sem gradiente pesado; `.sombra` só se a foto estiver estourada.
- **Caixa sólida** com texto (`.pe-caixa`), como a caixa de texto do Instagram: branca com texto preto, preta com texto branco ou vermelha (`#C1121F`) com texto branco. Cantos retos; `.torta` (leve inclinação) só em caixa curta.
- **Fonte de leitura do Instagram:** serifa Literata (padrão, igual à referência Monteiro) ou `.sans` (IBM Plex Sans, parecida com a "Clássica" do Instagram). Uma família por carrossel; a outra pode aparecer em no máximo um card de contraste.
- Capa centralizada; parágrafos alinhados à esquerda.
- **Sem** logo, contador, cabeçalho de série, "Deslize" (opcional `.pe-arrasta` só se o usuário pedir).

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
| P4 | Lista em caixa | passos ou itens numerados que já estão na copy |
| P5 | Riscado e corrigido | quando a copy contrasta o jeito errado e o certo (risca o trecho errado) |
| P6 | Nota à mão + seta | frase curta em caixa e um trecho da copy em nota manuscrita apontando para algo da foto |
| P7 | Papel sem foto | respiro: frase forte sobre papel com marcação à mão. No máximo 1 por carrossel (`data-papel-sem-foto`, caixa `papel-papel` no mapa) |
| P8 | Faixa de borda a borda | último card ou frase de efeito: caixa preta/vermelha que sangra nas laterais |

Story (1080×1920): mesma linguagem, `class="card story pe"`; caixas entre y 250 e 1670.

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
