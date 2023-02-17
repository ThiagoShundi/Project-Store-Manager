const connection = require('./connection');

const findAllSales = async () => {
  const [result] = await connection.execute(
    ('SELECT * FROM StoreManager.sales'),
  
  );  
  return result; 
};

const findAll = async () => {
  const [result] = await connection.execute(
    (`SELECT saleIds.sale_id AS saleId, saleIds.product_id AS productId, 
   saleIds.quantity AS quantity, sales.date FROM StoreManager.sales_products AS saleIds
   INNER JOIN StoreManager.sales AS sales ON saleIds.sale_id = sales.id;`),
  
  );  
  return result; 
};

const findById = async (salesId) => {
  const [sales] = await connection.execute(
    `SELECT sales.date, saleIds.product_id AS productId, 
    saleIds.quantity AS quantity FROM StoreManager.sales_products AS saleIds
    INNER JOIN StoreManager.sales AS sales ON saleIds.sale_id = sales.id
    WHERE saleIds.sale_id = ?;`, [salesId],
  );
  return sales;
};

const insertSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW());',
    );

  return insertId;
};

const insertSalesProduct = async ({ id, sales }) => {
  sales.forEach(async (sale) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?,?,?)',
      [id, sale.productId, sale.quantity],
    );
  });

  return { id, itemsSold: sales };
};

module.exports = {
  findAllSales,
  findAll,
  findById,
  insertSales,
  insertSalesProduct,
};