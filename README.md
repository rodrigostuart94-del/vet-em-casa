# 🐾 Vet em Casa — Dra. Esther Maggessi

Site institucional para **atendimento veterinário domiciliar** em Teresópolis e Região.
Moderno, emocional, responsivo, com **modo escuro**, **PWA (instalável no celular)**, agenda online integrada ao **WhatsApp** e à **Google Agenda**, mapa da área de atendimento e SEO básico.

Tudo é **estático** (HTML, CSS e JavaScript puros) — não precisa de servidor, banco de dados nem build. É só publicar.

---

## 🚀 Publicar no GitHub Pages (passo a passo)

1. Crie um repositório novo no GitHub (ex.: `vet-em-casa`).
2. Envie **todos os arquivos desta pasta** para o repositório (mantendo a estrutura de pastas `assets/`, `css/`, `js/`, `icons/`).
   - Pelo site: botão **Add file → Upload files**, arraste tudo e confirme (Commit).
   - Ou pelo terminal:
     ```bash
     git init
     git add .
     git commit -m "Site Vet em Casa"
     git branch -M main
     git remote add origin https://github.com/SEU-USUARIO/vet-em-casa.git
     git push -u origin main
     ```
3. No repositório, vá em **Settings → Pages**.
4. Em **Source**, escolha **Deploy from a branch**, selecione a branch **main** e a pasta **/(root)**. Salve.
5. Aguarde ~1 minuto. O site ficará disponível em:
   `https://SEU-USUARIO.github.io/vet-em-casa/`

> O arquivo `.nojekyll` já está incluído para o GitHub Pages servir as pastas corretamente.

### Domínio próprio (opcional)
Em **Settings → Pages → Custom domain**, informe seu domínio (ex.: `vetemcasa.com.br`) e aponte o DNS conforme as instruções do GitHub.

---

## ✏️ Personalização rápida

### Trocar o número do WhatsApp / mensagens
Abra **`js/main.js`** e edite o bloco no topo:
```js
const CONFIG = {
  whatsapp: "5521995472564",            // só números, com DDI 55 + DDD
  msgPadrao: "Olá! Gostaria de agendar um atendimento veterinário domiciliar.",
  fuso: -3
};
```

### Editar serviços, depoimentos e blog
Tudo fica em **`js/data.js`** (texto simples). Adicione, remova ou altere itens das listas `SERVICOS`, `DEPOIMENTOS`, `BLOG` e `BLOG_CATS`.

### Adicionar fotos reais (pets, equipe, atendimentos)
Onde aparece um fundo azul com a pata dourada, é um **espaço reservado** para a sua foto.
Para colocar fotos de verdade na seção **Sobre Nós**, basta adicionar o `src` na imagem dentro do `index.html`:
```html
<img class="ph" src="assets/fotos/dra-esther.jpg" data-label="Dra. Esther" alt="Dra. Esther em atendimento" />
```
Coloque os arquivos na pasta `assets/fotos/`. Se o arquivo não existir, o site mostra automaticamente o espaço reservado com a marca — nunca uma imagem quebrada.

> Dica: use fotos na proporção indicada em `data-ratio` (`4x5` = retrato, `16x10` = paisagem).

### Cores e tipografia
As cores ficam em **`css/styles.css`**, no bloco `:root` (e `[data-theme="dark"]` para o modo escuro). Os nomes são autoexplicativos: `--petroleo`, `--navy`, `--ouro`, `--agua` etc.

---

## 🔌 Integrações opcionais

### Google Analytics
Cole antes de `</head>` no `index.html` (troque o ID):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script>
```

### Meta Pixel (Facebook/Instagram Ads)
Cole o trecho do Pixel fornecido pelo Gerenciador de Anúncios da Meta, também antes de `</head>`.

### Mapa
O mapa usa o Google Maps em modo *embed* (sem chave de API), centralizado em Teresópolis. Para mudar a região, edite o `src` do `<iframe>` na seção **Área de Atendimento**.

---

## 📦 O que está incluído

```
.
├── index.html              Página principal
├── manifest.webmanifest    Configuração do app instalável (PWA)
├── sw.js                   Service worker (funciona offline básico)
├── .nojekyll               Necessário para o GitHub Pages
├── css/styles.css          Estilos e temas (claro/escuro)
├── js/data.js              Conteúdo editável (serviços, depoimentos, blog)
├── js/main.js              Interatividade (agenda, menu, carrossel…)
├── assets/                 Logo, vídeo da marca, espaço para fotos
└── icons/                  Ícones e favicon
```

## ✅ Recursos prontos
- Responsivo (celular, tablet e desktop)
- Modo escuro automático + botão de alternância
- PWA instalável no celular
- Agenda online → mensagem pronta no WhatsApp + botão para Google Agenda
- Carrossel de depoimentos, blog com filtro por categoria, modais de serviço
- Botão flutuante de WhatsApp com mensagem automática
- Acessibilidade (foco visível, navegação por teclado, respeito a “reduzir movimento”)
- SEO básico (meta tags, Open Graph e dados estruturados de negócio local)

---

### Observações honestas
- A **agenda** não usa servidor: ao enviar, o site monta a mensagem e abre o WhatsApp para você confirmar. É o modelo mais confiável para um site estático. Para confirmação automática real e sincronização total com a Google Agenda, seria necessário um back-end (ex.: um formulário com automação) — posso ajudar a montar isso depois, se desejar.
- O **feed do Instagram** não é embutido automaticamente porque exige token de API; o site leva o visitante direto ao seu perfil. Dá para integrar um feed real com um serviço de terceiros, se quiser.

Feito com ❤ para quem ama seu pet.
