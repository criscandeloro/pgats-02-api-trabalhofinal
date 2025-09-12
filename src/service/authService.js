
const jwt = require('jsonwebtoken');
const { users } = require('../model/database');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'your_jwt_secret'; // Replace with a strong secret in a real application

class AuthService {
    async login(username, password) {
        const user = users.find(u => u.username === username);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // In a real application, you would use bcrypt.compare to compare the hashed password
        // For this example, we'll do a simple password comparison
        if (user.password !== password) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }
}

module.exports = new AuthService();
