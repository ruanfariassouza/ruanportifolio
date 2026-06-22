# Ruan Farias — Portfólio

Portfólio autoral de Ruan Farias, social media e digital creative de Vila Velha, ES. O projeto foi concebido como uma peça de apresentação: a experiência, o conteúdo e o movimento demonstram direção criativa enquanto os cases explicam o processo.

## O que existe no site

- Home editorial com hero WebGL, manifesto, projetos selecionados, processo, serviços e contato.
- Sete cases claramente identificados como projeto real, estudo autoral, marca-conceito ou projeto autoral.
- Páginas internas com problema, insight, resposta, sistema visual, entregáveis e aprendizado/resultado esperado.
- Página sobre, formulário de contato configurável e transições entre rotas.
- Versão mobile sem WebGL, com fundos estáticos e layouts simplificados.
- Respeito a `prefers-reduced-motion`, lazy loading de rotas e canvases isolados.

## Stack

- React 18 + Vite
- React Router 6
- Three.js + React Three Fiber + Drei
- GSAP + ScrollTrigger + SplitText
- Framer Motion
- Tailwind CSS e CSS Modules
- GLSL via glslify
- Deploy preparado para Vercel

## Rodando localmente

Requer Node.js 18 ou superior. O repositório usa pnpm e inclui lockfile.

```bash
pnpm install
pnpm dev
```

O Vite informa o endereço local no terminal. Para validar a versão de produção:

```bash
pnpm build
pnpm preview
```

## Contato e variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha apenas os canais que serão publicados:

```env
VITE_CONTACT_EMAIL=contato@seudominio.com
VITE_WHATSAPP_URL=https://wa.me/55...
VITE_LINKEDIN_URL=https://www.linkedin.com/in/...
VITE_INSTAGRAM_URL=https://www.instagram.com/...
```

O formulário valida os campos e prepara uma mensagem no aplicativo de e-mail usando `VITE_CONTACT_EMAIL`. Canais vazios não são exibidos; assim, nenhum contato fictício chega à produção.

## Scripts

- `pnpm dev`: servidor de desenvolvimento.
- `pnpm lint`: ESLint sem tolerância a warnings.
- `pnpm build`: bundle de produção.
- `pnpm preview`: prévia local do bundle.

## Organização

```text
src/
├── canvas/       # cenas, shaders e pós-processamento
├── components/   # UI, layout e componentes compartilhados
├── context/      # estado global do preloader
├── data/         # projetos, serviços e configuração pública
├── hooks/        # mouse, scroll, preloader e viewport
├── pages/        # rotas
├── sections/     # seções por página
├── styles/       # tokens, layout e animações globais
└── utils/        # GSAP, matemática e scroll virtual
```

## Conteúdo e manutenção

- Cases: `src/data/projects.js`
- Serviços: `src/data/services.js`
- Contatos e metadados: `src/data/site.js`
- Tokens visuais: `src/styles/globals.css`
- Assets públicos: `public/images` e `public/videos`

Os cases conceituais não usam clientes ou métricas inventadas. Quando não existe validação real, o site apresenta o trabalho como hipótese, aprendizado ou resultado esperado.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Mantenha o framework preset como Vite.
3. Adicione as variáveis de contato em **Project Settings → Environment Variables**.
4. Faça o deploy. O `vercel.json` já mantém o fallback de rotas do React Router e cache longo para assets versionados.

## Qualidade

Antes de publicar, execute:

```bash
pnpm lint
pnpm build
```

Também vale revisar o site em um celular real e comprimir novamente qualquer foto ou vídeo substituído no futuro.
