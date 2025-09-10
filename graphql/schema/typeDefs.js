
const { gql } = require('graphql-tag');
// No need to import gql from apollo-server-express anymore

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    name: String!
    birthDate: String!
  }

  type Ticket {
    full: Float!
    half: Float!
  }

  type Sale {
    id: ID!
    userId: ID!
    ticketType: String!
    quantity: Int!
    totalValue: Float!
    saleDate: String!
  }

  type Token {
    token: String!
  }

  type Query {
    sales: [Sale]
    tickets: Ticket
  }

  type Mutation {
    login(username: String!, password: String!): Token
    sellTicket(ticketType: String!, quantity: Int!): Sale
  }
`;

module.exports = typeDefs;
