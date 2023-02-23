const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

const { allsales, salesbyId } = require('./mocks/product.service.mock');

describe('Verificando service de vendas', function () {
  describe('listagem de vendas', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(salesModel, 'findAll').resolves(allsales);
      
      // act
      const result = await salesService.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allsales);
    });
  });

  describe('busca de uma venda', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await salesService.findById('a');
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso a venda não existe', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves(undefined);
     
      // act
      const result = await salesService.findById(99);
      
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
    
    it('retorna a pessoa passageira caso ID existente', async function () {
      // arrange
      sinon.stub(salesModel, 'findById').resolves(salesbyId);
      
      // act
      const result = await salesService.findById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(salesbyId);
    });
  });

   afterEach(function () {
     sinon.restore();
   });
});