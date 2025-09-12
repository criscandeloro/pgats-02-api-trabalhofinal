
const { gql } = require('graphql-tag');
// No need to import gql from apollo-server-express anymore

const typeDefs = gql`
  type Sale {
    id: ID!
    quantity: Int!
    totalValue: Float!
    userId: ID!
  }

  type AuthData {
    token: String!
  }

  type Query {
    sales: [Sale]
  }

  type Mutation {
    sellTicket(quantity: Int!, age: Int!, totalValue: Float!): Sale
    login(username: String!, password: String!): AuthData
  }
`;

module.exports = typeDefs;
