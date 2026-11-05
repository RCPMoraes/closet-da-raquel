# Closet da Raquel — checklist de publicação (GitHub Pages) · v5 "10/10"

O site é o `index.html` + alguns arquivos ao lado dele (sem build, sem servidor):

| Arquivo | Para quê |
|---|---|
| `index.html` | O app inteiro (HTML, CSS e JS num arquivo só, ~430 KB; antes 527 KB) |
| `logo.webp` | Logotipo (antes ficava embutido no HTML, 120 KB) |
| `manifest.webmanifest` | Instala como app (PWA): nome, cores e ícones |
| `sw.js` | Service worker: abre o app sem internet |
| `icons/` | `icon-192.png`, `icon-512.png`, `maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png` |
| `og.jpg` | Prévia de 1200×630 no WhatsApp (já vem uma pronta, pode trocar) |

> Suba **a pasta inteira** para o repositório do site. Abrir o `index.html` direto do computador continua funcionando (sem instalação/offline, que exigem `https://`). Se faltar o `logo.webp`, aparece o monograma "R".

## O que mudou na v5 ("10/10")
- **Fotos do diário no IndexedDB.** O `localStorage` (~5 MB) guarda só o texto leve do diário (`photoRef`); as fotos ficam no banco `closet-raquel-media`. Diários antigos com foto embutida são **migrados sozinhos** na primeira abertura. No backup e na nuvem as fotos continuam indo **dentro** do `data/acervo.json` (snapshot v4 — formato igual, compatível com versões anteriores). Se o banco de fotos falhar, o Push/Exportar dá erro em vez de enviar o diário sem fotos.
- **Avisos de espaço.** Em **Dados & backup → Espaço & app no celular**: quanto está ocupado, quantas fotos, botão **🔒 Proteger dados neste aparelho** (pede ao navegador para não apagar nada sozinho) e alerta quando passar de 80–85%. Se uma gravação falhar por falta de espaço, aparece um aviso claro.
- **PWA de verdade.** `manifest.webmanifest` + `sw.js` reais (o antigo era um manifesto/SW "embutido" que não funcionava). Testado no Chrome: instalável, sem erros de manifesto, e abre **offline**. O service worker **nunca** guarda nada do GitHub nem da previsão do tempo — só os arquivos do site. Só é registrado em `https://` ou `localhost`.
- **Acessibilidade.** Todos os campos com rótulo (eram 22 sem), link "Pular para o conteúdo", foco visível dourado ao navegar pelo teclado, aba atual anunciada (`aria-current`), avisos em `aria-live`. Com "reduzir movimento" ligado no celular, a galeria **não rola sozinha** e as animações param.
- **Peças com história.** Todas as categorias agora têm o campo **"História / significado (por que ela é especial?)"**. No Início aparece o bloco **Peças com história**, com uma **História do dia** que muda diariamente. Tocar numa história abre a peça para editar.
- **Looks especiais.** Em cada look salvo há **"♡ Marcar como especial…"** (💕 Nosso encontro, 🎂 Aniversário, 💍 Data especial, 🥂 Celebração, ✈️ Viagem a dois, ⭐ Favorito da vida). Eles ficam guardados no topo do álbum de looks. Um look salvo com a ocasião **"Encontro a dois 💕"** já entra como especial. Vai junto no backup e na nuvem.
- **Textos.** Sem "OOTD", "CPW", "Lookbook" e "Acloset" à vista: agora é "Look do Dia", "custo por uso", "álbum de looks". O menu diz **Início**. As telas vazias ganharam mensagens mais carinhosas.
- **Mais leve.** Logo fora do HTML (−120 KB), sem SW "blob" quebrado, e animações respeitando "reduzir movimento".
- **Manutenção.** Continua um HTML só, de propósito: separar CSS/JS em vários arquivos agora mudaria a ordem de dezenas de camadas de estilo e arriscaria quebrar algo. Os arquivos novos (PWA, ícones e logo) ficam ao lado.

## Modo de exibição: Auto · Desktop · Celular (v5.1)
- Igual ao LifeHub: um seletor **MODO DE EXIBIÇÃO** no menu lateral (computador) e no topo da tela (celular), com **✨ Auto**, **💻 Desktop** e **📱 Celular**.
- **Auto** segue o tamanho da tela. **Celular** mostra o app numa moldura de smartphone (430 px) com a barra inferior, mesmo no computador. **Desktop** mostra o menu lateral e a galeria larga, mesmo no celular, que abre "afastado", como a versão para computador.
- O modo forçado usa as mesmas regras de layout do celular e do computador de verdade, sem uma "imitação" parcial.
- A escolha fica salva **neste aparelho** (`atelier-view-mode`) e não vai para o backup nem para a nuvem, de propósito: o celular pode ficar em Celular e o notebook em Auto.
- O antigo botão "▣ Visualização" saiu do topo. A janela de boas-vindas "Como deseja visualizar seu closet?" continua aparecendo na primeira abertura.

