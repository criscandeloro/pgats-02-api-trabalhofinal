
const express = require('express');
const router = express.Router();
const ticketService = require('../service/ticketService');
const authMiddleware = require('../middleware/authMiddleware');

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *               - age
 *               - totalValue
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               age:
 *                 type: integer
 *                 example: 25
 *               totalValue:
 *                 type: number
 *                 example: 150.00
 *     responses:
 *       201:
 *         description: Venda realizada com sucesso
 *       400:
 *         description: Erro de validação (ex. menor de 18, valor total menor que 100)
 */
router.post('/sales', authMiddleware, (req, res) => {
    try {
        const { quantity, age, totalValue } = req.body;
        const sale = ticketService.sellTicket(quantity, age, totalValue, req.user.id);
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
 *     responses:
 *       200:
 *         description: Lista de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/sales', (req, res) => {
    const sales = ticketService.getSales();
    res.status(200).json(sales);
});

module.exports = router;
