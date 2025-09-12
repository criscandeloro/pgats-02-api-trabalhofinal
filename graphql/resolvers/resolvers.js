
const ticketService = require('../../src/service/ticketService');
const authService = require('../../src/service/authService');

const resolvers = {
  Query: {
    sales: () => {
      return ticketService.getSales();
    },
  },
  Mutation: {
    sellTicket: (parent, { quantity, age, totalValue }, context) => {
      if (!context.user) {
        throw new Error('You must be logged in to sell tickets.');
      }
      return ticketService.sellTicket(quantity, age, totalValue, context.user.id);
    },
    login: async (parent, { username, password }) => {
      const token = await authService.login(username, password);
      return token;
    },
  },
};

module.exports = resolvers;
