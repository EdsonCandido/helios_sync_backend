# 🚀 Helios Sync Backend

API RESTful para o sistema **Helios Sync** — plataforma de gestão empresarial com autenticação JWT, controle de acesso por perfis (RBAC) e arquitetura em camadas.

---

## 📌 Stack

| Tecnologia | Uso |
|---|---|
| **Node.js** | Runtime |
| **Express 5** | Framework HTTP |
| **TypeScript** | Tipagem estática |
| **PostgreSQL** | Banco de dados relacional |
| **Knex.js** | Query builder e migrations |
| **Zod** | Validação de schemas |
| **JWT (jose)** | Autenticação stateless |
| **Pino** | Logging estruturado |
| **Biome** | Lint e formatação |
| **Vitest** | Testes unitários |
| **Docker** | Containerização |

---

## 🏗️ Arquitetura

```text
src/
 ├── configs/        # Variáveis de ambiente e configurações
 ├── controllers/    # Endpoints (thin controllers, sem regra de negócio)
 ├── services/       # Regras de negócio e orquestração de dados
 ├── database/       # Conexão, migrations e seeds (Knex)
 ├── helpers/        # Funções auxiliares (JWT, ApiResponse, logger)
 ├── middleware/     # Auth, validação, logging, tratamento de erros
 ├── routes/         # Definição de rotas Express
 └── types/          # Tipos TypeScript e schemas Zod
```

---

## 📡 Endpoints

Base URL: `/api/v1`

### Auth

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `POST` | `/auth/login` | Login (retorna JWT) | ❌ |

### Health

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `GET` | `/health` | Health check | ❌ |

### Users

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `POST` | `/users` | Criar usuário | ✅ |
| `GET` | `/users` | Listar usuários da empresa | ✅ |
| `GET` | `/users/:id` | Buscar usuário por ID | ✅ |
| `PUT` | `/users/:id` | Atualizar usuário | ✅ |
| `DELETE` | `/users/:id` | Soft delete usuário | ✅ |

### Companies

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| `POST` | `/companies` | Criar empresa | ✅ |
| `GET` | `/companies` | Listar empresas | ✅ |
| `GET` | `/companies/:id` | Buscar empresa por ID | ✅ |
| `PUT` | `/companies/:id` | Atualizar empresa | ✅ |
| `DELETE` | `/companies/:id` | Soft delete empresa | ✅ |

---

## 👥 Perfis de Acesso (RBAC)

| Role | Permissões |
|------|-----------|
| `SUPER_ADMIN` | Acesso irrestrito. Cria admins globais e empresas. |
| `COMPANY_ADMIN` | Gerencia usuários da própria empresa. |
| `USER` | Usuário padrão. Sem permissão de gestão. |

---

## 🔐 Autenticação

- JWT stateless via header `Authorization: Bearer <token>`
- Token contém: `userId`, `companyId`, `role`
- Validação de assinatura e expiração em middleware

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
PORT=3333

# JWT
JWT_SECRET=sua_chave_secreta_com_no_minimo_32_caracteres

# Database
DATABASE_URL=postgres://user:password@localhost:5432/helios_sync

# Seed defaults
DEFAULT_COMPANY_NAME=Empresa Padrão
DEFAULT_COMPANY_DOCUMENT=00000000000000
DEFAULT_USER_NAME=Admin
DEFAULT_USER_EMAIL=admin@helios.com
DEFAULT_USER_PASSWORD=senha_segura
```

---

## 🐳 Setup com Docker

```bash
# Subir apenas o banco
docker compose up db

# Subir tudo (app + banco)
docker compose up
```

---

## 🚀 Setup Local

### Pré-requisitos

- Node.js >= 20
- PostgreSQL 16+ (ou via Docker)

### Instalação

```bash
# Instalar dependências
npm install

# Rodar migrations
npm run migrate:latest

# Rodar seeds (empresa e usuário padrão)
npm run seed:run

# Modo desenvolvimento (hot reload)
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm run start
```

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `tsx watch src/server.ts` | Dev server com hot reload |
| `build` | `tsc && tsc-alias` | Compila TS e resolve path aliases |
| `start` | `node dist/server.js` | Inicia build de produção |
| `lint` | `biome lint .` | Linting |
| `format` | `biome format --write .` | Formatação |
| `migrate:latest` | `knex migrate:latest` | Roda migrations pendentes |
| `migrate:rollback` | `knex migrate:rollback` | Reverte última migration |
| `migrate:make` | `knex migrate:make` | Cria nova migration |
| `seed:run` | `knex seed:run` | Executa seeds |
| `test` | `vitest run` | Roda testes |

---

## 📦 Padrão de Resposta

```json
{
  "success": true,
  "data": {},
  "message": "Operação realizada com sucesso"
}
```

---

## 🧬 Convenções

- **IDs**: UUID
- **Delete**: Soft delete (`active = false`)
- **Auditoria**: `createdAt`, `updatedAt`, `createdBy`, `updatedBy` em todas as tabelas
- **Validação**: Zod em todas as requests (body, params, query)
- **Logging**: Pino estruturado (zero `console.log` em prod)
- **Erros**: Classes customizadas, sem stacktrace no client

---

## 📝 Documentação

Toda feature/bugfix/refactor é documentada em `/docs` seguindo o padrão:

```text
docs/
 ├── evolutiva/       # Evolução do projeto
 ├── prs_commits/     # Padrões de commit
 └── setup/           # Setup inicial
```

---

## 📄 Licença

Projeto privado — Helios Sync.
