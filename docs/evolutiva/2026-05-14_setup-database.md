# Setup do Banco de Dados

## Objetivo
Configurar Knex.js e conexão com PostgreSQL para persistência de dados.

## Alterações
- Configuração do `knexfile.ts` utilizando variáveis de ambiente centralizadas.
- Criação da conexão singleton em `src/database/connection.ts`.
- Adição de scripts de migração e seeds no `package.json`.
- Preparação das pastas `src/database/migrations` e `src/database/seeds`.

## Regras de negócio
- Uso obrigatório de UUID para IDs (definido no `AGENTS.md`).
- Implementação de auditoria automática (createdAt, updatedAt, createdBy, updatedBy, active) em futuras migrations.
- Soft delete via coluna `active`.

## Observações
- A configuração utiliza `zod` para validar a `DATABASE_URL` no startup.
- Scripts npm facilitam o uso do CLI do Knex com TypeScript via `tsx`.
