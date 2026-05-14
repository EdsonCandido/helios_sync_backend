# Criação do endpoint de login

## Objetivo
Implementar o endpoint de autenticação `POST /api/v1/auth/login` seguindo a arquitetura em camadas e padrões de segurança.

## Alterações
- Instalação do `bcryptjs` para hash de senhas.
- Criação da migration para adicionar `companyId` à tabela `users`.
- Implementação do `AuthService` com lógica de validação de credenciais.
- Implementação do `AuthController` com validação de payload via Zod.
- Configuração de rotas versionadas em `/api/v1`.
- Atualização do helper `ApiResponse` para seguir rigorosamente o padrão do `AGENTS.md`.

## Endpoints afetados
- `POST /api/v1/auth/login`

## Regras de negócio
- Validação de e-mail e senha.
- Apenas usuários ativos (`active = true`) podem logar.
- Geração de token JWT contendo `userId` e `companyId`.
- Response padronizada conforme documentação do projeto.

## Observações
- Utilizado `bcryptjs` para comparação segura de senhas.
- Versionamento de API implementado no roteador principal.
