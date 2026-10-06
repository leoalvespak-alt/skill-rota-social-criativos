# Produção e QA dos PNGs

Leia ao criar, alterar ou exportar peças. Preserve arquivos do usuário e mantenha versão recuperável do conjunto anterior antes de substituir saídas. O processo é **HTML/CSS → render → pre-flight automático → inspeção visual → correção → novo render → novas checagens**.

## Antes de renderizar

Confira a [revisão de substância](aprofundamento-copy.md) e o destino em [copy por formato](copy-por-formato.md). Registre qualquer corte de critério, exemplo ou ressalva que altere a compreensão e corrija a composição. Texto apenas redigido não recebe status de QA visual; esta referência se aplica à produção de imagens.

Com copy-lock, preserve as strings em toda a revisão: orientações abaixo para reescrever, retirar palavras ou trocar ângulo valem para texto novo antes do congelamento. No refazimento, recomponha o visual e registre problema editorial ou factual para decisão separada; não altere o texto aprovado silenciosamente.

1. Verifique arquivo de marca, plano/edição, missão, tela e oferta atuais; mantenha o registro `peça → afirmação → origem` descrito em [marca e evidência](rota-brand-and-evidence.md).
2. Confirme que a direção aprovada atende à estratégia e que o canvas foi desenhado no tamanho final. Diferencie captura autêntica de ilustração adaptada.
3. Carregue fontes, logo, brasão e capturas locais; evite links remotos frágeis na exportação. Não use SVG/HTML simulando depoimento, questão, progresso ou tela real inexistente.
4. Renderize o PNG nativo com o mesmo DOM/CSS do preview. Registre quantidade, nomes e dimensões. Faça folha de contato se houver lote, mas confira também cada arquivo.

## Pre-flight automático, quando houver navegador automatizado

Depois do render e **antes** de julgar a arte visualmente, use Playwright/Puppeteer ou a infraestrutura existente; não adicione framework só para esta etapa. Para cada canvas/peça:

1. Confirme viewport esperado, `getBoundingClientRect()` do canvas, `clientWidth/clientHeight` e dimensões reais do PNG. O arquivo exportado precisa corresponder ao canvas esperado (feed/carrossel `1080×1350`, Story `1080×1920`, salvo briefing diferente).
2. Meça `scrollWidth` e `scrollHeight` do canvas e, quando a página exportada inteira for o canvas, também do documento. Sinalize overflow horizontal/vertical não intencional; não trate crop decorativo aprovado como erro.
3. Aguarde `document.fonts.ready`, confira fontes esperadas com `document.fonts.check(...)` e identifique assets que falharam (`requestfailed`/erro de carregamento). Para cada `<img>` relevante, exija `complete` e `naturalWidth > 0`.
4. Confira elementos essenciais presentes por seus retângulos: gancho, prova exibida, CTA e marca não devem sair do canvas. Em Story, compare-os com o preview do app e marque colisões reais com controles, nome da conta ou stickers. A faixa central `1080×1420` (`y=250…1670`) orienta a primeira inspeção; em Stories orgânicos, documente a interface observada que motivou cada reserva. Em placement pago, siga a orientação atual do anúncio e do CTA nativo.
5. Confira quantidade esperada de peças, existência de todos os PNGs, tamanho não nulo dos arquivos e correspondência entre dimensão esperada, canvas medido e PNG gravado.
6. Para assets destinados a flutuar, quando a ferramenta permitir, confira canal alfa nos pixels de margem; extensão `.png`/`.webp` sozinha não garante transparência. Sinalize proporção exibida incompatível com a natural, salvo crop deliberado. Essas checagens são alertas, não substituem inspeção das bordas no fundo final.
7. Meça a tipografia visível no DOM no canvas de 1080 px: títulos normalmente ficam em **72–104 px**; palavra ou número focal pode chegar a **104–160 px** quando couber; corpo fica em **36–44 px**; apoio em **24–28 px**. Considere a escala efetiva aplicada aos elementos, não só `font-size`. Registre a menor fonte e a caixa de cada texto principal. Não esconda, corte ou reduza texto para encaixar. Texto rasterizado nas capturas exige inspeção no PNG.
8. Conte as aplicações visíveis da logo Rota por criativo: máximo **uma**. Brasão do concurso e marca que faça parte da interface real da captura não contam como aplicação gráfica da logo. Se header e rodapé repetirem a Rota, remova uma das aplicações.
9. Procure cabeçalhos e rodapés repetidos com assunto, concurso/cargo, edição e número/total de cards. Remova-os; não use numeração em carrossel nem Stories.
10. Leia o escopo da copy ao lado do escopo do CTA. Se o tema é geral, retire nomes de concurso/cargo também das legendas das provas e do convite final. A pasta ou o print de origem não torna o conteúdo específico.
11. Compare as pessoas visíveis entre todas as capas do lote. Pose e roupa não contam como identidades diferentes. Troque fotos repetidas por pessoas distintas ou por uma composição sem rosto; aceite repetição só como exceção registrada.
12. Pesquise o texto extraído do HTML por `—`. O resultado deve ser zero na copy editável de títulos, apoio, rótulos e CTAs.
13. Compare a distribuição do lote com o mapa de estilos. Fundos de imagem em tela cheia devem ocupar aproximadamente 15% das telas em lotes com várias peças; não replique a mesma estrutura em três cards consecutivos.
14. Se houver imagem ou recorte contínuo entre cards, inspecione cada peça separada e o par lado a lado. As emendas coincidem e nenhum texto, controle ou parte necessária da captura cruza o corte?
15. Se houver sombra, gradiente, brilho ou contorno no texto, confirme contraste, leitura das formas e piso de 24 px para informação secundária no PNG final. Rejeite acúmulo de efeitos ou brilho que concorra com a mensagem.

