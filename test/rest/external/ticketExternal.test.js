// Bibliotecas
const request = require('supertest');
const { expect, use } = require('chai');

require('dotenv').config();

const chaiExclude = require('chai-exclude');
use(chaiExclude)


// Testes
describe('Sell Tickets', () => {
    describe('POST /sales', () => {
        before(async () => {
            const postLogin = require('../fixture/requisicoes/login/postlogin.json');

            const respostaLogin = await request(process.env.BASE_URL_REST)
                .post('/login')
                .send(postLogin);

            token = respostaLogin.body.token;
        });

    it('Quando informo valores válidos eu tenho sucesso com 201', async () => {
            const postTransfer = require('../fixture/requisicoes/vendaIngressos/postSellTicket.json');
            
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/sales')
                .set('Authorization', `Bearer ${token}`)
                .send(postTransfer);

            expect(resposta.status).to.equal(201);
            
           const respostaEsperada = require('../fixture/respostas/validarQueEPossivelVenderIngressosParaMaiorDeDezoitoAnosEValorMaiorque100.json')
            expect(resposta.body)
                .excluding(['id', 'userId'])
                .to.deep.equal(respostaEsperada);
        });

        const testesDeErrosDeNegocio = require('../fixture/requisicoes/vendaIngressos/postSellTicketWithError.json');
        testesDeErrosDeNegocio.forEach(teste => {
            it(`Testando a regra relacionada a ${teste.nomeDoTeste}`, async () => {
                const postSellTicket = require('../fixture/requisicoes/vendaIngressos/postSellTicket.json');

                const resposta = await request(process.env.BASE_URL_REST)
                    .post('/sales')
                    .set('Authorization', `Bearer ${token}`)
                    .send(teste.postSellTicket);
                
                expect(resposta.status).to.equal(teste.statusCode);
                expect(resposta.body).to.have.property('message', teste.mensagemEsperada)
            });
        });
    });
  });
