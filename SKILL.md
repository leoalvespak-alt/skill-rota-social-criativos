---
name: rota-social-criativos
description: "Cria, revisa e produz conteúdo social da Rota de Ataque (concursos policiais) em português brasileiro: carrosséis, posts estáticos, Stories, legendas, blog e roteiros. Use para qualquer pedido de copy, criativo, carrossel, post, arte, capa, PNG, redesign ou revisão visual da Rota. Escolhe o estilo visual pelo tipo de conteúdo (notícia, dica de estudo, conteúdo de matéria, motivação, frase de impacto), usa o kit HTML/CSS da skill e só exporta PNG depois do preflight automático. Também cria carrosséis e posts para o PERFIL PESSOAL de estudos do usuário quando ele pedir \"modelo pessoal\" ou \"modelo pessoal orgânico\" (fotos dele + caixas de texto estilo Instagram, sem marca da Rota)."
---

# Criativos sociais da Rota de Ataque

Esta skill vale igual no Claude Code, Codex e OpenCode. Siga os passos **na ordem**. Os passos marcados como OBRIGATÓRIO não têm exceção: se um deles não puder ser cumprido, pare e diga ao usuário o que faltou.

Caminhos abaixo são relativos à pasta desta skill (`SKILL_DIR`). O projeto de trabalho é `C:\Users\Lenovo\Desktop\Rota de Ataque\Rota Criativos e automacao` (ou a raiz aberta que contenha `Docs/GUIA_GERACAO_CRIATIVOS_ROTA.md`).

## Modo pessoal orgânico (verifique ANTES do passo 0)

Se o pedido contém **"modelo pessoal"** ou **"modelo pessoal orgânico"**, a peça é para o **perfil pessoal de estudos do usuário, não para a Rota de Ataque**. Então:

1. Leia este arquivo e `estilos/pessoal-organico.md` (o fluxo dele substitui os passos 2 a 5) e abra `kit/exemplos/out/pessoal-organico/prancha.png`. Não precisa do guia da Rota.
2. Copy vem do markdown indicado pelo usuário e é **congelada** (nada de reescrever, cortar ou acrescentar CTA). O contrato de copy do passo 3 não se aplica para editar: só relate problemas.
3. Fotos vêm da pasta indicada. Capas só com o usuário estudando ou mesa/tela; no mínimo 60% dos cards com foto de estudo, caderno ou mesa com monitor; repetir foto entre carrosséis pode; logo dentro da foto (tela do produto) pode, aplicada por cima não. Fluxo completo e comandos (`kit/tools/pessoal.cjs`, `render-lote.cjs`) em `estilos/pessoal-organico.md`.
4. Sem logo, sem card de fechamento, sem frase/site da Rota, sem "Deslize" obrigatório. O preflight (`data-perfil="pessoal"`) bloqueia logo e assinatura da Rota.
5. Passos 6 e 7 valem igual (render com preflight, abrir prancha e cada PNG, entrega com `direcao.json`, HTML, `kit/`, `fotos/`, PNGs e `preflight.json`).

Sem essas palavras no pedido, **nunca** use o modelo pessoal; com elas, nunca use os estilos da Rota.

## Passo 0 · Ler o mínimo (OBRIGATÓRIO)

1. Este arquivo inteiro.
2. `Docs/GUIA_GERACAO_CRIATIVOS_ROTA.md` do projeto.
3. O arquivo do estilo escolhido no passo 2 (`estilos/<estilo>.md`) e a prancha PNG dele em `kit/exemplos/out/<estilo>/prancha.png` (abra a imagem).
4. Só se o pedido for de copy nova: `references/guia-copy-clara-humana-e-util.md` e a seção do formato em `references/copy-por-formato.md`.

As demais referências em `references/` são consulta pontual (lista no fim). Não as leia por hábito.

## Passo 1 · Entender a entrega

Responda internamente, antes de qualquer arquivo:

- **Saída:** só texto (copy, legenda, roteiro, revisão) ou arte (HTML + PNG)? Pedido de texto termina no passo 3.
- **Formato:** carrossel (1080×1350, 5 a 10 cards), post estático (1080×1350), Story (1080×1920).
- **Copy:** nova ou congelada? Se o usuário disse "não mude a copy" ou existe `copy-lock`, o texto é intocável: você muda composição, nunca palavras.
- **Fatos:** quais afirmações precisam de fonte oficial (vagas, datas, banca, requisitos, recurso da plataforma)?

## Passo 2 · Escolher o estilo pelo tipo de conteúdo (OBRIGATÓRIO)

