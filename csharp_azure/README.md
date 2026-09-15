# Rh — API de Gestão de Funcionários

API REST em ASP.NET Core (.NET 10) para cadastro de funcionários, com registro de auditoria (log de inclusão, atualização e remoção) em Azure Table Storage.

Baseado no desafio [Trilha .NET + Azure da DIO](https://github.com/digitalinnovationone/trilha-net-azure-desafio), reescrito do zero em .NET 10 mantendo a estrutura e o propósito original do exercício.

## Stack

- **.NET 10** / ASP.NET Core Web API
- **Entity Framework Core 10** — persistência dos dados de funcionário
- **SQL Server** — banco relacional principal
- **Azure.Data.Tables** — log de auditoria em Table Storage
- **Scalar** — documentação e interface de testes interativa da API (sucessor do Swagger UI nos templates atuais do ASP.NET Core)

## Por que Azurite em vez de um Storage Account real do Azure?

Este projeto usa o **[Azurite](https://github.com/Azure/Azurite)**, o emulador oficial de Azure Storage da Microsoft, rodando localmente via Docker, em vez de um recurso real na nuvem.

Azurite implementa a mesma API do Azure Table/Blob/Queue Storage, então o código da aplicação (`TableServiceClient`, `UpsertEntity`, etc.) é **idêntico** ao que seria usado contra um Storage Account real — a única diferença é a connection string, que aponta para `localhost` em vez de um endpoint `*.core.windows.net`.

Isso permite desenvolver e testar o fluxo completo (persistência SQL + log em Table Storage) de forma 100% local, sem depender de um recurso de nuvem provisionado. Migrar para o Azure real, se necessário no futuro, exigiria apenas trocar a connection string no `appsettings.json` — nenhuma mudança de código.

## Pré-requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Docker](https://www.docker.com/) + Docker Compose

## Como rodar o projeto

### 1. Subir a infraestrutura (SQL Server + Azurite)

```bash
docker compose up -d
```

Aguarde ~15 segundos após o comando para o SQL Server terminar de inicializar. Para conferir:

```bash
docker compose ps
```

Ambos os serviços (`rh-sqlserver` e `rh-azurite`) devem aparecer como `Up`.

### 2. Aplicar as migrations no banco

Instale a ferramenta `dotnet-ef` (caso ainda não tenha):

```bash
dotnet tool install --global dotnet-ef
```

Crie o banco e a tabela `Funcionarios`:

```bash
dotnet ef database update
```

### 3. Rodar a aplicação

```bash
dotnet run
```

O console vai indicar a porta (ex: `http://localhost:5079`).

### 4. Testar os endpoints

Abra no navegador:

```
http://localhost:<porta>/scalar/v1
```

Interface interativa com os 4 endpoints disponíveis:

| Método | Rota                  | Descrição                    |
|--------|------------------------|-------------------------------|
| GET    | `/Funcionario/{id}`    | Busca um funcionário por ID   |
| POST   | `/Funcionario`         | Cria um novo funcionário      |
| PUT    | `/Funcionario/{id}`    | Atualiza um funcionário       |
| DELETE | `/Funcionario/{id}`    | Remove um funcionário         |

Cada operação de escrita (POST/PUT/DELETE) grava, além do dado principal no SQL Server, um registro de log correspondente na tabela `funcionarioslog` do Azurite.

Exemplo de corpo para `POST`/`PUT`:

```json
{
  "nome": "João Silva",
  "endereco": "Rua Teste, 123",
  "ramal": "1234",
  "emailProfissional": "joao.silva@empresa.com",
  "departamento": "TI",
  "salario": 5000.00,
  "dataAdmissao": "2026-09-14T00:00:00Z"
}
```

## Parando o ambiente

```bash
# Para os containers, mantém os dados (volumes) e as imagens
docker compose stop

# Para e remove os containers (dados nos volumes são preservados)
docker compose down

# Remove containers + imagens Docker baixadas
docker compose down --rmi all

# Remove tudo, incluindo os dados persistidos (reset completo)
docker compose down --rmi all -v
```

## Estrutura do projeto

```
├── Controllers/
│   └── FuncionarioController.cs   # Endpoints CRUD + gravação do log de auditoria
├── Context/
│   └── RhContext.cs               # DbContext (EF Core)
├── Models/
│   ├── Funcionario.cs             # Entidade principal (SQL Server)
│   ├── FuncionarioLog.cs          # Entidade de log (Azure Table Storage)
│   └── TipoAcao.cs                # Enum: Inclusao, Atualizacao, Remocao
├── Migrations/                    # Migrations do EF Core
├── docker-compose.yml             # SQL Server + Azurite
└── appsettings.json               # Connection strings
```
