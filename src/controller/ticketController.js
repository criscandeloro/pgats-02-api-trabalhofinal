
const express = require('express');
const router = express.Router();
const ticketService = require('../service/ticketService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key';

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // se não há token, não autorizado

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // se o token não é válido, proibido
        req.user = user;
        next();
    });
};

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: API para venda de ingressos
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Vende um novo ingresso
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticketType
 *               - quantity
 *             properties:
 *               ticketType:
 *                 type: string
 *                 enum: [full, half]
 *                 example: full
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Venda realizada com sucesso
 *       400:
 *         description: Erro de validação (ex. menor de 18, tipo de ingresso inválido)
 *       401:
 *         description: Token de autenticação não fornecido
 *       403:
 *         description: Token de autenticação inválido
 */
router.post('/sales', authenticateToken, (req, res) => {
    try {
        const { ticketType, quantity } = req.body;
        const sale = ticketService.sellTicket(req.user.id, ticketType, quantity);
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Lista todas as vendas de ingressos
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Token de autenticação não fornecido
 *       403:
 *         description: Token de autenticação inválido
 */
router.get('/sales', authenticateToken, (req, res) => {
    const sales = ticketService.getSales();
    res.status(200).json(sales);
});

module.exports = router;