| Tipo de conteúdo | Estilo | Arquivo |
|---|---|---|
| **Notícia** de concurso: edital, autorização, vagas, banca, cronograma, prazo, requisito, retificação, resultado, etapas | **Painel Oficial** (limpo, informativo, creme, números grandes) | `estilos/painel-oficial.md` |
| **Dica de estudo / método**: rotina, sessão, revisão, organização, como ler edital, como usar um recurso | **Ficha de Missão** (papel com fita, post-it, recibo, carimbo) | `estilos/ficha-missao.md` |
| **Conteúdo de matéria**: regra de português, cálculo, lógica, lei, resumo, questão comentada | **Mapa Ilustrado** (diagrama, setas, janelas, etiquetas pixel) | `estilos/mapa-ilustrado.md` |
| **Motivação com lastro / estratégia curta / bastidor / cena reconhecível** | **Anotado à mão** (papel, serifa, círculos e notas manuscritas) | `estilos/anotado.md` |
| **Frase curta de impacto**: card solto, citação, capa viral | **Impacto** (tipografia grossa, adesivo, foto + texto pesado) | `estilos/impacto.md` |
| **Perfil pessoal** do usuário (só com "modelo pessoal" no pedido) | **Pessoal orgânico** (foto real + caixa de texto do Instagram + marcações à mão) | `estilos/pessoal-organico.md` |

Regras de escolha:
- Na dúvida entre dois tipos, pergunte: "o leitor quer **saber um fato**, **fazer algo**, **aprender uma matéria** ou **sentir/reconhecer algo**?" → Painel, Ficha, Mapa, Anotado/Impacto.
- A **capa** de qualquer carrossel pode usar o estilo Impacto quando a abertura é uma frase de até 9 palavras. Os internos seguem o estilo da peça. Notícia não usa capa Impacto.
- Recurso da plataforma (cursos, leis digitais, banco de questões, mentoria) entra em Ficha de Missão ou Mapa Ilustrado, ligado a uma tarefa. Nunca simule tela do produto.
- Pedido do usuário por um estilo específico vence esta tabela.

## Passo 3 · Copy (contrato que vale para todos os estilos)

Se a copy é congelada, pule para o passo 4 (você só confere as regras 1, 2 e 8 e registra problemas, sem editar).

1. **Fato só com fonte.** Vagas, datas, banca, requisito, preço, resultado, recurso do produto: fonte oficial registrada. Sem fonte, não afirme. Exemplo hipotético recebe a marca "Exemplo didático".
2. **Sem travessão (—)** em texto de arte. Sem as palavras vetadas: utilizar, transformar, otimizar, alavancar, crucial, mergulhar, revolucionário, implementar.
3. **Situação antes de sigla.** A capa chama a pessoa certa pela situação, decisão ou fato. Concurso/cargo só aparece se o pedido ou a copy delimitar.
4. **Uma ideia por card**, com o que a pessoa precisa para aplicar: critério, motivo, exemplo, limite. Card que só repete o anterior sai ou se aprofunda.
5. **Voz:** frases simples, "você", verbos concretos. Sem pergunta retórica, sem "Não é X, é Y", sem slogan de cursinho, sem urgência ou promessa inventada.
6. **CTA:** uma ação principal com destino real (link da bio, PDF existente, salvar para usar). Ação secundária vai menor.
7. **Fechamento de carrossel:** frase oficial "Quem traça a Rota, nunca perde o alvo!" + logo + `rotadeataque.com.br`.
8. **Limites por slot** estão no arquivo do estilo. Copy nova que estoura o limite: reescreva. Copy congelada que estoura: mude a variação ou divida o card, nunca corte.

Detalhes e exemplos: `references/guia-copy-clara-humana-e-util.md`, `references/legendas-e-ctas.md`, `references/copy-por-formato.md`.

## Passo 4 · Mapa de direção (OBRIGATÓRIO em lote ou carrossel)

Antes de escrever HTML, crie `direcao.json` na pasta da entrega:

```json
{ "pecas": [
  { "id": "P01", "tipo": "noticia", "estilo": "painel-oficial", "formato": "carrossel",
    "capa": "C2", "internos": ["I1", "I3", "I4", "I5"], "cta": "CTA-DATA", "fechamento": "F1", "fundo": "creme" }
] }
```

`tipo`: noticia | dica-estudo | conteudo | motivacao | frase | recurso | pessoal (só modelo pessoal). Códigos de variação: arquivo do estilo.
Escolha cada variação pelo conteúdo do card (número → linhas/equação; comparação → colunas; etapas → linha do tempo/fila; frase-exemplo → caderno/frase anotada). Nunca por rodízio, ID ou sorteio.

Rode e corrija até passar:

```bash
node "<SKILL_DIR>/kit/tools/checar-lote.cjs" direcao.json
```

O verificador bloqueia: estilo errado para o tipo, capa repetida em peças vizinhas, menos de 3 arquiteturas nos internos, 3 cards seguidos iguais, menos de 4 fechamentos diferentes num lote.

## Passo 5 · HTML com o kit (OBRIGATÓRIO para arte)