Registre falhas por peça; corrija e refaça render/pre-flight. Essas verificações podem ser executadas diretamente no navegador automatizado, sem scripts próprios da skill. **Pre-flight encontra erros estruturais; QA visual encontra legibilidade, hierarquia, sobreposição, artificialidade e sentido.** Passar no pre-flight não aprova o design.

## Inspeção visual obrigatória

- **Tamanho integral:** examine alinhamentos, corte, sombras, pixelização, artefatos, textos encobertos, qualidade de assets e bordas. Elementos dentro do canvas ainda podem se sobrepor.
- **Escala de celular:** ~25% da largura original para feed/carrossel e visualização de telefone para Story. Na capa, reconheça a situação delimitada pelo pedido e o motivo para continuar; na demonstração, entenda a prova; no fechamento, perceba a ação. Texto essencial que vira textura é falha.
- **Piso e conforto de leitura:** confira títulos normalmente em 72–104 px, palavras/números focais em até 104–160 px quando couberem, corpo em 36–44 px e apoio em 24–28 px no canvas 1080. Examine também a 270 e 360 px de largura; cumprir a escala nominal não basta se a explicação fica pequena. Em fundo claro, mantenha notas em #5f5f5f ou mais escuro. Leia texto embutido em prints; amplie/re-enquadre a prova para que as palavras necessárias tenham tamanho confortável. Recomponha largura, retire decoração ou redistribua explicações antes de reduzir fonte.
- **Marca e tom social:** procure aplicações repetidas da logo e remova até haver no máximo uma por arte. A peça deve ser lida como conteúdo de feed, com hook/benefício e linguagem direta; micro-rótulos, espaçamento excessivo e hierarquia de documento são sinais para recompor.
- **Faixas cromáticas:** passe por posts, cada card e todos os Stories procurando filetes saturados sob títulos, nas laterais de caixas, no topo de etapas ou como progresso decorativo. Remova barras sem significado; substitua por hierarquia tipográfica, painéis completos e discretos, contornos neutros ou setas alinhadas. Mantenha apenas uma barra que comunique dado/estado funcional ou pertença a uma captura autêntica; não altere a captura para esconder o detalhe. Se ele comprometer a composição, escolha outro recorte real ou apresente uma transcrição atribuída, sem simular a interface.
- **Prova focal, quando exibida:** no tamanho de feed/mobile, o detalhe central ainda pode ser compreendido sem zoom manual? Se não, recorte mais, amplie, retire informação secundária ou mude o enquadramento. Em peça demonstrativa, oculte mentalmente o parágrafo explicativo: a captura ainda comunica parte relevante do argumento? Se não, a direção da prova está fraca.
- **Segurança do recorte:** examine cada borda da captura dentro da arte. Nenhuma letra, palavra, botão, tempo, ícone ou linha pode ser amputado ou tocar a borda por acidente; preserve respiro interno/frame e use o tamanho necessário para manter legível o conteúdo focal. Essa revisão vale para posts, cada card e cada Story.
- **Recortes e transparência:** examine o PNG final, não só o mosaico de preview. Logo/brasão que deveriam flutuar têm alfa real, sem retângulo opaco ou halo? Screenshot branco mantém o branco autêntico da UI, mas está enquadrado intencionalmente em vez de parecer uma folha colada? Há palavras, botões, contornos ou sombras cortados, sobras acidentais de print ou imagem esticada?
- **Story:** confronte gancho, prova quando exibida, CTA e sticker reservado com o preview do app e identifique colisões reais. A faixa central `1080×1420` (`y=250…1670`) orienta a primeira inspeção. Em Stories orgânicos, registre qual elemento da interface motivou cada reserva. Em placement pago, confira a orientação atual do anúncio e do CTA nativo.
- **Integridade:** confirme missão, disciplina, assunto, ação e botões mostrados; norma/artigo, vídeo, questão, tempo, contagem, preço e progresso têm origem. Número histórico do plano de redesign não basta. Uma captura recortada não pode inverter o sentido da interface.
- **Ritmo do conjunto:** compare peças vizinhas; se forem o mesmo Canva com título trocado, recomponha. Se uma peça tem metade vazia sem dar foco, amplie o elemento principal daquela função (gancho, contexto ou prova) ou reordene. Se está congestionada, distribua a informação. Confira também alinhamento e distância do rodapé/CTA; nenhum bloco pode parecer colidido ou abandonado numa área vazia.
- **Mapa de ocupação:** no PNG integral, estime onde terminam título, apoio e elemento principal. Sinalize cards que terminam perto de 55% a 65% da altura e deixam o terço inferior sem conteúdo nem respiro intencional. Não preencha com ornamento: aumente uma representação útil, redistribua a explicação ou refaça a hierarquia. Em card de CTA, confira se a prévia ou prova e a ação formam um grupo visível no centro útil. Revise a sequência em miniatura para detectar saltos de fonte, posição de título, logo e seta.
- **Fundo e fechamento:** confira pixels das bordas e do centro do fundo que deveria ser chapado; vinheta acidental reprova. Se o fechamento trouxer mascote, ícone, logo e URL, cada um precisa ter função e escala. O mascote deve estar ancorado, o ícone deve se relacionar à mensagem e logo/URL precisam formar uma assinatura legível.
- **Agrupamento interno:** dentro de cada cartão, título e descrição formam um grupo próximo e legível. Evite `justify-content:space-between`, alturas mínimas exageradas ou `margin:auto` que abram um vazio entre nome e explicação ou afastem prova/tarefa do título. Em fluxos, cada etapa e sua explicação ficam juntas; setas ocupam elementos/colunas próprias e alinham no mesmo eixo.

