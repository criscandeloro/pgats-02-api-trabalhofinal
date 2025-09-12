const request = require('supertest');
const { expect, use } = require('chai');

require('dotenv').config();

describe('Testes de Venda de Ingressos', () => {

     before(async () => {
        const loginUser = require('../fixture/requisicoes/login/login.json');
        const resposta = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .send(loginUser);

        token = resposta.body.data.login.token;
        
    });

     beforeEach(() => {
        createSellTicket = require('../fixture/requisicoes/vendaIngressos/createSellTicket.json');
    })

 it('Validar venda de ingressos para maior de 18 anos', async () => {

    const respostaEsperada = require('../fixture/respostas/vendaIngressos/validarQueEPossivelVenderIngressosParaMaiorDeDezoitoAnos.json');
    const respostaVendaIngressos = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send(createSellTicket);


            expect(respostaVendaIngressos.status).to.equal(200);
            expect(respostaVendaIngressos.body.data.createSellTicket)
            .to.deep.equal(respostaEsperada.data.createSellTicket);

    });

     const testesDeErrosDeNegocio = require('../fixture/requisicoes/vendaIngressos/createsellTicketWithError.json');
     testesDeErrosDeNegocio.forEach(teste => {
        it(`Testando a regra relacionada a ${teste.nomeDoTeste}`, async () => {
            const respostaVendaIngressos = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .set('Authorization', `Bearer ${token}`)
                .send(teste.createSellTicket);

            expect(respostaVendaIngressos.status).to.equal(200);
            expect(respostaVendaIngressos.body.errors[0].message).to.equal(teste.mensagemEsperada);
        });
    }); 
})