# Regressão 51 — margens e fluxo vertical em posts estáticos

## Falha observada

Na campanha de outubro, seletores do template estático zeraram a margem esquerda comum e fixaram o apoio em uma coordenada absoluta distante do título. A checagem estrutural validou dimensões e tamanhos mínimos, mas não mediu as margens nem a distância entre título e corpo; o vazio e o texto junto à borda só apareceram na inspeção do PNG.

## Resultado obrigatório

1. Manter margem lateral alvo de 80 px e mínimo de 72 px no título e no apoio, após renderização.
2. Posicionar o título conforme o ponto focal, sem exigir 7% da altura, e deixar o apoio fluir próximo, com intervalo inicial de 24–48 px ajustado à escala.
3. Inspecionar cada arte em tamanho integral e a 270/360 px; a folha de contato serve para identificar ritmo e desequilíbrios no lote.
4. Manter corpo em 36–44 px e apoio em 24–28 px. Com copy congelada, reorganizar a composição sem cortar, reescrever ou duplicar texto. Para texto novo, revisão editorial somente antes do congelamento.
5. Reprovar a peça quando uma sobreposição CSS ou coordenada absoluta quebrar essas regras, mesmo que as dimensões e o corpo tipográfico passem nos limites mínimos.

Atualização deliberada: os pisos de 30 px, posição obrigatória a 7% e corte automático foram substituídos pela escala atual e pelo protocolo de copy-lock. O defeito original, margem perdida e apoio distante, continua bloqueado.