1. Copie `kit/` inteiro para a pasta da entrega como `kit/` (fontes, CSS, assets e ferramentas). Não referencie arquivos fora da entrega.
2. Parta do modelo `kit/exemplos/<estilo>.html`: copie as `<section class="card">` das variações escolhidas e troque só textos e imagens. Mantenha as classes.
3. Cada card precisa de: `class="card <prefixo do estilo>"`, `data-bg`, `data-estilo`, `data-variante`, `data-arquivo` (nome do PNG: `card-01`, `card-06-tiktok`...). Último card do carrossel: `data-fechamento`. Post único: `data-estatico`.
4. Marque título com `data-papel="titulo"` e corpo com `data-papel="corpo"` (o preflight cobra tamanho mínimo).
5. Uma logo por card (`logo-rota.png` em fundo claro, `logo-rota-claro.png` em carvão, `logo-rota-branco.png` em vermelho/vinho). "Deslize →" em todos os cards menos o último. Sem número de card, contador ou cabeçalho de série.
6. Foto: `style="background-image:url('...')"` no HTML (não em variável CSS). Antes de usar, abra a foto e registre o que mostra, a relação com o tema e a origem/licença. Cargo com farda: pesquise "farda + cargo" em fonte oficial. Não repita a mesma pessoa em capas vizinhas.
7. Mascote: só os PNGs de `kit/assets/mascote/` (Raposa, trilha 1), com as cores originais.
8. Não reduza fonte para caber. Reorganize, troque de variação ou divida o card.
9. Story: mesmo estilo, `class="card story ..."` (1080×1920). Texto e ação dentro da faixa y 250 a 1670; confira a interface real do Instagram antes de fechar.

## Passo 6 · Render, preflight e inspeção (OBRIGATÓRIO)

```bash
node kit/tools/render.cjs <arquivo.html> <pasta-de-saida>
```

- O render roda o preflight antes e **não exporta nada se houver erro**: texto fora da margem de 72 px, fonte abaixo do piso (24 px geral, 34 corpo, 42 manuscrito, 60 título), texto sobreposto, contraste baixo, logo ausente ou duplicada, "Deslize" errado, travessão, palavra vetada, contador de card, imagem ou foto que não carregou, canvas fora do tamanho.
- Corrija o layout e rode de novo. `--forcar "motivo"` só com autorização explícita do usuário, e o motivo fica gravado.
- Depois de exportar, **abra `prancha.png` e cada PNG** (ferramenta de leitura de imagem). O preflight não vê seta cruzando texto, foto mal recortada, vazio sem intenção ou hierarquia fraca. Registre em `preflight.json` → `pngs[].visual` uma nota concreta por PNG (`"aprovado: ..."` ou `"refazer: ..."`). Sem nota, o PNG continua pendente.
- Se o Playwright não estiver disponível, diga ao usuário e não declare PNG pronto.

## Passo 7 · Entrega

Pasta da entrega com: `direcao.json`, HTML editável, `kit/`, PNGs, `preflight.json` com notas visuais, legendas se pedidas, e fontes dos fatos (`fonte-qa.json` ou seção no README). Na resposta, diga o que foi gerado, o que ficou pendente (fonte a revalidar, foto a trocar) e mostre a prancha.

## Regras que nunca mudam

- Paleta: creme `#F4F1EB`, papel `#FFFDF8`, carvão `#171717`, vermelho `#C1121F`, vinho `#8B0000`, cinzas. Coral `#F04452` só como ênfase sobre fundo escuro. Amarelo `#E8B23A` só em blocos pequenos de realce (Mapa Ilustrado e Impacto). Cor do concurso só em brasão, farda ou item pequeno.
- Sem barra ou filete vertical colorido decorativo.
- Brasão identifica o concurso; nunca sugere endosso oficial.
- Margem útil de 80 px (mínimo 72).
- Copy congelada é intocável.
- Não declare "aprovado" sem ter aberto a imagem.

## Referências de consulta (abrir só quando o caso pedir)

| Situação | Arquivo |
|---|---|
| Copy nova, revisão de copy | `references/guia-copy-clara-humana-e-util.md`, `references/aprofundamento-copy.md`, `references/copy-concreta-e-narrativa.md` |
| Formato específico (Story, blog, roteiro, legenda) | `references/copy-por-formato.md`, `references/legendas-e-ctas.md`, `references/formats.md` |
| Público e ângulo | `references/audience-and-message.md`, `references/angles-and-copy.md`, `references/narrative-frameworks.md` |
| Prova, fonte, alegação de produto | `references/rota-brand-and-evidence.md` |
| Foto de capa e farda | `references/foto-de-capa-e-pesquisa-de-farda.md`, `references/pexels-image-research.md` |
| Refazimento de lote com copy congelada | `references/redesign-copy-lock-and-visual-map.md` |
| QA detalhado | `references/production-qa.md`, `references/carousel-copy-layout-audit.md` |
| Escrita natural | `references/guia-escrita-natural-ptbr.md`, `references/humanizacao-ptbr.md` |
| Mascote e itens | `references/pacote-visual-rota.md`, `kit/assets/MANIFESTO-PACOTE-MASCOTE.md` |

Quando uma referência antiga contradiz este arquivo ou o arquivo do estilo, **vale este arquivo**. As referências `visual-direction.md`, `style-orchestration.md`, `carousel-grade-grid-cta.md`, `html-css-system.md` e `campaign-visual-grammar.md` descrevem o sistema anterior aos estilos e continuam úteis só como fundamento.

Mudanças nesta skill seguem `evals/PROCESSO-DE-MUDANCA.md`; cenários de regressão em `evals/`.
