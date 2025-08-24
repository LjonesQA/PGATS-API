//ver a aula 4 (23/08)
const request = require('supertest');//Importante saber que ele faz requisições assíncronas
const { expect } = require('chai'); //Aqui fica a biblioteca responsável para fazer validações ( asserts)   

//Aplicação
describe('Transfer controller- External',()=>{
    describe('POST /transfer',()=>{
        it('Retorna erro ao tentar transferir sem token ', async () => {

            const resposta = await request('http://localhost:3000') //Aqui colocamos a url da aplicação que está rodando externamente
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

    })
})