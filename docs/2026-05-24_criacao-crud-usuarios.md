# Criação CRUD de Usuários

## Objetivo
Implementar o CRUD completo de usuários seguindo as diretrizes do `AGENTS.md`.

## Alterações
- Criação de schemas de validação Zod para payload de entrada e parâmetro (`src/types/user.schemas.ts`).
- Criação de `UserService` com regras de negócio, persistência (Knex), `hash` de senha e soft delete (`src/services/UserService.ts`).
- Criação de `UserController` fino para mapeamento de rotas e retorno padronizado de sucesso (`src/controllers/UserController.ts`).
- Criação do mapeamento de rotas com validações e middleware de autenticação obrigatório (`src/routes/user.routes.ts`).
- Registro da rota `/users` no entrypoint de rotas (`src/routes/index.ts`).

## Endpoints afetados
- `POST /api/v1/users` - Criação de usuário.
- `GET /api/v1/users` - Listagem de usuários (apenas ativos, mesma companyId).
- `GET /api/v1/users/:id` - Busca de usuário por ID (apenas ativos, mesma companyId).
- `PUT /api/v1/users/:id` - Atualização de usuário por ID.
- `DELETE /api/v1/users/:id` - Soft delete de usuário por ID.

## Regras de negócio
- Não permitir duplicação de e-mail na criação nem na atualização.
- Usuários pertencem a uma `companyId`. Se omitida, pega do `req.user`.
- Consultas, atualizações e exclusões filtram obrigatoriamente por `active: true` e `companyId` do requester.
- Exclusão é lógica (soft delete).
- Senhas são criptografadas (hash bcrypt) e omitidas no retorno de objetos de usuário.
- Padrão do objeto de resposta unificado usando `ApiResponse`.
- Auditoria com `createdBy`, `updatedBy` sendo povoados com ID do usuário logado via JWT.

## Observações
- Middlewares globais assumem tratamento de erros capturados via `AppError` e validação Zod sem expor stacktraces não autorizadas.