## Instalar no celular dela (PWA)
1. Publique (seção 3) e abra **https://usuario.github.io/closet-da-raquel/**.
2. **Android/Chrome:** em **Dados & backup** aparece **📲 Instalar o Closet**, ou use o menu ⋮ → "Instalar app".
3. **iPhone/Safari:** Compartilhar (□↑) → "Adicionar à Tela de Início".
4. Depois de instalar, toque em **🔒 Proteger dados neste aparelho**.
5. Ao publicar uma versão nova, o app avisa: *"Uma versão nova do Closet chegou"*. É só fechar e abrir. Se mudar algo no `index.html`, troque também o `VERSION` no começo do `sw.js` (ex.: `closet-raquel-v5.1.1`; hoje está `closet-raquel-v5.1.0`) para renovar o cache.

> **Mesmo modelo de GitHub do LifeHub.** Site público num repositório, dados num repositório **privado** separado, token **fine-grained** só para ele. Os botões são os mesmos (💾 Salvar Config, 🔌 Testar Conexão, ☁️ Push, 📥 Pull, 🩺 Diagnóstico), e as proteções contra conflito e repositório público e o Auto-Sync funcionam igual. A diferença é o conteúdo: o Closet envia o **snapshot v4 do closet** (`data/acervo.json`), e o LifeHub envia o `lifehub-raquel-db.json`.

## 1. Dois repositórios, nunca um só
| Repositório | Visibilidade | Conteúdo |
|---|---|---|
| `closet-da-raquel` (site) | Público (Pages grátis) | `index.html`, `logo.webp`, `manifest.webmanifest`, `sw.js`, `icons/`, `og.jpg`, este README |
| `closet-raquel-dados` (dados) | **PRIVADO**, sem Pages | Só o `data/acervo.json`, que o próprio app cria no 1º Push |

- **Nunca** configure a sync apontando para o repositório do site. Peças, fotos, joias e relógios com valor e local, além do diário, ficariam públicos, e o histórico de commits guarda tudo **para sempre**.
- O app avisa quando o repositório de dados é público **ou publica GitHub Pages**: no 🔌 Testar Conexão, no 🩺 Diagnóstico e ao abrir. O Push manual pede confirmação, e o Auto-Sync fica bloqueado.
- Se o repositório antigo do site (`rcpmoraes/closet-da-raquel`) já tiver um `data/acervo.json`, apague esse arquivo e trate o histórico como público. O ideal é recriar o repositório ou limpar o histórico.
- Já usou o Closet com o LifeHub? Podem ser repositórios de dados **diferentes** (`closet-raquel-dados` e `lifehub-data`), ou o mesmo repositório privado com os dois arquivos. O token fine-grained pode dar acesso aos dois repositórios de dados, **nunca** aos do site.

## 2. Token (só fine-grained)
1. GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. *Repository access*: **Only select repositories** → marque só o `closet-raquel-dados`.
3. *Repository permissions → Contents*: **Read and write**. Não marque mais nada.
4. Defina uma expiração (ex.: 1 ano) e anote para renovar.
5. Não use token Classic com o escopo `repo`. O app ainda aceita esse token, mas mostra um aviso ⚠️ no teste, no diagnóstico e ao abrir.
6. O token fica salvo **neste navegador**, como no LifeHub. Em aparelho compartilhado, escolha "Apenas nesta sessão". Se o celular for perdido, revogue o token no GitHub.

## 3. Publicar o site
1. Suba a pasta toda (`index.html`, `logo.webp`, `manifest.webmanifest`, `sw.js`, `icons/`, `og.jpg`) no repositório do site.
2. Settings → Pages → Branch `main` / root → Save.
3. Abra pelo endereço **https://usuario.github.io/closet-da-raquel/** (sempre HTTPS, nunca o arquivo local).
4. A página tem `noindex`, então não aparece no Google. Mesmo assim, o link é público. O que protege os dados é o repositório privado.
5. **Nunca** coloque `data/acervo.json` nem backups `.json` no repositório do site.

## 4. Prévia e ícones
- Já vem um `og.jpg` (1200×630) com o logo. Se quiser, troque por uma foto de vocês ou do closet, no mesmo tamanho. O WhatsApp só lê URL absoluta: no `index.html`, troque `content="og.jpg"` por `https://usuario.github.io/closet-da-raquel/og.jpg`.
- Ícones do app (`icons/`) foram gerados a partir do logo. O favicon "R" embutido continua como reserva.

## 5. Personalizar
- **Recado**: no `index.html`, procure `RECADO DO DOUGLAS` (no começo do arquivo) e edite `titulo`, `texto` e `assinatura`. Se deixar `texto:""`, o cartão some.
- Dica: cadastre no seu aparelho, faça Push e, no celular dela, configure a sync e faça Pull. Ou entregue um backup `.json` para ela restaurar em **Dados & backup**.