## QA da mensagem, antes de aprovar a arte

- **Regra do Um:** há uma ideia, tensão, benefício e ação dominantes, com alegações sustentáveis? Elementos secundários apoiam ou competem? Prova visual só precisa dominar quando a peça/card é demonstrativo.
- **Teste de 5 segundos:** na capa, a pessoa qualificada reconhece que isto é para ela e por que deve deslizar? No card demonstrativo, entende o que a prova mostra? No post/fechamento, percebe benefício e próximo passo? Não exija que a capa explique toda a interface.
- **Leitura por varredura:** ignore parágrafos menores e leia headline, contexto, destaques, prova quando exibida e CTA. Formam uma mensagem persuasiva coerente ou uma lista desconexa de funções?
- **Adequação:** abertura e CTA combinam com consciência/objetivo da peça? O recurso foi traduzido em benefício relevante, sem prometer resultado além da prova? Hook, diferencial e prova cumprem funções distintas?
- **Escopo:** o concurso/cargo está no pedido ou na copy fornecida? Tema e CTA gerais permanecem gerais mesmo quando a prova vem de um plano específico?
- **Persuasão:** além de mostrar que o recurso existe, a peça deixa claro por que ele importa para aquele aluno? Se parece ficha técnica ou documentação de produto, reequilibre o visual. Em texto novo, revise contexto/benefício antes do congelamento; com copy-lock, registre eventual lacuna editorial sem reescrever strings.
- **Interesse:** a pessoa qualificada encontra uma pergunta, tensão ou possibilidade relevante — ou vê apenas números, nomes de assunto e componentes do produto? Para carrossel, aprove a capa separadamente como convite; não aceite que identificação técnica faça sozinha o trabalho do hook.
- **Sequência e valor:** capa atrai público qualificado; a primeira tela de conteúdo já acrescenta orientação útil. Os cards dão contexto, critério, exemplo e prova na medida necessária, cumprem a promessa e mudam a compreensão. Rejeite slogans, explicação que só repete o título, uma frase fragmentada em vários slides e listas que exigem adivinhar a aplicação. Nenhum card existe só para atingir contagem ou repetir print. No Story, cada frame funciona isoladamente e a sequência mantém uma ação principal.
- **Clareza por peça:** leia headline, destaque e apoio como uma frase/argumento. Retire palavra isolada sem função, pergunta sem referente e benefício vago; em sequência, cada card precisa fechar seu ponto e conduzir com clareza ao seguinte. Faça essa leitura em posts, carrosséis e Stories, sem depender da legenda.
- **Ética:** fato não foi tratado como interpretação universal; urgência, preço, prova social, autoridade e benefício possuem fonte? Se uma afirmação factual falhar, troque o ângulo ou registre a evidência faltante conforme [marca e evidência](rota-brand-and-evidence.md).

