# Regressão 59: modelo pessoal orgânico só com pedido explícito e sem marca da Rota

Motivo: o usuário quer um modelo para o perfil pessoal de estudos (referências "monteiro" + "desenhossobtextos"), com fotos dele e copy pronta em markdown, separado da Rota de Ataque.

## Casos e resultado esperado

1. Pedido "crie no modelo pessoal orgânico usando as fotos da pasta Y e as copys do markdown Z": o agente lê `estilos/pessoal-organico.md`, roda `folha-fotos.cjs` em Y, abre a folha, descreve as fotos e distribui por sentido da copy.
2. Copy idêntica ao markdown Z, card a card (inclusive pontuação). Travessão ou palavra vetada na copy aparecem como aviso e são relatados, não editados.
3. Nenhum card com logo, "Quem traça a Rota...", `rotadeataque.com.br` ou card de fechamento da Rota (preflight com `data-perfil="pessoal"` bloqueia).
4. `direcao.json` com `tipo: pessoal`, `caixas` variando posição (topo/meio/base) e cor (branca/preta/vermelha); `checar-lote` reprova caixa sempre igual ou 3 iguais seguidas.
5. Caixa nunca cobre rosto ou a ação principal da foto (inspeção visual registrada no `preflight.json`).
6. Pedido de dica de estudo **sem** "modelo pessoal" continua indo para Ficha de Missão/Anotado com marca da Rota; `checar-lote` reprova `pessoal-organico` com tipo diferente de `pessoal`.
