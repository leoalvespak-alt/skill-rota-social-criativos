# Estilo 4 · Anotado à mão

**Para:** motivação com lastro, mentalidade, estratégia curta, bastidor da rotina, reflexão sobre erro e constância, "cena reconhecível". Um pensamento por tela, com anotação que comenta o próprio texto.
**Não usar para:** notícia, explicação técnica longa, passo a passo com muitos itens.

**Referência:** "desenhossobtextos" (frase circulada com notas e setas; pôster "Final draft" riscado e corrigido; título grande + corpo + nota manuscrita no canto).

## Arquivos

- CSS: `kit/estilos/anotado.css`
- Modelo: `kit/exemplos/anotado.html` (P44, P02, P06, P29, P27)
- PNG de referência: `kit/exemplos/out/anotado/prancha.png`

## Anatomia fixa

- Fundo papel/creme com granulação (ou carvão em A5). Muito ar: **o vazio é intencional** neste estilo (exceção registrada à regra de ocupação). Mesmo assim, o texto principal fica entre 72 e 160 px.
- Tipografia: Instrument Serif (frase) ou IBM Plex Sans 700 apertada (título), com itálico serifado em uma palavra.
- Anotações Caveat em tinta ou vermelho: círculo (`.circulo`), riscado (`.riscado-mao`), sublinhado (`.sublinhado-mao`), seta SVG (`svg.seta-mao`), nota solta (`.nota-mao`).
- Rodapé: logo à esquerda, "Deslize →" discreto. Estático sem "Deslize".

## Variações

| Código | Nome | Use para |
|---|---|---|
| A1 | Frase circulada | uma frase com 1 a 3 palavras circuladas e uma nota com seta |
| A2 | Riscado e corrigido | contraste entre a anotação ruim e a boa ("~~revisar Direito~~" → tarefa concreta) |
| A3 | Título + nota no canto | título forte, corpo curto, nota manuscrita apontando |
| A4 | Lista marcada | 3 a 4 itens com caixas e checks à mão |
| A5 | Pôster serifado | frase enorme em fundo escuro, nota manuscrita creme |

## Regras específicas

1. Anotação manuscrita é copy aprovada (nota, apoio ou trecho), nunca texto novo.
2. Máximo 3 marcações por tela (círculo, risco, seta contam). Mais que isso vira rabisco.
3. Caveat mínimo 44 px; anotação não encosta na frase principal.
4. Nada de frase motivacional vazia ("acredite", "foco"): o estilo exige a situação e a ação que já estão na copy.

## Limites de copy

Frase principal até 16 palavras · corpo até 35 palavras · nota manuscrita até 14 palavras.

## Checklist

- [ ] No máximo 3 marcações; setas apontam para a palavra certa.
- [ ] Leitura a 360 px: a frase principal domina.
- [ ] `render.cjs` sem erro; cada PNG aberto.