## Revisão anti-genérico

Pergunte explicitamente e corrija quando a resposta revelar problema:

1. Trocando logo e cor, esta arte serviria para qualquer empresa?
2. Ela repete sem motivo a composição de outros cards ou peças?
3. A abertura cria identificação e interesse ou começa despejando dados técnicos?
4. Se há captura, ela prova algo ou apenas preenche espaço?
5. Na demonstração, qual detalhe da captura importa e está grande o bastante?
6. Informação secundária ocupa mais espaço que o argumento principal?
7. O layout nasceu da ideia ou de um template `headline → print → CTA`?
8. A peça funciona em mobile na função que lhe cabe: atrair, contextualizar, demonstrar ou converter?
9. A interface inteira aparece por necessidade ou por hábito, quando aparece?
10. Crop, escala ou enquadramento tornariam a evidência exibida mais forte sem alterar seu sentido?

Procure também ornamento sem função, fundo competindo com a prova, título inflado para preencher espaço, caixas dispensáveis, tipografia automática, visual de dashboard/SaaS ou slide corporativo, gradiente/glow genérico, cantos arredondados repetidos, três colunas por automatismo, sombra idêntica em tudo, simetria/centralização excessivas, número gigante sem função e decoração com “cara de IA”. **São alertas, não proibições absolutas**: um briefing explícito ou uma prova real pode justificá-los. Se as respostas indicarem genericidade ou prova fraca, recomponha antes de aprovar/exportar o PNG final.

Quando um print foi usado, pergunte ainda: **o recorte parece escolhido ou acidental?** A interface ocupa a área prometida pela composição ou virou uma ilha de texto num retângulo branco? Os assets isolados respeitam de fato a cor/fundo da peça? Se falhar, volte ao asset/crop/CSS e renderize novamente; não trate o defeito apenas com uma legenda explicativa.

## Critério de saída

Os arquivos esperados existem, abrem, têm dimensões corretas e correspondem ao HTML/CSS editável. No canvas de 1080 px, títulos normalmente ficam entre 72 e 104 px; uma palavra ou número focal pode chegar a 104–160 px quando couber; corpo fica em 36–44 px e apoio em 24–28 px. Em carrosséis, confira ainda a [grade, o ritmo, a fotografia, o CTA e o fechamento](carousel-grade-grid-cta.md). Cada PNG passou por inspeção integral e leitura a 270 e 360 px de largura. A mensagem funciona sem legenda; o conteúdo entrega explicação aplicável e a prova é legível e fiel. Não há overflow, sobreposição, recorte truncado, caixa acidental, halo, espaço sem função ou baixa legibilidade. Toda correção visual exige novo PNG e nova inspeção da imagem alterada; código e bounding box não aprovam o design.


### Gate de pertinência fotográfica e logo

