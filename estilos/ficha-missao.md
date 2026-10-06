# Estilo 2 · Ficha de Missão

**Para:** dica de estudo e procedimento ("como fazer"): organizar rotina, montar sessão, revisar erros, ler edital, planejar semana, usar recurso da plataforma numa tarefa. A pessoa sai com uma ação.
**Não usar para:** notícia (Painel Oficial), explicação de matéria em si (Mapa Ilustrado), frase motivacional solta (Anotado ou Impacto).

**Aprovado em 05/10/2026** (lote v3, `entrega_publicacao/2026-10-03-a-17-feed-ficha-missao-v3/`, plano `PLANO_REDESIGN_FICHA_MISSAO_V3.md`). Referência externa: série "Café com sua dev" (juliacardoso.dev), adaptada à paleta Rota.

## Arquivos

- CSS: `kit/estilos/ficha-missao.css` + ajuste de tamanho opcional `kit/estilos/ficha-missao.js`
- Modelo: `kit/exemplos/ficha-missao.html` (P01, P08, P14, P44 completos)
- PNG de referência: `kit/exemplos/out/ficha-missao/prancha.png`
- Especificação completa (tokens, medidas, formato da copy): `PLANO_REDESIGN_FICHA_MISSAO_V3.md`, seções 3, 5 e 6, na raiz do projeto.

## Anatomia fixa

- Fundo carvão (padrão), creme ou vinho (vinho = aviso com prazo), granulação leve e anéis de alvo no canto inferior esquerdo.
- Papel pautado com fita adesiva; título Rajdhani com **uma** palavra em Instrument Serif itálica vermelha.
- Post-it vermelho com manuscrito Caveat e rótulo funcional: **Por que importa**, **Cuidado** ou **Na prática**. Cerca de 1 a cada 4 post-its em versão creme.
- Carimbo só com função: **EXEMPLO DIDÁTICO**, **FONTE OFICIAL** ou data/prazo da copy.
- Rodapé: pílula "Deslize →" à esquerda, logo à direita. Sem contador, sem cabeçalho de série.

## Variações

| Card | Códigos |
|---|---|
| Capa | RECIBO (headline + recibo "FICHA DE MISSÃO" com os 4 passos), PRAZO (carimbo grande de data), RECIBO-FOTO (polaroide), POSTER (headline curta em caixa alta) |
| Internos | A ficha + post-it · B duas colunas · C recibo de conta/tempo/agenda · D caderno anotado · E polaroide + ficha · F checklist · G fila de carimbos · H número/diagrama focal · `+M` com Raposa |
| CTA | CTA-1 missão de hoje (checklist) · CTA-2 âncora (horário, data, fórmula) · CTA-3 caderno para completar · CTA-4 recurso/PDF com Raposa apontando |
| Fechamento | F1 alvo + Raposa · F2 relatório da missão · F3 post-it gigante · F4 ficha + Raposa |

Escolha da variação interna pelo conteúdo do card, nunca por rodízio:
números/tempo → C · comparação real → B · lista que a copy já enumera → F · etapas/documentos em sequência → G · frase-exemplo ou modelo a preencher → D · um número domina → H · insight + ressalva → A.

## Copy

- Cada card: título + corpo de 15 a 45 palavras + nota de 10 a 25 palavras. O insight ou a ressalva vai para o post-it.
- "Exemplo didático:" sai do texto e vira o carimbo.
- Formato de marcação: `*palavra*` ênfase serifada; `__trecho__` sublinhado manuscrito; `~~x~~` riscado; `((x))` circulado; `____` lacuna (ver plano v3, seção 5).

## Checklist

- [ ] 4 internos com ≥ 3 arquiteturas; nenhum post-it cobre texto da ficha.
- [ ] Vermelho `#C1121F` como texto só sobre papel; sobre carvão use `#F04452`.
- [ ] Raposa trilha 1, cores originais, tocando a base visual.
- [ ] Recibo da capa lista exatamente o que os cards entregam.
- [ ] `render.cjs` sem erro; cada PNG aberto.
