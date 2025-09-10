
const { sales, tickets, users } = require('../model/database');

class TicketService {
    sellTicket(userId, ticketType, quantity) {
        const user = users.find(u => u.id === userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Regra: não vender para menores de 18 anos
        const birthDate = new Date(user.birthDate);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            throw new Error('A venda de ingressos não é permitida para menores de 18 anos.');
        }

        // Regra: validar tipo de ingresso e preço
        if (!tickets[ticketType]) {
            throw new Error('Tipo de ingresso inválido.');
        }

        const ticketPrice = tickets[ticketType];
        const totalValue = ticketPrice * quantity;

        const sale = {
            id: sales.length + 1,
            userId,
            ticketType,
            quantity,
            totalValue,
            saleDate: new Date()
        };

        sales.push(sale);
        return sale;
    }

    getSales() {
        return sales;
    }
}

module.exports = new TicketService();
