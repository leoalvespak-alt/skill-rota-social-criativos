# Changelog

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
