
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authController = require('./controller/authController');
const ticketController = require('./controller/ticketController');

const app = express();

// Middleware
app.use(bodyParser.json());

// Swagger Setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Venda de Ingressos - Exposição Sebastião Salgado',
            version: '1.0.0',
            description: 'API para autenticação e venda de ingressos, com documentação Swagger.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de Desenvolvimento'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/controller/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da API
app.use('/', authController);
app.use('/', ticketController);

app.get('/', (req, res) => {
    res.send('API de Ingressos no ar! Acesse /api-docs para ver a documentação.');
});

module.exports = app;
