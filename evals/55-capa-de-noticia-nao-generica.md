# Regressão 55: capa de notícia nasce do fato, não do molde

Motivo: as 10 capas de "Carrosseis 01" repetiam foto escura de pessoa fardada + número salmão. O miolo foi aprovado; as capas foram consideradas genéricas.

## Casos e resultado esperado

1. Notícia cujo fato principal é a quantidade de vagas: C1 (número-manchete) ou C6 (comparativo por cargo). Foto cheia (C8) só se nenhuma outra servir.
2. Concurso autorizado, banca contratada, edital ainda não publicado: C2 (status), com as etapas futuras tracejadas como pendentes. Mostrar "edital" como concluído reprova.
3. Prova ou abertura com data oficial: C3 (calendário). A data é idêntica à fonte.
4. Prazo encerrando: C7 em fundo vinho, com logo branca. Logo com "A" vermelho sobre vinho reprova.
5. Frase literal do edital como notícia: C5 só com transcrição e referência do item. Trecho parafraseado apresentado como citação reprova.
6. Lote com 8 notícias: no máximo 2 capas C8; nenhuma capa repete o código da vizinha (`checar-lote.cjs`).
7. Capa que abre com "Novo concurso!", "Atenção" ou "Saiu" sem o fato específico reprova.

Ler com os casos 17, 27, 33 e 38. Este cenário não é modelo de produção.
