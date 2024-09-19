# Products Parser - Open Food Facts API

Este projeto é uma API REST criada para ajudar a equipe de nutricionistas da **Fitness Foods LC** a revisar rapidamente as informações nutricionais dos alimentos que os usuários publicam em seu aplicativo móvel, utilizando dados do projeto Open Food Facts.

## Descrição do Projeto

A API é resposável por importar os dados nutricionais de produtos alimentícios da base de dados Open Food Facts e disponibilizá-los para consulta e atualização através de endpoints RESTful. Além disso, ela oferece funcionalidades de CRUD, incluindo um sistema de atualização automática diária via CRON e um controle interno para o status dos produtos.

## Tecnologias Utilizadas

- **Linguagem**: Node.js
- **Framework**: NestJS
- **Banco de Dados**: MongoDB Atlas
- **Arquitetura**: SOLID e DDD (Domain-Driven Design)
- **Testes Unitários**: Jest
- **Integração com Open Food Facts**
- **Sistema de CRON para sincronização diária de dados**

## Funcionalidades

- **GET /**: Retorna detalhes sobre a API, status da conexão com o banco de dados, horário da última execução do CRON, tempo de atividade e uso de memória.
- **PUT /products/:code**: Atualiza as informações de um produto específico.
- **DELETE /products/:code**: Altera o status do produto para "trash".
- **GET /products/:code**: Retorna as informações de um produto específico.
- **GET /products**: Lista todos os produtos com paginação para evitar sobrecarga.

## Requisitos de Instalação

### Pré-requisitos

- [Instalar a linguagem específica]
- MongoDB Atlas (ou outra instância de MongoDB)
- [Instalar o Docker se estiver utilizando]

### Passos para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/gmass0n/products-parser.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd products-parser
   ```

3. Instale as dependências:

   ```bash
   yarn install
   ```

4. Configure as variáveis de ambiente:

   ```bash
   HOST=
   PORT=
   DB_TYPE=
   MONGODB_URI=
   API_KEY=
   PRODUCTS_IMPORT_CRON_TIME=
   ```

5. Execute o projeto:

   ```bash
   yarn start:dev
   ```

6. (Opcional) Rode a aplicação com Docker:

   ```bash
   docker-compose up --build
   ```

## Testes

Para rodar os testes unitários:

```bash
yarn test
```

## Extras Implementados

- **Diferencial 1**: Configuração do Docker para facilitar o deploy.
- **Diferencial 2**: Logs de alerta em caso de falha durante o sync dos produtos.
- **Diferencial 3**: Testes unitários para todos os endpoints.
- **Diferencial 4**: Retorna as informações de um produto específico.
- **Diferencial 5**: Esquema de segurança utilizando API KEY.

## Desafios e Decisões

O principal desafio encontrado durante o desenvolvimento do projeto foi a implementação do processamento de arquivos utilizando streams. Isso demandou ajustes cuidadosos para assegurar que a importação dos dados fosse eficiente e que a performance não fosse afetada, especialmente ao trabalhar com grandes volumes de dados do Open Food Facts. Além disso, foi preciso desenvolver um sistema robusto para gerenciar o histórico de importações e garantir que os dados fossem salvos de forma consistente, respeitando o limite de 100 produtos por arquivo.

> This is a challenge by [Coodesh](https://coodesh.com/)
