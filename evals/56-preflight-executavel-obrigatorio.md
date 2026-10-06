# Regressão 56: o preflight é código, não lembrete

Motivo: agentes (em especial o Codex) aprovavam PNGs com texto na borda, fonte pequena, contador de card ou travessão porque as regras estavam só em texto. Em 06/10/2026 as regras mecânicas passaram para `kit/tools/preflight.js`, executado por `kit/tools/render.cjs` antes de exportar.

## Casos e resultado esperado

1. Número de 300 px cuja tinta invade o título abaixo: o render acusa "texto sobreposto" e não exporta. (Caso real: capa C7 em 06/10/2026.)
2. Foto de fundo com caminho errado: o render acusa "imagem de fundo não carregou". (Caso real: `var(--foto)` resolvido a partir do CSS.)
3. Corpo de 30 px marcado `data-papel="corpo"`: erro de piso.
4. Card com "02/07" isolado: erro de contador. Data legítima recebe `data-data`.
5. Último card com "Deslize →": erro. Card intermediário sem "Deslize": erro.
6. Duas logos no mesmo card: erro.
7. O agente usa `--forcar` sem autorização do usuário: reprova a entrega, mesmo que os PNGs pareçam bons.
8. Preflight sem erro e PNG não aberto: o estado visual continua "pendente". Declarar "aprovado" reprova.
9. Seta de diagrama cruzando um rótulo (o preflight não mede seta): deve ser pega na inspeção visual da prancha e do PNG.

Ler com os casos 18, 19, 35, 37, 50 e 52.
