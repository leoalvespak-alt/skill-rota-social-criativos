# Estilo 5 · Impacto

**Para:** frase curta e forte que precisa parar o polegar: capa viral de carrossel (de qualquer estilo), card solto, citação, chamada de campanha, post de identificação ("cena reconhecível"). Feito para alcance, compartilhamento e salvamento.
**Não usar para:** corpo explicativo longo, notícia com muitos dados (use C1/C7 do Painel Oficial).

**Referência:** "impacts" (adesivo amarelo inclinado com caixa alta pesada; "SUCCESS IS A JOURNEY" com muralha tipográfica, etiqueta e código de barras; grade editorial "Herground" com minúsculas grossas, palavra circulada, foto com texto pesado e recorte orgânico).

## Arquivos

- CSS: `kit/estilos/impacto.css`
- Modelo: `kit/exemplos/impacto.html` (P27, P06, P38, P18, P44)
- PNG de referência: `kit/exemplos/out/impacto/prancha.png`

## Anatomia fixa

- Fundos: creme, vermelho, vinho ou carvão. Amarelo de realce só em etiqueta/adesivo pequeno.
- Tipografia: Archivo Black (adesivo e editorial grosso) ou Anton (muralha condensada). Uma palavra pode trocar para Instrument Serif itálica.
- Logo pequena no topo esquerdo (`.im-topo`), apoio curto e "Deslize →" no rodapé. Card solto (`data-estatico`) sem "Deslize".
- Caixa alta/baixa só por CSS (`text-transform`, classe `.minusculas`): o HTML guarda a copy como foi aprovada.

## Variações

| Código | Nome | Use para |
|---|---|---|
| I1 | Adesivo | frase de 3 a 6 palavras num bloco inclinado, pílula com o complemento |
| I2 | Muralha | 2 a 3 palavras gigantes condensadas, etiqueta no meio, detalhes gráficos (xadrez, código de barras) marcados `data-decor` |
| I3 | Editorial grosso | frase em minúsculas pesadas, uma palavra circulada ou em serifa |
| I4 | Foto + texto grosso | cena fotográfica pertinente + frase pesada no terço inferior |
| I5 | Recorte orgânico | foto em forma livre + frase sobreposta |

## Regras específicas

1. Uma ideia, poucas palavras: título até 9 palavras, apoio até 18. Se a copy for maior, este estilo não serve (vá para Anotado ou Ficha).
2. Tipografia decorativa que sai da margem precisa de `data-sangria` e não pode carregar palavra essencial.
3. Foto: inspecionada, pertinente, licenciada ou gerada com registro; pessoa diferente das capas vizinhas.
4. Como capa de outro estilo, registre no mapa `"capaEstilo": "impacto"`; os internos seguem o estilo da peça.
5. Sem promessa, urgência inventada ou slogan de cursinho. Impacto vem da forma, não de exagero na copy.

## Checklist

- [ ] Frase legível a 360 px em menos de 2 segundos.
- [ ] Contraste conferido sobre foto (`data-contraste-ok` só depois de olhar o PNG).
- [ ] `render.cjs` sem erro; cada PNG aberto.
