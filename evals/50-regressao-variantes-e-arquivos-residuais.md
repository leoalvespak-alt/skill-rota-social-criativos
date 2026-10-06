# Regressão 50 — variantes de CTA e arquivos residuais

## Falha observada

Durante a revisão da campanha de outubro, uma versão de CTA de rede que pertencia a uma exportação anterior continuou na pasta depois de o esquema de variantes mudar. A folha de contato incluiu esse PNG obsoleto, que tinha a copy fora do tratamento atual. A validação estrutural da nova exportação passou porque o arquivo residual não fazia parte da execução corrente.

## Resultado obrigatório

1. Antes do render, limpar apenas os PNGs derivados da peça selecionada.
2. Gerar novamente o conjunto completo e comparar nomes e quantidades com as variantes realmente definidas no conteúdo.
3. Verificar visualmente o PNG canônico, cada versão por rede e a folha de contato recriada.
4. Garantir que todas as variantes mantenham o mesmo peso visual, rótulo e tratamento de CTA.
5. Bloquear a aprovação se houver arquivo sobrando, versão ausente, CTA sem hierarquia, copy fora da composição ou prévia antiga.

## Falha

Passar apenas a checagem estrutural da execução atual sem conferir os arquivos já existentes na pasta, ou gerar a folha de contato antes de reconciliar e limpar o inventário exportado.


## Ação visível obrigatória

O render e a inspeção devem confirmar uma instrução concreta em cada CTA. Medir o elemento visível e exigir área renderizada maior que zero, margem, contraste e hierarquia de ação confortável a 270/360 px. A palavra ou expressão existente pode receber 120 px ou mais quando couber; não exigir esse piso em toda composição. Conferir fallback e cada variante de plataforma. Nós ocultos, variantes inativas ou a simples presença da copy no HTML não aprovam a peça. Esta atualização substitui o piso rígido anterior para manter a escala ligada à função do CTA.
