const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result; 
};

const findById = async (productId) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return products;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?);',
    [product],
    );
  
  return insertId;
};

const editById = async (productId, productName) => {
  const [{ insertId }] = await connection.execute(
     'UPDATE products SET name = ? WHERE id = ?',
    [productName, productId],
    );
  
  return insertId;
};

const deleteById = async (productId) => {
  const [{ insertId }] = await connection.execute(
     'DELETE FROM products WHERE id = ?',
    [productId],
    );
  
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
  editById,
  deleteById,
};