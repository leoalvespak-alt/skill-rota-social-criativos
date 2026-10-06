# Revisão 06/10/2026 · estilos por tipo de conteúdo e preflight executável (0.3.0)

## Motivo

1. O usuário relatou que o Codex não respeitava a skill, enquanto o Claude respeitava.
2. O lote `feed-visual-v2` (um visual editorial para tudo) foi rejeitado em testes por parecer artificial e comercial.
3. O usuário aprovou a Ficha de Missão (lote v3) para dicas e o estilo de `Carrosseis 01 - HTML e PNG` para notícias, pedindo capas menos genéricas, e trouxe três referências novas: "dev outros" (conteúdo ilustrado), "desenhossobtextos" (anotações à mão) e "impacts" (tipografia grossa).

## Diagnóstico da 0.2.14

- SKILL.md com cerca de 40 invariantes em parágrafos longos e 28 referências com regras sobrepostas; a escolha de estilo dependia de interpretação.
- Nenhuma regra mecânica era executada: margem, fonte, contador e travessão dependiam de o agente lembrar.
- Referências antigas fixavam um único sistema visual (creme + Rajdhani + Plex), o que produziu o lote v2 homogêneo.
- No estilo de notícias: corpo em 27–31 px (abaixo do piso de 36), metade inferior vazia em vários cards e 10 capas com a mesma arquitetura.

## O que mudou

- SKILL.md vira roteador com 8 passos, tabela de estilo por tipo e contrato de copy em 8 regras.
- `estilos/*.md`: um arquivo por estilo, com quando usar, anatomia fixa, variações codificadas, limites de copy por slot e checklist.
- `kit/`: CSS por estilo, modelos HTML com todas as variações, PNGs de referência, fontes e assets locais.
- `render.cjs` + `preflight.js`: exportação bloqueada por erro medido. `checar-lote.cjs`: mapa do lote bloqueado por erro de roteamento ou de variedade.
- Notícias: 8 capas (C1 número, C2 status, C3 calendário, C4 foto em painel, C5 recorte do documento, C6 comparativo, C7 prazo, C8 foto cheia com cota) e 9 internos com corpo de 34–40 px.

## Defeitos encontrados durante a implementação (e corrigidos no mecanismo)

- Sobreposição medida pela caixa de linha dava falso positivo em números grandes e deixava passar o "14/10" invadindo o título. Agora a medida usa a linha de base e a tinta.
- Foto em `var(--foto)` era resolvida a partir do CSS e não carregava, sem erro. Agora a foto vai em `style="background-image"` e o render acusa imagem que não carregou.
- Logo com "A" vermelho sumia sobre vinho. Criada `logo-rota-branco.png`; regra no SKILL.md.
- Texto de rodapé com duas linhas passava da margem inferior. Rodapé sobe para 80 px da borda.

## Cenários

Novos: 54 (roteamento), 55 (capa de notícia), 56 (preflight), 57 (troca de estilo com copy congelada), 58 (portabilidade). Relacionados: 17, 18, 19, 30, 35, 37, 40, 50, 52, 53.

## Pendências

- Nenhum lote real foi produzido ainda com Painel Oficial (capas novas), Mapa Ilustrado, Anotado ou Impacto; os exemplos usam copy existente. Validar com o público num primeiro lote.
- Publicação do plugin 0.3.0 na plataforma não foi feita.
