const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');

const { invalidValue, validProduct, allProducts } = require('./mocks/product.service.mock');

describe('Verificando service de produtos', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productModel, 'findAll').resolves(allProducts);
      
      // act
      const result = await productService.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('busca de um produto', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // act
      const result = await productService.findById('a');
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não existe', async function () {
      // arrange
      sinon.stub(productModel, 'findById').resolves(undefined);
     
      // act
      const result = await productService.findById(1);
      
      // assert
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna a pessoa passageira caso ID existente', async function () {
      // arrange
      sinon.stub(productModel, 'findById').resolves(allProducts[0]);
      
      // act
      const result = await productService.findById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });

describe('cadastro de um produto com valores inválidos', function () {
    it('retorna um erro ao não passar um nome', async function () {
      // act
      const result = await productService.createProduct(2);

      // assert
      expect(result.type).to.equal('INVALID_STR');
      expect(result.message).to.equal('"name" is required');
    });

    it('retorna um erro ao passar um nome inválido', async function () {
      // act
      const result = await productService.createProduct(invalidValue);

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
  });

   afterEach(function () {
     sinon.restore();
   });
});