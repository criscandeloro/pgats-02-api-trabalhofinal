
const authService = require('../../src/service/authService');
const ticketService = require('../../src/service/ticketService');
const { tickets } = require('../../src/model/database');

const resolvers = {
  Query: {
    sales: (parent, args, context) => {
      // Opcional: Adicionar verificação de autenticação para esta query também
      if (!context.user) throw new Error('Autenticação necessária.');
      return ticketService.getSales();
    },
    tickets: () => tickets,
  },
  Mutation: {
    login: (parent, { username, password }) => {
      return authService.login(username, password);
    },
    sellTicket: (parent, { ticketType, quantity }, context) => {
      // A mutation de venda de ingresso requer autenticação
      if (!context.user) {
        throw new Error('Você deve estar logado para vender um ingresso.');
      }
      return ticketService.sellTicket(context.user.id, ticketType, quantity);
    },
  },
};

module.exports = resolvers;
