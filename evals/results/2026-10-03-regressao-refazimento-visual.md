# Resultado da regressão: refazimento visual com copy congelada

Data: 03/10/2026. Escopo: os 12 cenários de `52-regressao-refazimento-visual-copy-lock-qa.md`, conferidos contra a entrega `entrega_publicacao/2026-10-03-a-17-feed-visual-v2`.

| # | Resultado | Evidência observada |
| ---: | --- | --- |
| 1 | PASSOU | A menor margem de texto medida no PNG final é 80 px; a regra do gerador também mantém o piso de 72 px. |
| 2 | PASSOU | P35 separa tentativa, consulta da norma, comparação e limite de aplicação. Os quatro cards internos usam estruturas distintas e não usam martelo. |
| 3 | PASSOU | P08 dá escala própria aos cálculos `100 × 1,20 = 120` e `120 × 0,80 = 96`, à base sucessiva e à conclusão já escrita. Não foi acrescentado dado. |
| 4 | PASSOU | P14 distingue regra de haver, concordância de existir, auxiliar e limite de sentido; os exemplos permanecem iguais ao copy-lock. |
| 5 | PASSOU | P32 preserva o escopo de “pelo menos um”; P41 separa “alguns”, inferência e negação. A comparação de copy terminou com zero divergências. |
| 6 | PASSOU | Há composições tipográficas amplas sem caixa ou ilustração. A caixa aparece quando tem função registrada, não como requisito universal. |
| 7 | PASSOU | O mapa não cria rótulos para completar diagramas. As 221 formas de copy conferidas têm zero divergências. |
| 8 | PASSOU | Os 56 CTAs canônicos e variantes destacam verbos de ação no PNG; copy e destino passam pelas mesmas checagens das demais artes. |
| 9 | PASSOU | O finalizador associa `visual=aprovada` apenas a registro manual cujo SHA-256 coincide. Sem registro correspondente, conserva `pendente`. As aprovações atuais vieram do arquivo de revisão por imagem, não do preflight. |
| 10 | PASSOU | A leitura das famílias e superfícies em ordem de calendário não encontrou grupo de três capas consecutivas equivalentes. |
| 11 | PASSOU | Os fechamentos usam quatro arquiteturas registradas, a frase “Quem traça a Rota, nunca perde o alvo!” e `rotadeataque.com.br`. |
| 12 | PASSOU COM BLOQUEIO DE PUBLICAÇÃO | A skill local e a cópia na fonte do plugin têm os mesmos hashes; o guia está alinhado às mesmas margens e escalas. A versão candidata é 0.2.13. Publicação e conferência da versão carregada aguardam a identificação do repositório canônico da fonte. |

## Checagens da entrega

- 277 PNGs conferidos por SHA-256, todos em 1080 × 1350 px; 257 canônicos e 20 variantes de CTA.
- 277/277 com copy conferida, estrutura aprovada e inspeção visual vinculada ao hash atual.
- 221 formas de texto comparadas com o copy-lock; zero divergências.
- Zero falhas de carregamento de fontes, de marca ou de overflow; margem mínima medida de 80 px.
- Prévias de 277 imagens geradas em 360 e 270 px. A área da marca nas 37 imagens sobre vermelho/vinho foi reinspecionada nas duas escalas após a correção.
- A comparação dos pilotos detectou a fronteira de palavra escapada incorretamente na montagem do HTML. O renderizador foi corrigido e os 56 CTAs foram gerados e conferidos nos quadros nativos, 360 e 270 px.

## Estado do plugin

A fonte local do plugin e a skill local estão sincronizadas em 103 arquivos. O pacote foi versionado como candidato 0.2.13 com changelog atualizado. O cache instalado segue em 0.2.12 e não foi alterado. A publicação ficou suspensa porque não há repositório Git próprio na pasta do plugin e a árvore ancestral aponta para `leoalvespak-alt/gazetacon`, origem sem relação confirmada com este plugin. Nenhum commit ou envio foi feito.
