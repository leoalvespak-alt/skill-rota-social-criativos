# Sistema HTML/CSS → PNG

Use quando a tarefa incluir produção. Prefira HTML/CSS simples e editável; Playwright/Puppeteer para screenshot se já disponível ou fácil de usar. Não migre para Next.js/React nem instale framework grande só para exportar.

## Camadas separadas

```text
CONTEÚDO e origem da prova
  ↓
DIREÇÃO visual e hierarquia
  ↓
LAYOUT / primitivas de informação
  ↓
HTML/CSS editável
  ↓
RENDER no canvas nativo
  ↓
PRE-FLIGHT estrutural + QA visual e factual
  ↓
PNG final
```

Mantenha copy e dados por peça (concurso, formato, papel, hook, apoio, CTA, `proofSource`, tipo `captura|ilustração`, assets) separados dos tokens visuais e do código de exportação. Pode ser um objeto JS simples ou HTML organizado; não crie um motor abstrato maior que a campanha. Não misture texto factual em dezenas de seletores CSS, nem uma única função gigante com copy, layout e screenshot.

## Canvas e tokens

- Autorize cada peça em canvas fixo do **destino**, não em layout desktop “responsivo” posteriormente fotografado. Feed/carrossel `1080×1350`; Story `1080×1920`; mudanças só por briefing.
- Story: reserve a zona essencial `y=250…1720`. Marca decorativa pode tocar áreas externas, mas gancho, prova e ação não.
- Defina poucos tokens semânticos (superfície, texto, texto secundário, cor Rota, cor do concurso, margem, grade-base, famílias tipográficas e escala de sombras/bordas). A campanha escolhe valores. Evite uma lista de centenas de presets combináveis que permita peça fora da marca.
- Fontes reais devem carregar antes da captura (`document.fonts.ready`). Use fallback conhecido e cheque o render; fonte substituída muda quebras e pode cobrir a prova.
- `text-wrap: balance` ajuda em headlines curtas, quando suportado; confira quebra no navegador real. Defina largura e `line-height` intencional. Não dependa de autoajuste que encolha até a mensagem ficar ilegível. Reescreva primeiro, depois ajuste escala e recorte. Para blocos de leitura, prefira alinhamento/fluxo natural.

## Primitivas de informação, não moldes visuais

Um componente pode comunicar `hook`, `body`, `list`, `stats`, `quote`, `checklist`, `process`, `comparison`, `CTA`, `image/prova`, `number` ou `highlight`. Use apenas o tipo apropriado ao conteúdo. `stats` exige fonte; `quote`, autor e autorização; `number`, significado contextual. A composição de cada tipo pode variar. Não deixe o sistema gerar automaticamente badge, linha, sombra, número de fundo e CTA em todos os cards.

Capturas do produto e assets ficam em caminhos previsíveis junto à peça ou são incorporados de modo portátil quando necessário. Mantenha resolução suficiente para o recorte; não estique captura pequena. Ao publicar HTML de preview, garanta que os recursos também carreguem fora da máquina local. O PNG final deve funcionar independentemente desses caminhos.

## Composição de assets e crop

Classifique cada asset antes do CSS:

- **Flutuante** (logo, brasão, ícone ou recorte isolado): use arquivo com canal alfa real quando o fundo do canvas deve aparecer. Se o original vier com fundo branco/preto, prepare uma versão transparente fiel antes de compor e examine contorno/halo em fundo claro **e** escuro. Não simule transparência cobrindo o retângulo com a cor do canvas, `mix-blend-mode` ou máscara imprecisa.
- **Screenshot/interface:** mantenha as superfícies reais da UI, inclusive branco autêntico. Recorte uma região de interesse com limites deliberados; use um painel/frame somente se ele tornar a transição para o canvas intencional. Não remova o branco da interface como se fosse fundo externo nem redesenhe botões ou números para consertar o crop.

Defina área útil, proporção e posição do crop antes de aplicar `object-fit`, `object-position`, `overflow: hidden` ou transformações. Verifique que palavras, controles, bordas e sombras relevantes não ficam amputados, que não sobra cabeçalho/rodapé acidental da captura e que o conteúdo principal não fica pequeno dentro de um grande retângulo vazio. Não estique imagem nem amplie além da resolução que sustenta o PNG nativo. Um zoom que corta a prova é pior que um recorte menor e legível.

Preview e exportação devem usar o mesmo asset e enquadramento. Depois de renderizar, inspecione o PNG **isolado** e em conjunto, sobre o fundo real da peça; a página de preview pode esconder emendas, faixas brancas ou colisões quando vista apenas como mosaico no navegador.

## Preview e exportação

Use **o mesmo DOM, CSS, fontes e assets** para preview e PNG. No navegador automatizado, espere fontes e imagens terminarem de carregar; defina viewport e escala de dispositivo para produzir dimensões exatas; capture o elemento do canvas ou página sem barras/toolbar de edição. Se usar CSS de preview, ele só deve posicionar ou escalar o canvas na tela, nunca alterar seu layout interno.

Após exportar, execute o pre-flight estrutural e a inspeção visual descritos em [produção e QA](production-qa.md). Preview nativo e PNG precisam corresponder visualmente; medidas de DOM não substituem ver a imagem.

Ao ajustar conteúdo, altere primeiro a camada de dados/copy; ao ajustar hierarquia, altere a composição; ao ajustar repetição de campanha, altere tokens/componentes. Depois renderize novamente e aplique [produção e QA](production-qa.md).
