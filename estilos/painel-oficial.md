# Estilo 1 · Painel Oficial

**Para:** notícia de concurso, edital publicado, concurso autorizado ou iminente, vagas, cronograma, requisitos, banca, retificação, prazo, resultado, etapas do certame.
**Não usar para:** dica de estudo (Ficha de Missão), explicação de matéria (Mapa Ilustrado), motivação (Anotado ou Impacto).

**Por que este estilo:** é informativo; o leitor quer o fato oficial rápido e confiável. Limpo, creme, números grandes, sem enfeite. O lote "feed visual v2" falhou por parecer editorial e comercial. Este estilo não usa slogan, pessoa genérica sorrindo nem chamada de venda.

## Arquivos

- CSS: `kit/estilos/painel-oficial.css` (com `kit/base.css`)
- Modelo com todas as variações: `kit/exemplos/painel-oficial.html`
- PNG de referência: `kit/exemplos/out/painel-oficial/` (abra a `prancha.png` antes de desenhar)

## Anatomia fixa (não muda entre peças)

- Fundo creme `#F4F1EB`. No máximo 1 card vinho por carrossel (destaque) e capa vinho só em C7 (prazo).
- Título Rajdhani 700 (78 px no miolo, 100 px na capa) com linha fina embaixo. Corpo IBM Plex Sans 37 px. Números Space Grotesk 700 em vermelho.
- Brasão do órgão na capa (canto superior direito ou ao lado do dado). Brasão nunca vira marca d'água nem sugere endosso.
- Rodapé: logo à esquerda, "Deslize →" vermelho à direita. Último card sem "Deslize". Em fundo vinho/vermelho use `logo-rota-branco.png`.
- Linha de fonte (`.po-fonte`) quando o card traz fato verificável: `fonte: <órgão/banca> · <data da consulta>`.

## Capas (escolha UMA pelo fato mais forte da notícia)

A capa é o problema histórico deste estilo: as 10 capas de "Carrosseis 01" eram todas foto escura de pessoa fardada + número. Agora a capa nasce do **tipo de fato**:

| Código | Nome | Use quando o fato principal é | Exige |
|---|---|---|---|
| C1 | Número-manchete | quantidade de vagas, questões, salário confirmado | número da copy; brasão |
| C2 | Status do concurso | em que etapa o concurso está (autorizado, banca, edital, inscrições, prova) | etapas confirmadas por fonte; etapa futura marcada como `falta` (tracejada) |
| C3 | Calendário | data de prova, de abertura ou resultado | data da copy; folha de calendário |
| C4 | Foto em painel | cargo com farda marcante, quando a pessoa ajuda a reconhecer a carreira | foto pesquisada ("farda + cargo", fonte oficial); painel claro, sem escurecer tudo |
| C5 | Recorte do documento | uma frase do edital/portaria é a notícia | **transcrição literal** do documento, com referência (`Edital nº ..., item ...`). Nunca invente trecho |
| C6 | Comparativo | 2 ou 3 números lado a lado (cargos, órgãos, edições) | números da copy |
| C7 | Prazo | inscrição/isenção/recurso encerrando | data e hora oficiais; fundo vinho |
| C8 | Foto cheia | (o modelo antigo) só quando nenhuma outra serve | **no máximo 1 a cada 4 capas** do lote |

Regras de capa:
1. Comece pelo fato mais específico (número, data, etapa). Nunca abra com "Novo concurso", "Atenção" ou "Saiu!" genérico.
2. O nome do órgão aparece uma vez (kicker), junto do brasão.
3. Capas vizinhas no calendário nunca repetem o mesmo código. `checar-lote.cjs` bloqueia.
4. Pessoa fotografada: uma pessoa diferente por capa; pesquisar farda antes; sem rosto quando não houver foto adequada (use C1, C2, C3, C6).

## Miolo (variações internas)

| Código | Nome | Use para |
|---|---|---|
| I1 | Linhas de número | vagas por cargo, distribuição |
| I2 | Equação | total = partes (questões, pontos) |
| I3 | Grade aberta | lista de matérias, requisitos curtos |
| I4 | Colunas | comparação real entre 2 cargos/órgãos |
| I5 | Linha do tempo | cronograma, etapas com datas |
| I6 | Oficial × previsão | o que o documento confirma e o que ainda falta |
| I7 | Checagem | requisitos com caixa de marcar |
| I8 | Grupos | blocos de matérias, áreas do direito (bom em vinho) |
| I9 | Dia de prova | manhã × tarde, objetiva × discursiva |

Distribuição: pelo menos 3 variações diferentes nos internos; nunca 3 seguidas iguais; no máximo 1 card vinho.

## CTA e fechamento

- CTA de notícia: data grande (`.po-data-grande`) + título + ação que já está na copy ("Salve este panorama..."). Não prometa material ou alerta que não existe.
- Fechamento: frase oficial **"Quem traça a Rota, nunca perde o alvo!"** + logo + URL. Pode usar o fechamento F1–F4 da Ficha de Missão adaptado ao creme ou os PNGs oficiais de `Cards de fechamento/`.

## Limites de copy por slot (para caber sem reduzir fonte)

| Slot | Limite |
|---|---|
| Título de capa | até 9 palavras |
| Título interno | até 10 palavras |
| Corpo | até 35 palavras por card |
| Itens de grade | até 7 itens, cada um até 5 palavras |
| Nota | até 20 palavras |

Se a copy aprovada passar do limite, mude a variação (ex.: I3 → I4) ou divida em dois cards. Com copy congelada, nunca corte.

## Checklist antes de exportar

- [ ] Fato da capa tem fonte oficial registrada (`fonte-qa.json`) e foi revalidado no dia.
- [ ] Data, número e nome do órgão idênticos à fonte.
- [ ] Etapas futuras aparecem como pendentes, não como confirmadas.
- [ ] Foto (C4/C8): farda pesquisada, pessoa diferente das capas vizinhas, crop sem cortar rosto.
- [ ] `render.cjs` sem erro; prancha aberta; cada PNG aberto.
