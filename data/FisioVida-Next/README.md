# FisioVida — Front-end

Painel administrativo da clínica FisioVida, desenvolvido com Next.js 15, React 19 e TypeScript.

## Requisitos

- Node.js 18 ou superior
- pnpm
- Backend FisioVida-1 disponível em `http://localhost:8080/api`

## Instalação

Na pasta `data/FisioVida-Next`:

```bash
pnpm install
```

## Desenvolvimento

```bash
pnpm dev
```

Abra `http://localhost:3000` no navegador.

## Build de produção

```bash
pnpm run build
pnpm start
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste o destino do backend, se necessário:

```env
API_URL=http://localhost:8080
NEXT_PUBLIC_API_URL=/api
```

O Next.js encaminha chamadas do navegador em `/api/*` para `${API_URL}/api/*` usando rewrites same-origin.

## Estrutura

```text
app/
  (public)/login/          Tela de login
  (protected)/             Páginas autenticadas e layout
    dashboard/             Painel inicial
    usuarios/              Gestão de usuários (ADMIN)
    agenda/                 Placeholder
    pacientes/               Placeholder
    configuracoes/           Placeholder
  providers.tsx             Providers globais
  not-found.tsx              Página 404
components/                  Layout, loading e notificações
context/                     AuthContext e ToastContext
lib/                         Cliente de API, erros e utilitários
```

## Autenticação

- O access token JWT fica somente em memória no AuthContext.
- O refresh token é um cookie HttpOnly gerenciado pelo backend.
- Chamadas autenticadas renovam a sessão ao receber 401.
- O backend oficial fica em `C:\Users\Giovani\Desktop\Fisioterapia-1` e precisa estar disponível em `localhost:8080`.

Para iniciar o backend, suba o PostgreSQL pelo Docker Compose e execute o Maven Wrapper na pasta do backend.

## Funcionalidades clínicas pendentes

Pacientes, agenda, sessões e histórico dependem de rotas correspondentes no backend. As páginas atuais são placeholders e não fazem chamadas para endpoints inexistentes.
