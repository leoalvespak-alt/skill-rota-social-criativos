# Refazimento visual completo com copy congelada

Use este fluxo quando o pedido abranger um feed, calendário ou lote existente inteiro e exigir nova direção visual sem reescrever as mensagens.

## Antes do layout

1. Identifique a pasta de origem, o destino novo e as variantes válidas. Preserve a origem. Faça manifesto com caminho, tamanho e SHA-256 dos dados, fontes, assets e PNGs.
2. Gere `copy-lock.json` com todos os textos visíveis por peça e por card: copy, `staticCopy`, CTA base, fallback, variantes por rede, legendas, datas, URLs, navegação e frase/URL oficial de fechamento. Guarde hashes por peça e do conjunto.
3. Compare o copy-lock com o texto de cada versão HTML e variante. A normalização pode ignorar espaço e quebra de linha; deve preservar acentos, caixa, pontuação, símbolos, negações, quantificadores e ordem. Registre e resolva toda divergência antes de desenhar. Texto em imagem exige conferência equivalente.
4. Mantenha copy e direção em arquivos separados. `direcao-visual.json` registra família e motivo, função e foco de cada canvas, arquitetura, superfície, fluxo e densidade, intervalos exatos de ênfase, ativo/origem/crop, vizinhança de calendário, CTA por rede e família de fechamento.

## Direção e desenho

- Canvas de feed: `1080×1350`. Margem útil alvo de `80 px`; mínimo de `72 px` para todo texto principal, medido no PNG após carregar fontes, imagens e transformações. Deixe logo e rodapé na área protegida.
- Escala de partida: título em `72–104 px`; palavra ou número focal em `104–160 px` quando couber; corpo em `36–44 px` (40 px como ponto inicial); apoio em `24–28 px`. O trecho, a largura e a leitura em telefone definem a medida. Não use escala universal para o vazio ou posição vertical.
- Mantenha Rajdhani Bold em títulos, IBM Plex Sans no corpo e Space Grotesk em números/apoios, conforme a identidade vigente. Superfícies: creme `#F4F1EB`, papel `#FFFDF8`, preto/cinza neutro, vermelho `#C1121F` e vinho `#8B0000`, com contraste aferido.
- Escolha arquitetura pelo assunto e pelo papel de leitura. O calendário deve distribuir arquitetura e superfície; não selecione layout, ativo ou pose por ID, regex temática ou módulo aritmético.
- Em cada carrossel, dê pelo menos três estruturas de leitura distintas aos quatro cards internos, salvo continuidade didática descrita no mapa. Não deixe três cards consecutivos com a mesma composição. No calendário, evite três capas consecutivas equivalentes em família e superfície, contando posts estáticos.
- Escolha de um a três intervalos já existentes para negrito, marcação ou sublinhado quando houver ganho de sentido. Registre início, fim e texto exato no original. Preserve juntos quantificadores, negações, condições e o verbo com seu sujeito. Título já em negrito não substitui hierarquia no corpo.
- Use caixa somente quando o contorno representar um grupo, comparação ou objeto informativo real. Dê largura ao texto antes de reservar espaço para figura. Ícone, mascote e foto precisam de função explicativa; objeto escolhido porque uma palavra aparece na copy não basta.
- Fotografia exige arquivo inspecionado, detalhe observado, relação com a copy, fonte/licença ou prompt de geração, posição e crop. Registre repetição. Não use aparência para inferir identidade, origem ou público; não simule tela, documento ou prova.
- CTA mantém cada string original. Varie a composição conforme a família; preserve a ação e o destino de cada rede, sem criar etiqueta textual.
- Em um refazimento completo documentado, é permitido recompor o card final. Preserve a frase oficial **“Quem traça a Rota, nunca perde o alvo!”**, a URL oficial quando prevista e os ativos reais da marca. Não recorte letras do PNG anterior. Use ao menos quatro arquiteturas de fechamento distribuídas pelo calendário; guarde os quatro originais.

## Render e aprovação

- Use o mesmo DOM, CSS, fontes e assets no preview e no PNG. Aguarde `document.fonts.ready` e carregamento completo de imagens antes de medir e exportar.
- Valide a copy na ordem do DOM, caixas de texto, margem, tamanho, colisões, contraste, logo e canvas `1080×1350`. Exporte um arquivo por arte canônica e por variante válida, sem resíduos antigos.
- Registre `copy`, `estrutura` e `visual` separadamente. Para cada PNG, guarde SHA-256, dimensão, revisão integral, leitura a 270 e 360 px de largura, revisão da sequência quando aplicável e observação específica. Mudou o hash, a revisão visual anterior não vale para o novo arquivo.
- Folha de contato serve para ritmo e comparação do lote; não substitui abrir o PNG exato. Preflight ou script que passou nunca escreve “inspecionado” ou “aprovado” por consequência.
- Sem inspeção individual vinculada ao hash e nota concreta, o estado visual permanece `pendente`. A aprovação exige pelo menos 4/5 em leitura/margens, hierarquia, representação, variedade/ritmo e identidade, sem falha obrigatória.
