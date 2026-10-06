# Estilo 3 · Mapa Ilustrado

**Para:** conteúdo de matéria em si: regra de português, cálculo, lógica, artigo de lei, resumo de tema, questão comentada, mapa de um assunto. O leitor aprende algo que cai na prova.
**Não usar para:** notícia (Painel Oficial), rotina e método de estudo (Ficha de Missão), motivação (Anotado ou Impacto).

**Referência:** "dev outros" (carrossel de system design: fundo escuro pontilhado, diagrama com nós de contorno grosso, setas à mão, janelas de alerta, etiquetas pixel). Adaptado: fundo carvão em vez de azul-marinho; cores de diagrama restritas a creme, amarelo de realce `#E8B23A`, coral `#F04452` e vinho.

## Arquivos

- CSS: `kit/estilos/mapa-ilustrado.css`
- Modelo: `kit/exemplos/mapa-ilustrado.html` (P08 porcentagem, P14 concordância, P32 lógica)
- PNG de referência: `kit/exemplos/out/mapa-ilustrado/prancha.png`

## Anatomia fixa

- Fundo carvão com grade de pontos. Texto creme.
- Título Archivo Black pesado; **um** bloco de destaque (`.bloco`, amarelo ou coral, inclinado) na palavra-chave.
- Etiqueta pixel (Silkscreen) no topo com a função do card. Rótulos permitidos: **Regra, Exceção, Pegadinha, Exemplo didático, Na prova, Por que importa, Na prática, Cuidado, Resumo, Mapa, Antes, Depois, Certo, Errado**. Matéria/assunto pode entrar como kicker da capa (`▶ Porcentagem`). Sem números de card ou barra de progresso que conte cards.
- Diagrama: nós (`.no`), setas SVG (`svg.setas`, largura fixa 920 px = mesma escala do viewBox), rótulos à mão Caveat (`.mao`) com **trechos da própria copy**.
- Janela de alerta (`.janela`) para pegadinha/cuidado; cartões (`.cartao`) para "Na prática"/"Cuidado" no pé do card.
- Rodapé: logo clara à esquerda, "DESLIZE →" pixel à direita.

## Variações

| Código | Nome | Use para |
|---|---|---|
| V0 | Capa | título grande com bloco + 1 ou 2 janelas com o "gancho" numérico + Raposa ou ilustração |
| V1 | Fluxo | A → B com rótulo da operação (conta, regra aplicada) |
| V2 | Antes/depois | estado inicial e final, com destaque do que mudou |
| V3 | Fórmula anotada | expressão grande com setas para o significado de cada parte |
| V4 | Frase anotada | frase-exemplo em serifa com sublinhado/círculo e notas (português, lei) |
| V5 | Grupo lógico | bonecos ✓/✗, conjuntos, quantificadores |
| V6 | Tabela pixel | quadro comparativo curto (regra × exceção, prazo × artigo) |
| V7 | Pegadinha | janela de alerta grande + explicação |
| V8 | Mapa final | resumo do carrossel inteiro num diagrama (penúltimo card) |

Distribuição: ≥ 3 variações nos internos; um V7 ou V8 por carrossel ajuda o salvamento.

## Regras específicas

1. Todo rótulo no diagrama é trecho da copy aprovada. Não acrescente dado, exemplo ou número.
2. Nós com `white-space: nowrap`; se não couber, aumente o diagrama ou quebre em dois cards. Nunca deixe número quebrar dentro da caixa.
3. Setas não cruzam texto (o preflight não mede seta; confira no PNG).
4. Cores de realce (amarelo/coral) só em nós, blocos, etiquetas e cartões. Fundo sempre carvão.
5. Exemplo hipotético recebe etiqueta "Exemplo didático".

## Limites de copy por slot

Título até 9 palavras · corpo até 30 palavras · rótulo à mão até 6 palavras · janela até 20 palavras · cartão até 22 palavras.

## Checklist

- [ ] Diagrama legível a 360 px de largura (abrir a prancha).
- [ ] Nenhuma seta sobre texto; nenhum nó com texto quebrado.
- [ ] Fato técnico conferido (regra gramatical, conta, artigo de lei vigente).
- [ ] `render.cjs` sem erro; cada PNG aberto.
