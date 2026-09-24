---
name: rota-social-criativos
description: Planeje, crie ou revise posts estáticos, carrosséis e Stories visuais da Rota de Ataque para Instagram e TikTok, com estratégia e copy nas artes, prova fiel dos planos de estudo, HTML/CSS editável e PNG. Não inclui legendas, roteiros de Reels ou publicação por padrão.
---

# Criativos sociais da Rota de Ataque

Crie peças que uma pessoa interessada no concurso compreenda no celular sem conhecer a plataforma. A identidade e os arquivos reais da Rota são a base; referências externas não substituem a marca nem autorizam inventar prova. Trabalhe em português brasileiro.

## Roteiro de decisão

1. **Grounding:** identifique concurso, produto/oferta, formato, objetivo, restrições, arquivos atuais e público. Estime o que ele já sabe e, quando a campanha justificar, investigue problemas, perguntas, obstáculos e resultados desejados em [público e mensagem](references/audience-and-message.md). Leia [marca e evidência](references/rota-brand-and-evidence.md) e confirme as fontes. Use o contexto já dado; pergunte só se uma lacuna alterar materialmente o resultado.
2. **Estratégia:** fixe objetivo, pessoa/situação, fricção, ideia dominante, por que importa, ação e provas disponíveis. A prova limita o que se pode afirmar; ela não precisa ser a primeira coisa apresentada. Escolha abertura e progressão em [frameworks narrativos](references/narrative-frameworks.md). Se uma prova faltar, troque por ângulo sustentado; se nenhum servir, registre a lacuna e não fabrique a peça factual.
3. **Copy:** gere o hook da tensão, pergunta, objeção ou desejo do público qualificado — não do nome do recurso ou de dados isolados do plano. Dê contexto e significado antes de pedir que o leitor interprete uma interface. Em carrossel, o primeiro card é um convite específico à pessoa certa; os dados e a demonstração entram quando pagam a promessa. Diferencie hook, benefício, prova e CTA em [ângulos e voz](references/angles-and-copy.md).
4. **Direção visual:** antes do layout, registre para cada peça/card sua função persuasiva, ideia dominante, elemento que deve dominar e progressão da mensagem; escolha o tratamento visual que torna essa ideia mais clara em [direção visual](references/visual-direction.md). Se a foto contextual tiver função real **ou o usuário pedir busca de imagens**, consulte [pesquisa de imagens Pexels](references/pexels-image-research.md); busque fotos antes de considerar geração por IA. Não comece por logo, título, print e CTA em posições predefinidas. Se houver [gramática visual da campanha](references/campaign-visual-grammar.md), carregue-a e preserve decisões aprovadas sem fixar a composição. Em campanha nova ou redesign relevante, compare A fiel/segura, B expressiva e C inesperada/coerente, variando composição. Direção aprovada dispensa redescoberta.
5. **HTML/CSS:** leia o formato em [formatos](references/formats.md) e use [sistema HTML/CSS](references/html-css-system.md) para separar conteúdo, direção e componentes. Desenhe diretamente para o canvas final, não para um desktop reduzido.
6. **Render:** exporte o mesmo HTML/CSS do preview em PNG nativo, aguardando fontes/assets; detalhes em [sistema HTML/CSS](references/html-css-system.md).
7. **Pre-flight e QA:** execute as checagens estruturais automáticas quando houver navegador automatizado; depois inspecione PNG integral e em escala de celular, incluindo foco e leitura rápida da mensagem, conforme [produção e QA](references/production-qa.md). Corrija no código, renderize de novo e repita as duas checagens.

## Invariantes

