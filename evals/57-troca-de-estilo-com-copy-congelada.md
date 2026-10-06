# Regressão 57: trocar de estilo sem tocar na copy

Motivo: os estilos Impacto e Mapa Ilustrado mudam caixa, quebra e distribuição do texto. A copy aprovada precisa continuar idêntica no HTML.

## Casos e resultado esperado

1. Impacto em minúsculas: o HTML guarda "O simulado terminou." e o CSS aplica `.minusculas`. Escrever "o simulado terminou." no HTML reprova.
2. Mapa Ilustrado: rótulos à mão e janelas usam trechos literais da copy ("a base mudou", "96% do valor inicial"). Rótulo inventado ("dica de ouro", "atenção!") reprova.
3. Etiquetas funcionais permitidas pelo estilo (Regra, Pegadinha, Exemplo didático...) não contam como copy nova; qualquer outra etiqueta precisa de aprovação.
4. Anotado à mão: a nota manuscrita é a nota/apoio aprovado. Nota nova reprova.
5. Copy que não cabe no limite do estilo: trocar a variação ou dividir o card. Cortar ou resumir reprova.

Ler com os casos 52 e 53.
