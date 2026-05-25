# 🧠 AGENTS.md — Diretrizes Backend

## 📌 Visão Geral

Backend **RESTful**. Autenticação JWT. DB relacional.

### Stack principal

* Backend: express + typescript + knexjs
* DB: PostgreSQL
* Auth: JWT (jose)
* ID: UUID
* Auditoria: Auto (createdAt, updatedAt, createdBy, updatedBy, active)

---

## 🏗️ Arquitetura

Camadas:

```text
backend/
 ├── controllers/
 ├── services/
 ├── configs/
 ├── helpers/
 ├── routes/
 ├── middleware/
 ├── types/
 └── database/
```

Responsabilidades:

* **controllers**: Finos. Sem regra de negócio. Só endpoints e map req/res.
* **services**: Regras de negócio. Orquestração de dados.
* **configs**: Segurança, CORS, envs, config geral.
* **database**: Config e migrations knexjs.
* **helpers**: Funções auxiliares.
* **middleware**: Middlewares express.
* **routes**: Rotas express.
* **types**: Tipos typescript.

---

## 🔐 Autenticação e Segurança

### Estratégia

* JWT obrigatório em reqs autenticadas.
* Sem sessão.

### Header padrão

```http
Authorization: Bearer <token>
```

### Regras

* Token deve ter `userId` e `companyId` no `sub` (ou claim).
* Validar assinatura e expiração.
* Retornar 401 Unauthorized para token inválido.
* Múltiplas alterações = transaction knex.
* Zero persistência parcial de reqs críticas.

---

## 👥 Perfis de Acesso (Roles)

* **`SUPER_ADMIN`**: Acesso irrestrito. Único perfil com permissão para criar outros administradores globais.
* **`COMPANY_ADMIN`**: Gestor da empresa. Pode criar e gerenciar apenas usuários e outros gestores (`COMPANY_ADMIN` ou `USER`) atrelados à sua mesma `companyId`.
* **`USER`**: Usuário normal da aplicação. Sem permissão para cadastrar ou gerenciar contas.

---

## 🌎 Variáveis de Ambiente

* Validar toda env no start.
* Não usar `process.env` fora de `configs`.
* Centralizar configs.

---

## ❗ Tratamento de Erros

* Tratar exceções globalmente.
* Zero stacktrace no client.
* Usar classes erro custom.
* Controllers sem try/catch inútil.

## 🧬 Banco de Dados e Migrations

Todas entidades DEVEM:

* Usar UUID como ID.
* Auditoria completa.
* Alteração estrutural = migration.
* Não alterar migration em prod.
* Seeds idempotentes.
* Toda tabela ter:
  * id UUID
  * active
  * createdAt
  * updatedAt
  * createdBy
  * updatedBy

### Regras

* ❌ Zero delete físico.
* ✅ Soft delete (`active = false`).
* ✅ Queries filtrar `active = true`.

---

## 📋 Logging

* Logs estruturados.
* Zero `console.log` prod.
* Preferir `pino`.
* Logs DEVEM ter:
  * timestamp
  * requestId
  * userId (se autenticado)
  * nível log

---

## ✅ Validação

* Validar toda request.
* Validar:
  * params
  * query
  * body
* Usar zod para schemas e tipos.
* Controllers nunca confiam em dados client.

---

## 📦 Convenções de Código

* **Dados**: Controller/config não chama repo. Passar por Service.
* **Nomenclatura**:
    * Controller: `NomeDaEntidadeController`
    * Service: `NomeDaEntidadeService`
* Lint/formatação: biome.
* `any` só com justificativa.

---

## 📡 Padrão de Response

Padrão consistente.

### Sucesso

```json
{
  "success": true,
  "data": {},
  "message": "Operação realizada com sucesso"
}
```

---

## 📝 Documentação obrigatória (/docs)

* ✅ Interações (feature/bugfix/refactor) = documentar.
* 📁 Salvar em `/docs`.
* 📁 Criar pasta se não existir.

### Estrutura obrigatória

```text
docs/
 ├── evolutiva/       # Evolução do projeto (features, bugfixes)
 ├── prs_commits/     # Documentos de Pull Requests e Padrões de Commit
 ├── setup/
 └── nome-da-tarefa/
```

### Nome dos arquivos

Padrão: `YYYY-MM-DD_nome-da-tarefa.md`
Ex: `2026-04-18_criacao-endpoint-clientes.md`

### Conteúdo mínimo

```md
# Nome da tarefa

## Objetivo
Descrever o que foi feito

## Alterações
- Lista de mudanças

## Endpoints afetados
- GET /clientes

## Regras de negócio
- Regras implementadas

## Observações
- Pontos importantes / decisões
```

### Regras versionamento

* ✅ **Commits**: Seguir regras `padrao-commits.md`.

---

## 🧪 Testes

* Documentar/testar casos complexos.

---

## 🚫 Anti-patterns (proibido)

* ❌ ID incremental.
* ❌ Expor entidade na API.
* ❌ Delete físico.
* ❌ Regra de negócio no controller.
* ❌ Controller chama repositório direto.
* ❌ Sem docs em `/docs`.

---

## ⚙️ Boas práticas obrigatórias

* Logging estruturado
* Erros globais
* Versão API (`/api/v1`)
* Camadas separadas
* Código limpo
