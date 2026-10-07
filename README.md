# rota-social-criativos

Skill de criativos sociais da Rota de Ataque (v0.5.0) para Claude Code, Codex e OpenCode.

- `SKILL.md`: roteador obrigatório (estilo por tipo de conteúdo, contrato de copy, passos).
- `estilos/`: Painel Oficial (notícias), Ficha de Missão (dicas), Mapa Ilustrado (conteúdo), Anotado à mão (motivação), Impacto (frases) e **Pessoal orgânico** (perfil pessoal de estudos, só com "modelo pessoal" no pedido; sem marca da Rota).
- `kit/`: CSS, fontes OFL, logos, Raposa, modelos HTML com todas as variações, PNGs de referência e ferramentas (`render.cjs` com preflight, `checar-lote.cjs`, `folha-fotos.cjs`, `pessoal.cjs` e `render-lote.cjs` para lotes grandes do modelo pessoal).
- `evals/`: cenários de regressão. `references/`: consulta.

Instalação: copie esta pasta para `~/.claude/skills/rota-social-criativos`, `~/.codex/skills/rota-social-criativos` ou `~/.config/opencode/skills/rota-social-criativos`. Render exige Playwright (`npm i -D playwright && npx playwright install chromium`).