- Inspecione individualmente cada foto antes da seleção e cada crop depois do render. O mapa precisa citar um detalhe verificável da cena (por exemplo, “catraca de ônibus urbano e caderno”, “título em inglês na lombada”, “manequim de madeira com braço articulado”), a ideia da capa, o motivo da escolha e a posição/crop. “Foto contextual” não é evidência e reprova o registro.
- Compare a cena com o assunto delimitado pela copy e pelo local. Reprove fotos que indiquem outro país/cidade, idioma incompatível, cargo diferente ou objeto que pareça evidência/produto que não existe. Contexto brasileiro deve ser sustentado por cenário/objeto; não inferir nacionalidade ou etnia de rostos.
- Em concursos e carreiras, anote a busca prévia por “farda + nome do cargo”, a fonte oficial atual e o dado específico confirmado (cor/peça). Se a fonte não sustentar cor atual, use roupa civil ou natureza-morta contextual sem emblema. Não invente insígnia, brasão, patch ou ambiente operacional.
- Confira o arquivo-fonte e o PNG final. Quando o logo deveria flutuar, confirme canal alfa no arquivo e pixels da área ao redor no resultado; estilos computados do logo devem ter background-color: transparent, padding: 0 e nenhum pseudo-elemento que forme placa. Reprove retângulo bege/branco, halo ou backing acidental mesmo com alfa no arquivo original.
- Aplique tratamento fotográfico consistente sem tingir uniforme, pele, texto, logo ou mascote. Examine a composição da capa em tela integral e a 25%, com foco em pertinência, recorte, contraste no ponto real do título e repetição de pessoa/cena. Registre fonte/licença ou prompt de geração, decisão e aprovação por capa.
- Sem inspeção visual por peça e registro específico, o lote fica “pendente”, nunca “aprovado”. Inspeção automática, texto alternativo e nome do arquivo não substituem a leitura do conteúdo visual.


### Gate de integridade do conjunto exportado

- Antes de renderizar de novo uma peça, remova apenas PNGs derivados dessa peça. Preserve fontes, dados de conteúdo e arquivos de entrada.
- Compare o inventário final de PNGs com a quantidade e os nomes esperados de cards e variantes. Arquivo de uma exportação anterior reprova o lote mesmo se o render corrente passou.
- Recrie folhas de contato após a limpeza. Inspecione individualmente o PNG canônico e cada variação de rede, em tamanho integral e na folha de contato.
- Variações por plataforma conservam a hierarquia do CTA, a palavra de ação em destaque e a composição do card. Registre qual variante foi inspecionada.
- Se uma variante divergir do template, exibir copy fora da área prevista ou estiver ausente/sobrando, corrija a lógica de CSS e exportação, limpe os PNGs derivados, reexporte e refaça a inspeção antes de aprovar.


### Verificação obrigatória de ação visível

- Inspecione o elemento de ação efetivamente visível, com largura e altura renderizadas maiores que zero; texto oculto não satisfaz o gate.
- Confira a ação existente em cada CTA, fallback e variante de Instagram/TikTok: área visível maior que zero, margem, contraste e hierarquia confortável a 270/360 px. A palavra ou expressão pode receber 120 px ou mais quando couber; não há piso universal de 120 px. A escala segue o trecho e a composição, conforme a regra atual de títulos.
- Reprove a peça se qualquer CTA terminar em mera afirmação, se a ação estiver oculta ou se alguma variante não tiver hierarquia de ação equivalente.


### Verificação de layout estático

- Medir margem do título e do apoio: alvo de 80 px, mínimo de 72 px, além da margem direita equivalente.
- Confirmar que o apoio acompanha o título em fluxo vertical, com espaço intencional de 24–48 px; rejeitar corpo fixado em coordenada absoluta que deixe um vazio grande.
- Conferir corpo em 36–44 px e apoio em 24–28 px, recorte da foto e contraste em tamanho integral e na escala de celular.

### Registro de refazimento integral

- Preserve a origem; gere copy-lock e manifesto com SHA-256 antes do primeiro render. Compare cada card, cada `staticCopy`, CTA fallback/rede, legenda, URL/data, texto de navegação e fechamento com o HTML visível. Normalize apenas espaço/quebra de linha.
- Avalie margem alvo de 80 px e mínimo de 72 px em todo texto principal, inclusive nas capas. Registre família, superfície, arquitetura, ponto focal, destaque literal, função do asset, crop e vizinhança no mapa visual.
- Mantenha três estados separados: `copy`, `estrutura` e `visual`. Por PNG, registre hash, tamanho, dimensão, leitura nativa, leitura a 270/360 px e nota concreta. A alteração do PNG invalida sua revisão anterior.
- Uma folha de contato compara ritmo do lote; não conta como inspeção individual. Status estrutural aprovado sem inspeção visual ligada ao hash continua visualmente `pendente`. Nunca preencha aprovação por código, existência do arquivo ou criação de prancha.
- No modo de redesign integral previsto no [protocolo de copy-lock e mapa visual](redesign-copy-lock-and-visual-map.md), o card final pode ser recomposto com frase, URL e ativos oficiais, sem cortar texto da arte antiga; mantenha quatro arquiteturas de fechamento e preserve as fontes originais.
