# Criação da tabela de usuários

## Objetivo
Criar a migration inicial para a tabela `users` seguindo os padrões de auditoria e segurança definidos no `AGENTS.md`.

## Alterações
- Criação da migration `create_users_table`.
- Definição da estrutura da tabela `users` com suporte a soft delete e auditoria.

## Endpoints afetados
- N/A (Apenas banco de dados)

## Regras de negócio
- O `id` deve ser um UUID.
- Deve conter campos de auditoria: `createdAt`, `updatedAt`, `createdBy`, `updatedBy`.
- Deve conter campo `active` para soft delete.
- Campos de negócio: `name`, `email`, `password`.
- `email` deve ser único.

## Observações
- Utilizado Knex.js para gestão de migrations.
- Soft delete implementado via coluna `active`.