## 6. Configurar a nuvem (aba **Sincronização GitHub**)
1. Repositório: `SEU-USUARIO/closet-raquel-dados` (aceita URL completa). Branch: em branco (é detectado sozinho). Arquivo: `data/acervo.json`.
2. Cole o token → **💾 Salvar Config** → **🔌 Testar Conexão** (precisa aparecer "Privado 🔒").
3. **☁️ Enviar p/ Nuvem (Push)** no 1º aparelho. Nos outros, use **📥 Baixar da Nuvem (Pull)** antes de editar.

## 7. Antes de entregar
- [ ] Repositório de dados **privado** e sem Pages criado; "🔌 Testar Conexão" mostra "Privado 🔒".
- [ ] "🩺 Diagnóstico" sem ✗ e sem ⚠️ de token Classic.
- [ ] 1º Push feito; Pull testado num 2º aparelho, com a confirmação aparecendo.
- [ ] Auto-Sync: deixe **desligado**, a menos que ela use um aparelho só. Quando ligado, ele envia depois de 3 min sem edições ou ao minimizar o app, só se algo mudou. Vale para peças **e** looks, agenda, favoritos, diário, perfil e desejos.
- [ ] Teste no **celular dela**: a barra inferior rola, o logo aparece no topo, a câmera funciona no cadastro, o zoom funciona.
- [ ] Salvar um look, agendar, registrar no diário → Push → Pull no outro aparelho → tudo aparece.
- [ ] **Dados & backup → Exportar**: o JSON tem `"version": 4`, `looks`, `diary` (com as fotos), `wishlist`… Guarde uma cópia.
- [ ] Registrar um look no diário **com foto** → Push → Pull no outro aparelho → a foto aparece no histórico.
- [ ] **Instalar** o app no celular dela, tocar em **🔒 Proteger**, ligar o modo avião e abrir: o Closet abre (a nuvem volta quando tiver internet).
- [ ] Em **Dados & backup**, o card "Espaço & app no celular" sem alerta ⚠️.
- [ ] Escrever a história de 2 ou 3 peças especiais (anel, aquele vestido…) e marcar um look como **💕 Nosso encontro**: um presente dentro do presente.
- [ ] Revise o recado do Douglas.

## Como a sync protege os dados (igual ao LifeHub)
- **Pull** sempre pede confirmação e mostra o que vem da nuvem (peças, looks, agenda, diário, desejos), porque substitui tudo no aparelho.
- **Push** compara a versão da nuvem com a última que este aparelho baixou ou enviou. Se outro aparelho mudou a nuvem, ele pergunta antes de sobrescrever. No Auto-Sync, ele pausa e mostra o aviso.
- Erro **409/422** não é reenviado automaticamente: o app avisa e sugere Pull.
- Ao abrir, se a nuvem tiver uma versão mais nova, aparece o aviso **"📥 Baixar da nuvem"** no topo. Ele só baixa quando ela clicar e confirmar.
- Extra do Closet: se o acervo deste aparelho estiver **vazio**, o Push é cancelado para não apagar o closet da nuvem.

## O que já vinha da versão v4 (continua igual)
- Proteção contra XSS com `window.closetEsc` (calendário, mala, miniaturas, clima, diário); fotos só como `data:image/...`.
- Backup e sync **v4** completos: peças + fotos, looks, Look do Dia, favoritos, diário (com fotos), perfil de estilo, desejos e logo. Backups antigos (só peças) trocam só as peças.
- Textos em pt-BR, cadastro abrindo em Roupas, recado do Douglas, barra mobile rolável, metas (`title`, `description`, `noindex`, `og:*`, favicon).
- Quem já tinha configurado a versão anterior não perde nada: repositório, token lembrado, Auto-Sync e o último SHA são migrados sozinhos.

## Checklist final "10/10"
- [ ] Repositório do site com a pasta completa; repositório de dados **privado** separado.
- [ ] Token fine-grained só no repositório de dados (Contents: Read and write).
- [ ] Recado do Douglas revisado (`RECADO DO DOUGLAS` no começo do `index.html`).
- [ ] `og.jpg` com URL absoluta (ou trocado por uma foto de vocês).
- [ ] App instalado no celular dela + 🔒 Proteger + teste offline.
- [ ] 1º Push feito, Pull testado em outro aparelho (peças, looks especiais, diário com foto).
- [ ] Backup `.json` guardado fora do celular.

## Detalhes técnicos (para quem mexer no código)
- Fotos do diário: `window.closetMedia` (banco `closet-raquel-media`, store `diaryPhotos`, chave = id do registro). `buildSnapshot` usa `hydrateDiary` (coloca a foto de volta como dataURL), e `applySnapshot` usa `storeDiary` (separa a foto e limpa as órfãs). `normalizeSnapshot` descarta `photoRef` vindo de fora.
- O Auto-Sync continua igual: qualquer gravação em `closet_raquel_*` (looks, agenda, diário…) ou nas peças marca "mudou"; o envio é o snapshot inteiro com hash para não repetir commits.
- Service worker: o site é buscado na rede primeiro, com o cache como reserva; os arquivos estáticos vêm do cache e se atualizam em segundo plano. Domínios de fora (GitHub, Open-Meteo) ficam fora do cache.
