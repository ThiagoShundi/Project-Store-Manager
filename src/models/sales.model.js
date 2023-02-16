const connection = require('./connection');

// const findAll = async () => {
//   const [result] = await connection.execute(
//     'SELECT * FROM sales',
//   );
//   return result; 
// };

const findById = async (salesId) => {
  console.log(salesId);
  const [[sales]] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [salesId],
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
  // findAll,
  findById,
  insertSales,
  insertSalesProduct,
};