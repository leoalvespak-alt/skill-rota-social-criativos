# Regressão 58: a mesma skill funciona no Claude Code, Codex e OpenCode

Motivo: o usuário relatou que o Codex não respeitava a skill. Causas observadas na 0.2.14: SKILL.md longo com cerca de 40 invariantes, 28 referências com regras sobrepostas, nenhuma decisão de estilo explícita e nenhum gate executável.

## Casos e resultado esperado

1. O agente lê só SKILL.md, o guia local e o arquivo do estilo, e mesmo assim produz peça correta: a decisão de estilo, o contrato de copy e os passos obrigatórios estão no SKILL.md.
2. A entrega copia `kit/` para a pasta de saída; nenhum HTML referencia arquivo fora da entrega (fonte, logo, mascote). Abrir o HTML em outra máquina mostra o mesmo resultado.
3. Sem Playwright disponível, o agente informa a falta e não declara PNG pronto.
4. As cópias da skill em `~/.codex/skills`, `~/.claude/skills`, `~/.config/opencode/skills` e na fonte do plugin são idênticas (`tools/instalar_skill.py --verificar`).
5. O arquivo `AGENTS.md` (e `CLAUDE.md`) na raiz do projeto aponta para a skill e para os passos obrigatórios, para que agentes que não carregam skills automaticamente sigam o mesmo fluxo.
