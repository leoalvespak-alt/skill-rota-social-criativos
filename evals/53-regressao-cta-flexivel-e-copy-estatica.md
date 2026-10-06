# Regressão 53: CTA flexível e copy estática preservada

Motivo: após a revisão de refazimento integral, gates antigos ainda exigiam CTA de 120 px, título estático a 7% da altura e corpo mínimo de 30 px com corte de texto. Esses gates contrariavam a direção por função, a escala atual e o copy-lock.

## Casos e resultados esperados

1. CTA com ação existente em 96 px, visível, dominante e legível a 270/360 px: aceitar a escala se a inspeção confirmar hierarquia, contraste e margem. Não exigir 120 px universalmente.
2. CTA com ação em 120 px, cortada ou escondida: reprovar. Tamanho declarado não substitui visibilidade.
3. CTA por rede com string diferente do copy-lock: reprovar mesmo com boa composição.
4. Refazimento de estático com corpo em 40 px, título fora de 7% da altura e leitura coerente: aceitar se o fluxo, as margens e o ponto focal funcionarem.
5. Refazimento de estático cujo texto não cabe: reorganizar largura, ornamentos e composição. Cortar, reescrever, duplicar ou reduzir automaticamente a copy congelada reprova.
6. Corpo em 30 px aprovado somente pelo gate antigo: reprovar; aplicar a faixa atual de 36–44 px, com apoio em 24–28 px, e conferir a escala efetiva.
7. Texto novo, sem copy-lock: uma revisão editorial pode ocorrer antes do congelamento, preservando fatos e condições. A exceção não autoriza editar uma copy já congelada.
8. Fonte do plugin e skill local com gates diferentes: reprovar a preparação do pacote até seus arquivos coincidirem.
9. Regra geral de QA manda cortar ou reescrever: com copy-lock, aplicar a precedência explícita de preservação, corrigir apenas composição e registrar lacuna editorial. Alteração silenciosa de strings reprova.

## Registro

Ler em conjunto com os casos 25, 45, 47, 50, 51 e 52. Registrar observações e separar revisão de instruções de inspeção de criativos. Este cenário não é modelo de produção.
