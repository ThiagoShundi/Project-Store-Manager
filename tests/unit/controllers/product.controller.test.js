const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');

const connection = require('../../../src/models/connection');

const {
  productDB,
} = require('./mocks/product.controller.mock');

describe('Teste de integração de products', function () {
  it('Buscar todos os produtos com sucesso', async function () {
    sinon
      .stub(connection, 'execute')
      .onFirstCall()
      .resolves([productDB])
   
    const response = await chai
      .request(app)
      .get('/products');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productDB);
  });

  afterEach(sinon.restore);

  it('Buscar um produto pelo id com sucesso', async function () {
    sinon
      .stub(connection, 'execute')
      .onFirstCall()
      .resolves([productDB])
   
    const response = await chai
      .request(app)
      .get('/products/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(productDB[0]);
  }); 
});
