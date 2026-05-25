# Adição de Perfis de Acesso

## Objetivo
Criar hierarquia de perfis (`SUPER_ADMIN`, `COMPANY_ADMIN`, `USER`) e limitar regras de criação conforme o perfil de quem faz a requisição.

## Alterações
- Criação de migration para adicionar coluna `role` na tabela `users` (padrão `USER`).
- Atualização da interface `User` e schemas do Zod (`user.schemas.ts`) para suportar a nova propriedade.
- Atualização do JWT (`TokenPayload`) e `AuthService` para trafegar a role no token.
- Modificação no `UserService.create` para validar regras de negócio:
  - `USER`: Bloqueado para criar qualquer usuário.
  - `COMPANY_ADMIN`: Cria apenas perfis `USER` ou `COMPANY_ADMIN` para a mesma `companyId`. Não pode criar `SUPER_ADMIN`.
  - `SUPER_ADMIN`: Pode criar qualquer perfil para qualquer empresa.

## Endpoints afetados
- `POST /api/v1/users` (Restrições aplicadas baseadas no payload do JWT logado).
- `POST /api/v1/auth/login` (Retorna a role embutida no Token).

## Observações
- Validações feitas na camada de serviço, centralizando as regras de negócio em vez de depender apenas do controller.
