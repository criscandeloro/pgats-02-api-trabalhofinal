
// Banco de dados em memória
const users = [
    { id: 1, username: 'admin', password: 'password123', name: 'Administrador', birthDate: '1990-01-01' }
];

const sales = [];

const tickets = {
    full: 50.00,
    half: 25.00
};

module.exports = {
    users,
    sales,
    tickets
};
