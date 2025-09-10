
const jwt = require('jsonwebtoken');
const { users } = require('../model/database');

const JWT_SECRET = 'your-secret-key'; // Em um app real, use variáveis de ambiente

class AuthService {
    login(username, password) {
        if (!username || !password) {
            throw new Error('Usuário e senha são obrigatórios');
        }

        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }
}

module.exports = new AuthService();
