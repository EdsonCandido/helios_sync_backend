# Setup Inicial do Express e Endpoint de Saúde

## Objetivo
Configurar o servidor Express básico com TypeScript e implementar o endpoint de health check seguindo a arquitetura definida no projeto.

## Alterações
- Atualização do script `dev` no `package.json` para utilizar `tsx watch src/server.ts`.
- Configuração do middleware `express.json()` no `app.ts`.
- Implementação do `HealthService` para lógica de verificação de status.
- Implementação do `HealthController` para gerenciar a requisição do endpoint `/health`.
- Configuração das rotas versionadas em `/api/v1`.
- Integração do middleware de logging (Pino).

## Endpoints afetados
- GET `/api/v1/health`

## Regras de negócio
- O endpoint de saúde deve retornar `success: true` para indicar que o servidor está operante.
- Seguindo a arquitetura em camadas, a lógica (mesmo que mínima) passa pelo Service.

## Observações
- Utilizado `tsx` para execução em desenvolvimento conforme solicitado.
- Adicionado `pino-pretty` como dependência de desenvolvimento para melhor legibilidade dos logs localmente.
