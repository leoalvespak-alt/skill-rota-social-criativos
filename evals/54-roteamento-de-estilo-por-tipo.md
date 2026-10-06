# Regressão 54: estilo escolhido pelo tipo de conteúdo (golden)

Motivo: o lote "feed visual v2" aplicou um único visual editorial a notícias, dicas e conteúdo; o resultado pareceu artificial e comercial. Em 06/10/2026 o usuário definiu um estilo por tipo de conteúdo.

## Casos e resultado esperado

| Pedido | Tipo | Estilo esperado |
|---|---|---|
| "Carrossel sobre o edital da PCBA: 750 vagas, prova em 06/12" | noticia | Painel Oficial |
| "Inscrições do concurso X encerram amanhã às 18h" | noticia | Painel Oficial, capa C7 |
| "Como montar uma sessão de duas horas de estudo" | dica-estudo | Ficha de Missão |
| "Explique haver × existir com exemplos" | conteudo | Mapa Ilustrado |
| "Aumento e desconto de 20% não se anulam" | conteudo | Mapa Ilustrado |
| "Post de domingo sobre não estudar o edital inteiro" | motivacao | Anotado à mão (ou Impacto se a frase tiver até 9 palavras) |
| "Card solto: Doze abas abertas" | frase | Impacto |
| "Apresente o módulo de leis digitais numa tarefa" | recurso | Ficha de Missão ou Mapa Ilustrado, sem tela simulada |

Falhas que reprovam: notícia em Ficha de Missão ou Impacto; conteúdo de matéria em Painel Oficial; o mesmo estilo em todas as peças de um lote misto sem justificativa; `checar-lote.cjs` não executado antes do HTML.

Ler com os casos 30, 40 e 52. Este cenário não é modelo de produção.
