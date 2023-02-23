const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales, salesId } = require('./mocks/product.models.mock');

describe('Testes de unidade do model de vendas', function () {
  it('Recuperando a lista de products', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([sales]);
    // Act
    const result = await salesModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(sales);
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([salesId]);
    // Act
    const result = await salesModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(salesId);
  });

  // it('Cadastrando uma venda', async function () {
  //   // Arrange
  //   sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
  //   // Act
  //   const result = await salesModel.insert(newProduct);
  //   // Assert
  //   expect(result).to.equal(42);
  // });

  afterEach(function () {
    sinon.restore();
  });
});