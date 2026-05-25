# Criação do CRUD de Empresas

## Objetivo
Implementar o CRUD completo para a entidade `Company` (Empresa), garantindo as regras de negócio e permissões de acesso descritas em `AGENTS.md`. 

## Alterações
- Criação dos tipos e schemas (Zod) em `src/types/company.types.ts` e `src/types/company.schemas.ts`.
- Criação do serviço `src/services/CompanyService.ts` contemplando as regras de criação apenas por `SUPER_ADMIN` e atualização permitida também para `COMPANY_ADMIN` da mesma empresa.
- Criação do controller `src/controllers/CompanyController.ts`.
- Criação das rotas em `src/routes/company.routes.ts` e injeção no `index.ts`.
- Criação dos testes unitários do serviço em `src/services/__tests__/CompanyService.test.ts`.

## Endpoints afetados
- POST `/api/v1/companies`
- GET `/api/v1/companies`
- GET `/api/v1/companies/:id`
- PUT `/api/v1/companies/:id`
- DELETE `/api/v1/companies/:id`

## Regras de negócio
- Apenas usuários com role `SUPER_ADMIN` podem criar, listar todas e deletar empresas.
- `COMPANY_ADMIN` pode visualizar e atualizar apenas a empresa à qual pertence (validado através do `companyId`).
- Validações Zod aplicadas para garantir o formato correto de `razaoSocial`, `nomeFantasia` e `cnpj`.
- Validação de unicidade do `cnpj` durante a criação e atualização.

## Observações
- A migração `20260524225440_create_companies_table.ts` já existia no projeto. Os campos nela contidos (incluindo auditoria e UUID) foram respeitados.
