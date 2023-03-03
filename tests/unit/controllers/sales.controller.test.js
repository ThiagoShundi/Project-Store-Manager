const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  sale,
  salesListMock,
} = require('./mocks/product.controller.mock');

describe('Teste de unidade do salesController', function () {
  describe('Listando as vendas', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAll')
        .resolves({ type: null, message: salesListMock });

      // act
      await salesController.listSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesListMock);
    });
  });

  describe('Buscando uma venda', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findById')
        .resolves({ type: null, message: sale });

      // Act
      await salesController.getSales(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sale);
    });
  });

});
