# 37: fonte nominal e conforto de leitura

**Caso observado:** uma versão anterior passava no piso técnico de 20 px, mas tinha explicações pequenas, títulos internos de 52 a 58 px e espaço vazio enquanto colunas estreitas comprimiam o texto. A revisão atual exige corpo legível em telefone, nota visível e título com hierarquia clara.

**Entrada de regressão:** canvas 1080 × 1350, título com 58 px, apoio com 20 px, três colunas com explicações, foto aprovada e um grande vazio entre título e conteúdo. O DOM não apresenta overflow. Adaptar também a um post e a um Story.

**PASS:** títulos principais, inclusive internos, normalmente têm 72–104 px; palavra/número focal pode chegar a 104–160 px quando couber; corpo fica em 36–44 px e apoio em 24–28 px. Notas em fundo claro usam #5f5f5f ou mais escuro. A leitura em telefone confirma conforto. As colunas cedem lugar a linhas largas ou ao fluxo de leitura quando a explicação pede espaço. Título e apoio ficam próximos; a foto recebe espaço proporcional à função. A revisão preserva fotos e marca aprovadas, pode retirar ornamento dispensável e registra inspeção de cada PNG a 100% e em escala de celular. Em Stories, confira o preview do app e reserve áreas com base em colisões observadas.

**FAIL:** declarar a peça pronta apenas porque o piso numérico passou; reduzir corpo ou nota abaixo da escala pedida para caber; manter título de 58 px; encolher o canvas inteiro; amputar o argumento; ou esconder defeitos na folha de contato.

**Exceção:** um pedido atual pode fixar outra escala ou formato. Registre essa decisão; exemplos antigos e presets não substituem a preferência atual.
