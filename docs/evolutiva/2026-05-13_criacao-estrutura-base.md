# Criação da Estrutura Base do Backend

## Objetivo
Estabelecer a arquitetura de pastas e arquivos fundamentais seguindo o padrão definido no AGENTS.md.

## Alterações
- Criação das pastas: `controllers`, `services`, `configs`, `helpers`, `routes`, `middleware`, `types`, `database`.
- Criação de `src/database/knexfile.ts` e `src/database/connection.ts` para persistência.
- Criação de `src/app.ts` (configuração express) e `src/server.ts` (ponto de entrada).
- Estruturação de `migrations` e `seeds` dentro de `src/database`.

## Regras de Negócio
- Camada de `controllers` deve ser fina e sem lógica.
- Camada de `services` deve concentrar toda a regra de negócio.
- Acesso ao banco de dados restrito aos `services`.
- Tipagem rigorosa com TypeScript.

## Observações
- O projeto está pronto para o desenvolvimento das primeiras funcionalidades.
- Knex configurado para PostgreSQL.
