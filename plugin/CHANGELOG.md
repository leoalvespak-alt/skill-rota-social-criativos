# Changelog

## 0.5.0 (07/10/2026)

- Modelo pessoal em escala: `kit/tools/pessoal.cjs` lê o markdown de copys do usuário e um plano (`entrada.json`) e gera o HTML de todos os carrosséis com a copy intocável. Subcomandos `plano`, `html` e `conferir` (compara o texto renderizado de cada card com o markdown).
- Escolha automática e variada de layout por card (caixa única, duas caixas, linhas destacadas, lista de linhas curtas, nota à mão, papel sem foto, faixa de fechamento), de posição (topo, meio, base, equilibradas) e de cor (branca, preta, vermelha).
- Regras de foto do usuário no gerador: capas só com ele estudando ou mesa/tela (exceções por tema), no mínimo 60% dos cards com foto de estudo, caderno ou mesa com monitor; repetição entre carrosséis permitida. Logo ou tela do produto dentro da foto é permitida.
- `kit/tools/render-lote.cjs`: renderiza vários HTML em paralelo, sempre com preflight.
- Marcações: círculo só até 26 letras (não quebra de linha); sublinhado e círculo funcionam dentro de linhas destacadas; lista de linhas curtas com marcador em CSS (sem numerar, para não acrescentar texto).
- Preflight do modelo pessoal avisa quando os blocos de texto passam de 58% do card e reprova acima de 72%.
- Gerador: aceita título `## NN. Título`, `### Slide N | Capa`, negrito no meio da frase e fechamento sem negrito; nova variação P9 (caixas empilhadas em cores alternadas); `papel: "auto"`.
- Capas repetidas (faltou foto): cor, variação, recorte (zoom 135%), inclinação e tipo de marcação diferentes da primeira capa com a mesma foto.
- Cenário 60.

## 0.4.0 (06/10/2026)

- Novo **modelo pessoal orgânico** (`estilos/pessoal-organico.md`, `kit/estilos/pessoal-organico.css`, prefixo `pe`) para o perfil pessoal de estudos do usuário. Ativa só com "modelo pessoal" ou "modelo pessoal orgânico" no pedido. Base: referências "monteiro" (foto real + caixa de texto do Instagram) e "desenhossobtextos" (círculo, riscado, sublinhado e nota à mão).
- 4 capas (C1 a C4) e 8 internos (P1 a P8): caixa branca, preta ou vermelha no topo, meio ou base; linhas destacadas; duas caixas; lista; riscado e corrigido; nota à mão com seta; papel sem foto; faixa de borda a borda; Story.
- Fonte Literata (OFL) para a serifa de leitura parecida com a do Instagram; IBM Plex Sans como alternativa "clássica".
- Preflight: `data-perfil="pessoal"` proíbe logo e assinatura da Rota, deixa "Deslize" opcional, exige foto de fundo e transforma travessão/palavra vetada em aviso (copy do usuário é congelada).
- `checar-lote.cjs`: tipo `pessoal`, campo `caixas` com variação obrigatória de posição e cor, sem fechamento.
- `kit/tools/folha-fotos.cjs`: folha de contato de uma pasta de fotos para escolher a foto de cada card.
- Cenário 59.

## 0.3.0 (06/10/2026)

- SKILL.md reescrito como roteador curto: passos obrigatórios, escolha de estilo por tipo de conteúdo, contrato de copy e precedência sobre referências antigas.
- Cinco estilos com variações, cada um com especificação (`estilos/*.md`), CSS, modelo HTML e PNGs de referência: Painel Oficial (notícias, com 8 capas novas), Ficha de Missão (dicas), Mapa Ilustrado (conteúdo), Anotado à mão (motivação/estratégia) e Impacto (frases e capas virais).
- Kit portátil (`kit/`): fontes (inclui Anton, Archivo Black, Instrument Serif Regular e Silkscreen, OFL), logos (inclui versão branca para vermelho/vinho), Raposa e itens reduzidos.
- `kit/tools/render.cjs` exporta PNG só depois do preflight (`preflight.js`): margem, pisos de fonte, sobreposição pela tinta real, contraste, logo, "Deslize", travessão, palavras vetadas, contador, imagens e fotos carregadas; gera prancha e relatório; limpa PNGs residuais do render anterior.
- `kit/tools/checar-lote.cjs` valida o mapa do lote: estilo por tipo, capas vizinhas, variedade de internos e fechamentos, cota de foto cheia.
- `AGENTS.md`/`CLAUDE.md` na raiz do projeto e `tools/instalar_skill.py` para manter Claude Code, Codex e OpenCode com a mesma cópia.
- Cenários 54 a 58.
- Copy: nenhuma regra removida; o essencial foi consolidado no contrato do SKILL.md.

## 0.2.14

- Remove o piso universal de 120 px do CTA; exige ação visível, hierarquia, contraste e leitura a 270/360 px em cada variante.
- Alinha estáticos à margem alvo de 80 px, mínimo de 72 px, corpo de 36–44 px e apoio de 24–28 px.
- Retira posição vertical obrigatória e painel fotográfico de largura fixa dos estáticos.
- Preserva texto congelado quando faltar espaço; revisão editorial só precede o congelamento.
- Atualiza os cenários 45, 50 e 51 e acrescenta o cenário 53 para esses conflitos.
- Inclui as mudanças de refazimento integral da 0.2.13 no pacote de upload.

Status: pacote local para upload. Publicação remota e atualização da instalação dependem da confirmação na plataforma.

## 0.2.13

- Define procedimento de refazimento visual com copy congelada e mapa separado da copy.
- Separa conferência de copy, preflight estrutural e inspeção visual por PNG e SHA-256.
- Exige registro de função e repetição de ativos, arquitetura, ênfases e leitura em escala móvel.
- Acrescenta 12 cenários de regressão para margem, variedade, lógica, CTA, fechamento e cópias coerentes da skill.
- Alinha as instruções ao guia do projeto e prevê recomposição do fechamento oficial em refazimentos integrais.

Status histórico da 0.2.13: candidato local, incluído na 0.2.14. Não há confirmação de publicação remota.
