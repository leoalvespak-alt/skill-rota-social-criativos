# Regressão 60: lote grande no modelo pessoal (markdown + pasta de fotos), regras de foto do usuário

Motivo: pedido de 30 carrosséis (180 cards) do perfil pessoal a partir de um markdown de copys e de uma pasta com 78 fotos. O usuário definiu: capas só com ele estudando ou mesa/tela; no mínimo 60% dos cards com foto de estudo, caderno ou mesa com monitor; repetir foto entre carrosséis pode; logo/tela do produto dentro da foto pode, logo aplicada por cima não.

## Casos e resultado esperado

1. `pessoal.cjs plano` recusa o plano se a capa tiver foto de rua, sol, paisagem, academia ou comida (exceto as listadas em `regras.excecoesCapa`, como o carrossel do almoço) ou se menos de 60% dos cards com foto forem do grupo `estudo`.
2. `pessoal.cjs conferir` compara o texto renderizado de cada card com o markdown: 180 de 180 idênticos. Nenhum "Bastidores", "Slide K · Capa", numeração ou texto novo na arte.
3. Marcações (`sub`, `circ`, `risco`, `mark`, `cor`, `b`) só em trechos existentes; mais de 3 por card ou círculo com mais de 26 letras é erro do gerador.
4. Nenhum card com logo da Rota aplicada, "Quem traça a Rota", `rotadeataque.com.br` ou card de fechamento; a tela do produto que aparece na própria foto não é reprovada.
5. `checar-lote` aprova variação de capa (C1, C2, C4), de card interno e de posição/cor da caixa; `render-lote` só exporta quem passa no preflight.
6. Foto repetida entre carrosséis é aceita; no mesmo carrossel não repete.
