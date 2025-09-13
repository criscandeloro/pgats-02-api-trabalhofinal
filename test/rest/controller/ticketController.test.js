// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../../../src/app');

// Mock
const ticketService = require('../../../src/service/ticketService');

// Testes
describe('Ticket Controller', () => {
    describe('POST /sales', () => {

        beforeEach(async () => {
            const respostaLogin = await request(app)
                .post('/login')
                .send({
                    username: 'admin',
                    password: 'password123'
                });

            token = respostaLogin.body.token;
        });

        afterEach(() => {
            sinon.restore();
        });



   it('Quando informo uma idade menor que 18 anos recebo 400', async () => {
            const resposta = await request(app)
                .post('/sales')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "quantity": 1,
                    "age": 12,
                    "totalValue": 150
                });
            
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'A venda de ingressos não é permitida para menores de 18 anos.')
        });

    it('Usando Mocks: Quando informo uma idade menor que 18 anos recebo 400', async () => {
            
            const ticketServiceMock = sinon.stub(ticketService, 'sellTicket');
            ticketServiceMock.throws(new Error('A venda de ingressos não é permitida para menores de 18 anos.'));

            const resposta = await request(app)
                .post('/sales')
                .set('Authorization', `Bearer ${token}`)
                .send({
                     "quantity": 1,
                    "age": 12,
                    "totalValue": 150
                });
            
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'A venda de ingressos não é permitida para menores de 18 anos.');
        });
        
    it('Quando informo um valor menor que 100 recebo 400', async () => {
            const resposta = await request(app)
                .post('/sales')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    "quantity": 6,
                    "age": 45,
                    "totalValue": 50
                });
            
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'O valor total da venda não pode ser menor que 100.')
        });

    it('Usando Mocks: Quando informo um valor menor que 100 recebo 400', async () => {
            
            const ticketServiceMock = sinon.stub(ticketService, 'sellTicket');
            ticketServiceMock.throws(new Error('O valor total da venda não pode ser menor que 100.'));

            const resposta = await request(app)
                .post('/sales')
                .set('Authorization', `Bearer ${token}`)
                .send({
                     "quantity": 1,
                    "age": 12,
                    "totalValue": 150
                });
            
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'O valor total da venda não pode ser menor que 100.');
        });    

    });
});    