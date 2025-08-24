//Bibliotecas
const request = require('supertest')//Importante saber que ele faz requisições assicronas
const sinon = require ('sinon')
const { expect } = require('chai') //Aqui fica a bilioteca responsavel para fazer validações ( asserts)

//Apçicação
const app = require('../../app')

//Mock
const transferService = require('../../service/transferService')

describe('Transfer controller',()=>{
    describe('POST /transfer',()=>{
        afterEach(() => {
            sinon.restore();
        });

        it('Quando uso dados validos o retorno é 201- MOCADO',async ()=>{
            const transferServiceMock = sinon.stub(transferService,'transferValue');
            transferServiceMock.returns({ 
                from:"Lucas", 
                to:"test",
                value:2000,
                date: new Date() });

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Lucas",
                    to: "test",
                    value: 2000
                });

            // expect(resposta.status).to.equal(201);
            // expect(resposta.body).to.have.property('from', 'Lucas');
            // expect(resposta.body).to.have.property('to', 'test');
            // expect(resposta.body).to.have.property('value', 2000);    

            //Validação com uma fixture
            const expectedResponse = require('../fixture/quandoInformoValoresValidos.json')//Importa o arquivo json;
           delete expectedResponse.date; // Remover a propriedade date para comparação
           delete resposta.body.date; // Remover a propriedade date para comparação
            expect(resposta.body).to.deep.equal(expectedResponse);
        });

        it.only('Retorna erro ao tentar transferir sem Token-Controller', async () => {
            // Não faz mock, usa implementação real
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "naoexiste",
                    to: "outroinexistente",
                    value: 100
                });
            expect(resposta.status).to.equal(401);
            expect(resposta.body).to.have.property('error');
            expect(resposta.body.error).to.have.property('message');
            expect(resposta.body.error.message).to.match(/Token não fornecido/i);
        });

        it('Retorna erro ao tentar transferir de usuário inexistente - MOCADO', async () => {
            const transferServiceMock = sinon.stub(transferService,'transferValue');
            transferServiceMock.throws(new Error('Remetente ou destinatário inválido'));

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "naoexiste",
                    to: "outroinexistente",
                    value: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error');
            expect(resposta.body.error).to.have.property('message');
            expect(resposta.body.error.message).to.match(/Remetente ou destinatário inválido/i);
        });
    });
    describe('GET /transfers',()=>{

    })
})