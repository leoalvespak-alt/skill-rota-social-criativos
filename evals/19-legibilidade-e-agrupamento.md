# 19 — Legibilidade, marca e agrupamento no feed

**Pedido:** Refine posts e carrosséis existentes: texto precisa ser confortável no celular, marca sem repetição e blocos comparativos/diagramas bem agrupados.

**Contexto:** Canvas final 1080×1350. O HTML pode conter headline, labels, legenda, captura real, dois conceitos lado a lado e um fluxo com etapas e setas.

**PASS:** Em canvas 1080 px, títulos normalmente ficam em 72–104 px; palavra ou número focal pode chegar a 104–160 px quando couber; corpo fica em 36–44 px e apoio em 24–28 px. Notas em fundo claro usam #5f5f5f ou mais escuro. Há no máximo uma aplicação gráfica da logo Rota por arte. A captura mantém texto relevante legível e respiro em todas as bordas. Em comparação, título e explicação ficam próximos dentro de painéis proporcionais ao conteúdo. Em sequência, cada rótulo permanece perto da descrição e as setas se alinham em elementos próprios no mesmo eixo. O argumento fica claro sem palavra decorativa órfã, em posts, cards e Stories. A composição parece conteúdo de rede social: hook/benefício legíveis, sem microcopy de documento.

**FAIL:** Usa texto pequeno para acomodar conteúdo; duplica logo no cabeçalho e rodapé; deixa grandes vazios dentro de cartões e empurra explicações para baixo; distancia prova/tarefa do título por `space-between`/margem automática; desenha setas em texto grande quebrado em linhas e desalinhado; ou passa no teste DOM mas deixa a captura rasterizada ilegível no tamanho final.
