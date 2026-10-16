# 🚗 CarShop

API REST para gerenciamento de uma loja de veículos, desenvolvida com **C# e ASP.NET Core**.

O CarShop é um projeto de estudo e portfólio que está evoluindo de um CRUD para uma aplicação mais completa, com **autenticação, autorização, separação de responsabilidades e regras de negócio**.

## 🚀 Funcionalidades

### Veículos
- Cadastro de veículos
- Listagem de veículos
- Busca por ID
- Atualização de veículos
- Exclusão de veículos
- Associação de veículos a categorias

### Autenticação e autorização
- Cadastro de usuários
- Login de usuários
- Autenticação com JWT
- Controle de acesso por roles
- Roles `Cliente` e `Gerente`
- Operações administrativas protegidas para `Gerente`

### API
- DTOs para entrada de dados
- Validação de dados
- Separação entre Controllers e Services
- Persistência com Entity Framework Core
- Documentação e testes dos endpoints com Swagger

## 🛠️ Tecnologias

- C#
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- ASP.NET Core Identity
- JWT
- SQL Server
- Swagger / OpenAPI
- Git e GitHub

## 🏗️ Arquitetura

O backend está sendo organizado com separação de responsabilidades:

```text
Cliente
   ↓
Controller
   ↓
Service
   ↓
Entity Framework Core / DbContext
   ↓
SQL Server
```

### Controllers
Recebem as requisições HTTP, chamam os serviços necessários e retornam as respostas da API.

### Services
Concentram a lógica da aplicação e realizam as operações necessárias antes da persistência dos dados.

### DTOs
Definem os dados necessários para entrada e saída da API, evitando utilizar diretamente as entidades em operações onde isso não é necessário.

### Models
Representam as entidades do domínio da aplicação.

### Data
Contém o `DbContext` e as configurações relacionadas ao Entity Framework Core e ao banco de dados.

## 🔐 Autenticação e autorização

A autenticação da API utiliza **JWT (JSON Web Token)**.

Após o login, o usuário recebe um token que permite à API identificar o usuário autenticado e sua role.

Atualmente existem duas roles:

```text
Cliente
Gerente
```

Operações administrativas de veículos são protegidas para usuários com a role `Gerente`.

Exemplo:

```csharp
[Authorize(Roles = "Gerente")]
```

## 📡 Principais endpoints

### Carros

```http
GET    /api/Carros
GET    /api/Carros/{id}
POST   /api/Carros
PUT    /api/Carros/{id}
DELETE /api/Carros/{id}
```

Os endpoints podem ser visualizados e testados pelo Swagger durante a execução da aplicação.

## ▶️ Como executar

### Pré-requisitos

- .NET 8 SDK
- SQL Server
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/SanzioWesley/CarShop.git
```

### 2. Entre na pasta do projeto

```bash
cd CarShop
```

### 3. Configure o banco de dados

Configure a connection string do SQL Server no arquivo de configuração da aplicação.

### 4. Aplique as migrations

```bash
dotnet ef database update
```

### 5. Execute a aplicação

```bash
dotnet run
```

A URL da aplicação e do Swagger será exibida no terminal.

## 🗺️ Próximos passos

- Integração da autenticação com o frontend React
- Carrinho de compras
- Pedidos
- Regras de negócio da loja
- Testes automatizados
- Deploy da aplicação

## 🎯 Objetivo

O objetivo do CarShop é aplicar, em um projeto prático, conceitos utilizados no desenvolvimento de aplicações **C# / .NET**, passando por API REST, banco de dados, autenticação, autorização e organização da aplicação.

O projeto continuará evoluindo com novas funcionalidades e melhorias de arquitetura.
