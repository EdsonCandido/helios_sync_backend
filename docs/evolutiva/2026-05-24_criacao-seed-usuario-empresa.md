# Criação de Seed para Usuário e Empresa Padrão

## Objetivo
Criar uma migration para a tabela `companies` e um seed no Knex para persistir uma empresa e um usuário padrão no banco de dados, a partir das variáveis de ambiente (`.env`), facilitando o ambiente de desenvolvimento e deploy inicial.

## Alterações
- Criação da migration `create_companies_table` no banco de dados.
- Atualização do arquivo `.env` para incluir:
  - `DEFAULT_COMPANY_NAME`
  - `DEFAULT_COMPANY_DOCUMENT`
  - `DEFAULT_USER_NAME`
  - `DEFAULT_USER_EMAIL`
  - `DEFAULT_USER_PASSWORD`
- Inclusão e validação dessas novas variáveis no arquivo `src/configs/env.ts` utilizando Zod.
- Criação do seed `01_default_company_and_user.ts` que insere os registros apenas caso eles não existam.

## Endpoints afetados (se houver)
- Nenhum endpoint diretamente afetado, porém a autenticação (`/api/v1/auth/login`) agora pode usar as credenciais padrão do `.env`.

## Regras de negócio
- Seed idempotente (não duplica os registros caso seja rodado mais de uma vez).
- A senha do usuário default é criptografada com `bcryptjs` antes da persistência.
- As informações utilizadas no seed devem vir de variáveis de ambiente obrigatoriamente.

## Observações
- A tabela `companies` não possuía migration até o momento e foi criada para que o registro da empresa pudesse ser feito e atrelado ao `companyId` do usuário padrão.
