//Bibliotecas
const request = require('supertest')//Importante sabe rque ele faz requisições assicronas
const sinon = require ('sinon')
const { expect } = require('chai') //Aqui fica a bilioteca responsavel para fazer validações ( asserts)

//Apçicação
const app = require('../../app')

// testes sem mock

describe('Transfer controller',()=>{
    describe('POST /tansfers',()=>{
        it('Quando uso dados validos o retorno é 201',async ()=>{
            const resposta = await request(app).post('/transfer')
        })
    }),
    describe('GET /transfers',()=>{

    })
})