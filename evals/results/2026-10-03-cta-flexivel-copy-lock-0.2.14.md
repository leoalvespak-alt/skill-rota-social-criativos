# Revisão de instruções da versão 0.2.14

Data: 03/10/2026. Escopo: coerência textual e estrutura do pacote; sem produção nem inspeção de criativos neste trabalho.

## Motivo

Gates herdados exigiam CTA de 120 px, título estático a 7% do topo, corpo de 30 px e corte de texto para caber. Eram incompatíveis com a escala atual e o refazimento com copy congelada.

## Cobertura

Foram lidos os cenários 25, 45, 47, 50, 51, 52 e 53 contra as regras atuais. Um agente independente leu SKILL.md e as referências de QA, HTML/CSS, grade/CTA e refazimento. Encontrou três brechas de corte/reescrita; elas foram corrigidas e reinspecionadas.

Resultado da revisão independente: coerência textual aprovada no escopo revisado. CTA de 120 px é facultativo quando couber; ação deve estar visível e legível em cada variante. Estáticos seguem margem alvo de 80 px/mínimo de 72 px, corpo de 36–44 px, apoio de 24–28 px e posição pelo foco. Copy-lock prevalece sobre comandos gerais de revisão editorial.

## Arquivos alterados

- SKILL.md: CTA, estáticos e precedência da copy congelada.
- references/production-qa.md: escala do CTA e limites da revisão editorial.
- references/html-css-system.md e references/carousel-grade-grid-cta.md: edição textual somente antes do congelamento.
- evals/45, 50 e 51: critérios antigos alinhados deliberadamente.
- evals/53: novo cenário para os conflitos e a precedência.
- Manifestos e documentação do plugin: versão 0.2.14.

## Limites e entrega

O empacotador compara todos os bytes da fonte, skill local e ZIP, os dois manifestos e referências locais. O relatório externo `auditoria_visual_2026-10-03/VERIFICACAO_PACOTE_0.2.14.json` registra SHA-256 e resultado final. Nenhum PNG recebeu aprovação a partir desta revisão de instruções.

A instalação em cache permanece preservada. Não houve publicação remota, commit ou push; o pacote é uma entrega local para upload autorizada pelo usuário. A confirmação de instalação/publicação depende da plataforma após o upload. O repositório canônico não foi presumido a partir da árvore Git ancestral.
