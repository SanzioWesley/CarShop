# 🚗 CarShop API - E-commerce de Veículos

[![.NET](https://img.shields.io/badge/.NET-8.0-blueviolet)](https://dotnet.microsoft.com/download/dotnet/8.0)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-2022-red)](https://www.microsoft.com/pt-br/sql-server/)

Este projeto é uma API robusta desenvolvida em **ASP.NET Core** para gerenciar um e-commerce de carros de luxo e veículos em geral. A arquitetura foi pensada para ser escalável, utilizando práticas modernas de mercado.

## 🛠️ Tecnologias Utilizadas

- **Backend:** C# / ASP.NET Core 8.0
- **Banco de Dados:** Microsoft SQL Server
- **ORM:** Entity Framework Core (Code First)
- **Documentação:** Swagger (OpenAPI)
- **Versionamento:** Git / GitHub

## 🏗️ Arquitetura e Organização

O projeto segue uma estrutura organizada em camadas para facilitar a manutenção e o teste:
- `Models/`: Entidades principais do domínio.
- `Data/`: Contexto do banco de dados e configurações do EF Core.
- `Controllers/`: Endpoints da API para comunicação com o Frontend (React).
- `Migrations/`: Histórico de versionamento do banco de dados.

## 🚀 Como Rodar o Projeto

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/SanzioWesley/CarShop
   
