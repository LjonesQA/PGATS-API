//Bibliotecas
const request = require('supertest')//Importante sabe rque ele faz requisições assicronas
const sinon = require ('sinon')
const { expect } = require('chai') //Aqui fica a bilioteca responsavel para fazer validações ( asserts)

//Apçicação
const app = require('../../app')

//Mock
const transferService = require('../../service/transferService')

describe('Transfer controller',()=>{
    describe('POST /tansfers',()=>{
        it('Quando uso dados validos o retorno é 201',async ()=>{
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "user1",
                    to: "user2",
                    value: 100
                });
            // ...pode adicionar asserts aqui se desejar
        });
        // testes sem mock
        it.only('Retorna erro ao tentar transferir de usuário inexistente', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "naoexiste",
                    to: "outroinexistente",
                    value: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error');
            expect(resposta.body.error).to.match(/Remetente ou destinatário inválido/i);
        });

        // testes com mock
            //Mocar apenas a função transferValue do Service 
        const transferServiceMock = sinon.stub(transferService,'transferValue')
        transferServiceMock.throws(new Error('Remetente ou destinatário inválido'))

        it.only('Retorna erro ao tentar transferir de usuário inexistente MOCADO', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "naoexiste",
                    to: "outroinexistente",
                    value: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error');
            expect(resposta.body.error).to.match(/Remetente ou destinatário inválido/i);
            
            //resetar o Mock
            sinon.restore();    
        });
    });
    describe('GET /transfers',()=>{

    })
})