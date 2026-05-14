# Implementação de Middleware de Validação

## Objetivo
Criar um middleware reutilizável para validação de `body`, `params` e `query` utilizando a biblioteca `zod`, conforme exigido no `AGENTS.md`.

## Alterações
- Criação do middleware `validate.middleware.ts`.
- Padronização da validação de requests para garantir integridade dos dados antes de chegarem aos controllers.

## Endpoints afetados
- N/A (Middleware base)

## Regras de negócio
- Toda request deve ser validada se contiver dados de entrada.
- Erros de validação são capturados pelo `error.middleware.ts`.

## Observações
- O middleware permite validar múltiplos componentes da request (body, params, query) simultaneamente.
- Utiliza `parseAsync` para suportar validações assíncronas no Zod.
