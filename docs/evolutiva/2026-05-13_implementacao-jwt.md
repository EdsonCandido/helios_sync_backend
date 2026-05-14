# Implementação de Autenticação JWT

## Objetivo
Implementar a lógica de geração, validação e o middleware de autenticação utilizando a biblioteca `jose`, conforme definido no `AGENTS.md`.

## Alterações
- Criação do helper `jwt.ts` para sign/verify.
- Criação do middleware `auth.middleware.ts` para proteção de rotas.
- Definição da estrutura do payload do token contendo `userId` e `companyId`.

## Endpoints afetados
- N/A (Middleware e Helpers base)

## Regras de negócio
- JWT obrigatório para requisições autenticadas.
- Sem uso de sessões (Stateless).
- Header esperado: `Authorization: Bearer <token>`.
- Retorno 401 Unauthorized para tokens inválidos ou ausentes.

## Observações
- Utilizada a biblioteca `jose` para maior segurança e compatibilidade com runtimes modernos.
- `JWT_SECRET` carregado via variáveis de ambiente com validação Zod.
