# API de Venda de Ingressos - Exposição Sebastião Salgado

# Trabalho Final da Disciplina da PGATS - Automação de Testes na Camada de API
# Aluna: Cristine Candeloro de Miranda Santos

Este projeto contém duas implementações de uma API para venda de ingressos:

1.  **API RESTful** com Node.js, Express e documentação Swagger.
2.  **API GraphQL** com Apollo Server, reutilizando a mesma lógica de negócio.

O propósito é servir como base para estudos de automação de testes de API.

---

## Funcionalidades Comuns

- Autenticação de usuário via JWT (JSON Web Token).
- Lógica de negócio para venda de ingressos.
- Banco de dados em memória.

### Regras de Negócio

1.  **Login**: Usuário e senha são obrigatórios para obter um token de autenticação.
2.  **Idade Mínima**: Não é permitida a venda de ingressos para usuários menores de 18 anos.
3.  **Preços**: O valor total da venda dos ingressos não pode ser menor que 100.

## Estrutura do Projeto

```
/pgats-02-api-trabalhofinal
|-- src/                # Código-fonte da API REST
|   |-- controller/
|   |-- model/
|   |-- service/
|   |-- app.js
|   `-- server.js
|-- graphql/            # Código-fonte da API GraphQL
|   |-- resolvers/
|   |-- schema/
|   |-- app.js
|   `-- server.js
|-- node_modules/
|-- package.json
`-- README.md
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/)

## Instalação

1.  Clone o repositório e entre na pasta do projeto.
2.  Instale as dependências:
    ```bash
    npm install
    ```

---

## API REST (Express)

### Como Executar

Para iniciar o servidor REST, execute o comando:

```bash
npm start
```

O servidor será iniciado na porta `3000`.

### Documentação da API (Swagger)

Após iniciar o servidor, a documentação completa, gerada com Swagger, estará disponível em:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Lá, você pode visualizar e interagir com todos os endpoints.

### Como usar a API REST

1.  **Faça o login**: Use o endpoint `POST /login` com o usuário `admin` e senha `password123` para obter um token.
2.  **Autorize suas requisições**: No Swagger, clique em `Authorize` e insira o token no formato `Bearer <seu-token>`.
3.  **Execute as operações**: Acesse os endpoints protegidos, como `POST /sales`.

---

## API GraphQL (Apollo Server)

### Como Executar

Para iniciar o servidor GraphQL, execute o comando:

```bash
npm run start:graphql
```

O servidor será iniciado na porta `4000`.

### Playground GraphQL

Após iniciar o servidor, o Apollo Server Playground estará disponível em:

[http://localhost:4000/graphql](http://localhost:4000/graphql)

Este playground é a interface para interagir com a API GraphQL.

### Como usar a API GraphQL

1.  **Obtenha o Token (Mutation `login`)**

    Execute a seguinte mutation no playground para obter o token de autenticação:

    ```graphql
    mutation {
      login(username: "admin", password: "password123") {
        token
      }
    }
    ```

2.  **Configure o Header de Autenticação**

    No canto inferior esquerdo do playground, clique na aba **HTTP HEADERS** e adicione o seguinte JSON, substituindo `<seu-token>` pelo token obtido no passo anterior:

    ```json
    {
      "Authorization": "Bearer <seu-token>"
    }
    ```

3.  **Execute Queries e Mutations Protegidas**

    Agora você pode executar operações que exigem autenticação, como a venda de ingressos.

    **Exemplo de Mutation `sellTicket`:**
    ```graphql
    mutation {
      sellTicket(ticketType: "full", quantity: 2) {
        id
        ticketType
        quantity
        totalValue
      }
    }
    ```

    **Exemplo de Query `sales`:**
    ```graphql
    query {
      sales {
        id
        saleDate
        totalValue
      }
    }
    ```