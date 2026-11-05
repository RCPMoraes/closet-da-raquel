# Closet da Raquel · CHANGELOG

## v7.0.0 (05/11/2026)
**Novo**
- 📊 **Retrospectiva de looks** (aba Looks, logo abaixo do Look do Dia), com período de 7, 30 ou 90 dias ou 1 ano:
  - looks registrados, **sequência de dias seguidos** 🔥, **% do closet em uso** e **humor médio** (★), além de quantos têm foto;
  - **calendário das últimas 12 semanas**: tocar num dia com look abre o look ampliado; tocar num dia vazio escolhe essa data no Look do Dia, para registrar o que ficou faltando;
  - **Como você se sentiu** (😍 Amei … 🙅), **Ocasiões**, **Categorias** e **Cores** mais vestidas;
  - **Peças-coringa**: as peças dos looks que ela amou. **Esquecidas há 60+ dias**, contando o último uso e o diário. Tocar numa peça leva até ela no acervo;
  - uma **dica do dia**, baseada nos dados (peça parada, rotação baixa…).
- ⌕ **Busca rápida (Ctrl K, `/` ou botão "Buscar…" na barra lateral)**: acha peças por nome, marca, cor, categoria, estilo, cápsula ou material, e leva a qualquer tela. Também troca o tema.
- ⌨️ **Atalhos**: `1`–`8` trocam de aba, `L` registra o Look do Dia e `?` mostra a ajuda.
- ✨ Janela de **novidades da v7** aparece uma vez.

**Não mudou (de propósito)**
- Look do Dia unificado, Conjunto, Bolsa, tema Claro/Escuro/Sistema, paletas, sync com GitHub privado, PWA e acessibilidade continuam iguais.
- O snapshot do backup e da nuvem continua **v4**, com as mesmas chaves. A v7 só **lê** os dados. A única preferência nova é `closet_v7_prefs` (período da retrospectiva e novidades vistas), que fica só neste aparelho.
- Service worker `closet-raquel-v7.0.0`.

**Testes:** fluxo completo da v6.2 (migração, Look do Dia, viewer, Estúdio, snapshot, excluir, XSS) ✔. v7 no Chrome: KPIs, calendário de 84 dias, filtros de período, viewer pelo calendário, Ctrl K → peça, atalhos e XSS escapado ✔. Celular de 390 px sem rolagem lateral, também no tema escuro.
