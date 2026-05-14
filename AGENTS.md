# 🧠 AGENTS.md — Diretrizes do Projeto Backend

## 📌 Visão Geral

Este projeto consiste em um backend **RESTful**, com autenticação baseada em JWT e persistência em banco relacional.

### Stack principal

* Backend: express + typescript  + knexjs
* Banco de Dados: PostgreSQL
* Autenticação: JWT (jose library)
* Identificadores: UUID
* Auditoria: Automática (createdAt, updatedAt, createdBy, updatedBy, active)

---

## 🏗️ Arquitetura

Arquitetura em camadas:

```
backend/
 ├── controllers/
 ├── services/
 ├── configs/
 ├── helpers/
 ├── routes/
 ├── middleware/
 ├── types/
 └── database/

```

Responsabilidades:

* **controllers**: Finos, sem regra de negócio. Apenas endpoints e mapeamento de requests/responses.
* **services**: Concentram regras de negócio e orquestração de acesso aos dados
* **configs**: Segurança, CORS, envs e configurações gerais.
* **database**: Configuração e migrações do knexjs
* **helpers**: Funções auxiliares
* **middleware**: Middlewares do express
* **routes**: Rotas do express  
* **types**: Tipos do typescript 

---

## 🔐 Autenticação e Segurança

### Estratégia

* JWT obrigatório em todas requisições autenticadas
* Sem uso de sessão

### Header padrão

```
Authorization: Bearer <token>
```

### Regras

* Token deve conter `userId` e `companyId`  no `sub` (ou claim específica).
* Backend deve validar assinatura e expiração.
* Retornar 401 Unauthorized para acessos inválidos.
* Operações que alterem múltiplas entidades DEVEM utilizar transaction do knex
* Nunca permitir persistência parcial de operações críticas

---

## 🌎 Variáveis de Ambiente

* Toda variável de ambiente DEVE ser validada na inicialização da aplicação
* Nunca acessar process.env diretamente fora da camada de config
* Utilizar arquivo centralizado de configuração

---

## ❗ Tratamento de Erros

* Toda exceção deve ser tratada globalmente
* Nunca retornar stacktrace para o cliente
* Utilizar classes customizadas de erro
* Controllers não devem possuir try/catch desnecessário

## 🧬 Banco de Dados e Migrations

Todas as entidades DEVEM:

* Usar UUID como ID
* Possuir auditoria completa
* Toda alteração estrutural DEVE possuir migration
* Nunca alterar migrations já executadas em produção
* Seeds devem ser idempotentes
* Toda tabela deve possuir:
  * id UUID
  * active
  * createdAt
  * updatedAt
  * createdBy
  * updatedBy
### Regras

* ❌ Não usar delete físico
* ✅ Usar soft delete (`active = false`)
* ✅ Queries devem filtrar apenas `active = true`

---

## 📋 Logging

* Utilizar logs estruturados
* Nunca utilizar console.log em produção
* Preferencialmente utilizar pino
* Logs devem conter:
  * timestamp
  * requestId
  * userId (quando autenticado)
  * nível do log

---



## ✅ Validação

* Toda request DEVE ser validada
* Validar:
  * params
  * query
  * body
* Utilizar zod para schemas e inferência de tipos
* Controllers nunca devem confiar em dados recebidos

---
## 📦 Convenções de Código

* **Acesso a Dados**: Nunca chamar repositórios diretamente de controllers, configs ou outras classes. Toda manipulação de entidade DEVE passar obrigatoriamente por um Service.
* **Nomenclatura**:
    * Controller: `NomeDaEntidadeController`
    * Service: `NomeDaEntidadeService`

* Utilizar biome para lint e formatação
* Não permitir any sem justificativa
---

## 📡 Padrão de Response

Todas as respostas da API DEVEM seguir padrão consistente.

### Sucesso

```json
{
  "success": true,
  "data": {},
  "message": "Operação realizada com sucesso"
}


---

## 📝 Documentação obrigatória (/docs)

* ✅ **Toda interação (feature, bugfix, refactor)** DEVE gerar documentação
* 📁 A documentação deve ser salva na pasta `/docs`
* 📁 Caso a pasta não exista, ela DEVE ser criada

### Estrutura obrigatória

```
docs/
 ├── evolutiva/       # Evolução do projeto (features, bugfixes)
 ├── prs_commits/     # Documentos de Pull Requests e Padrões de Commit
 ├── setup/
 └── nome-da-tarefa/
```

### Nome dos arquivos

Padrão: `YYYY-MM-DD_nome-da-tarefa.md`
Exemplo: `2026-04-18_criacao-endpoint-clientes.md`

### Conteúdo mínimo obrigatório

```md
# Nome da tarefa

## Objetivo
Descrever o que foi feito

## Alterações
- Lista de mudanças realizadas

## Endpoints afetados (se houver)
- GET /clientes

## Regras de negócio
- Descrever regras implementadas

## Observações
- Pontos importantes / decisões técnicas
```

### Regras de versionamento
* ✅ **Commits**: Todos os commits DEVEM seguir estritamente as regras em `padrao-commits.md`.

---

## 🧪 Testes

* Documentar e cobrir casos de uso complexos com testes (se solicitado).

---

## 🚫 Anti-patterns (proibido)

* ❌ Usar ID incremental (usar UUID).
* ❌ Expor entidade diretamente na API.
* ❌ Deletar registros fisicamente.
* ❌ Lógica de negócio no controller.
* ❌ Chamar repositório diretamente (toda manipulação de entidade DEVE passar pelo Service).
* ❌ Não documentar alterações em `/docs`.

---

## ⚙️ Boas práticas obrigatórias

* Logging estruturado
* Tratamento global de exceções
* Versionamento de API (ex: `/api/v1`)
* Separação clara de camadas
* Código limpo e legível