- Toda afirmação factual sobre produto, oferta ou resultado e toda demonstração exigem fonte verificável. Isso não obriga mostrar screenshot em toda peça ou card. Nunca complete lacunas com funcionalidade ou prova inventada; critérios e fallback em [marca e evidência](references/rota-brand-and-evidence.md).
- Captura real pode ser ampliada ou recortada sem alterar significado. Reconstrução/adaptação deve ser apresentada como ilustração, jamais como screenshot autêntico. Recurso focal legível vale mais que miniaturas de teoria, resumo, lei, vídeo e questões juntas.
- Escreva para o público real: o público frio precisa reconhecer concurso e situação/benefício antes de siglas ou jargão interno. Use a Regra do Um — ideia, tensão, benefício e ação dominantes, com prova adequada às alegações. Em carrossel, uma ideia por card; a capa deve atrair a pessoa certa e prometer o que a sequência entrega, sem descarregar detalhes técnicos.
- A Rota de Ataque é a marca; o brasão identifica o concurso/edição. Preferências específicas do pedido e da campanha prevalecem sobre padrões gerais de marca, formatos externos e presets.
- Texto legível é requisito de exportação: nenhum texto visível pode ficar abaixo de **15 pt (20 CSS px no canvas 1080 px)**, inclusive legenda, número, rótulo, rodapé, microcopy e CTA. Não reduza a fonte para caber; encurte/reordene o texto, amplie o bloco ou retire o que for secundário. Texto que já vem rasterizado numa captura precisa ser recortado/ampliado até atingir leitura confortável; se não for possível sem distorcer a prova, troque o recorte ou não o use.
- Cada criativo pode exibir no máximo **uma logo da Rota de Ataque**. Escolha cabeçalho ou rodapé; não repita a mesma marca nos dois. Brasão e marca do produto na UI autêntica não são aplicação extra da logo.
- A peça precisa parecer feita para feed/Stories, não uma ficha técnica ou página editorial: evite microtexto, excesso de caixa alta espaçada, rótulos miúdos e alinhamentos de documento. Faça a mensagem principal e o benefício dominarem antes da identificação de recursos.
- Evite o motivo de **barra cromática decorativa**: filetes curtos, sublinhados, bordas coloridas no topo/lateral de cartões ou segmentos saturados repetidos parecem componentes genéricos de template/arte por IA. Para hierarquia, use tipografia e cor em palavras; para agrupar, espaço, superfície completa discreta ou contorno neutro; para fluxo, verbos/números e setas alinhadas. A regra vale para posts, carrosséis e Stories. Preserve indicadores funcionais e detalhes que fazem parte de captura autêntica; nunca os redesenhe ou masque. Se um detalhe real competir com a arte, escolha outro recorte autêntico ou transcreva o conteúdo com atribuição clara.
- Mantenha título, explicação e prova no mesmo grupo visual. Não use `space-between` ou margens automáticas para empurrar partes do mesmo argumento para extremidades opostas; caixas comparativas agrupam nome e explicação, diagramas alinham etapas e setas por elementos separados numa grade consistente.
- Cada card precisa dizer um ponto compreensível, contribuir para a sequência e preparar o passo seguinte. Palavra decorativa isolada (como “hoje?”) só fica se completar uma pergunta/promessa clara; no percurso inteiro, título, destaque e apoio precisam explicar a mesma ideia.
- Crop de print preserva palavras, controles e respiro interno: texto ou botão não pode encostar/cortar na borda. Prefira recapturar a região inteira ou incluir margem/frame que respeite o screenshot autêntico; nunca esconda letra amputada no canvas nem reduza a captura a ponto de o texto virar textura. A regra vale para feed, carrossel e Story.
- O formato padrão é HTML/CSS editável com exportação final em PNG nativo. Post/carrossel: 1080×1350; Story: 1080×1920 com conteúdo essencial fora dos 250 px superiores e 200 px inferiores, salvo pedido diferente.
- Imagem gerada pode servir pontualmente a contexto ou atmosfera, não a tipografia, logotipo, brasão, interface, captura ou prova. Se reduzir credibilidade, não use.
- Não escreva legendas, hashtags ou roteiros de vídeo, nem publique ou agende, a menos que o usuário peça separadamente.

## Entrega

Em planejamento, entregue por peça a função, copy final na arte, prova e origem, composição, dimensão e CTA. Em produção, entregue HTML/CSS editável, PNGs, prévias quando úteis e um registro sucinto de QA e fontes. Preserve alterações alheias e saídas anteriores recuperáveis ao revisar conjuntos existentes.

O [registro das fontes externas da evolução](references/external-source-audit.md) documenta a pesquisa; a skill não depende desses repositórios para funcionar.
Ao alterar esta skill, use os cenários de regressão em [evals](evals/); eles não são templates de produção.
