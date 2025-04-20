import pool from "@/lib/db/pgsql/connectdb";

const createProductsTable = async () => {
  const queryText = `CREATE TABLE if NOT EXISTS products(
    product_id VARCHAR(255) NOT NULL PRIMARY KEY,
    "productName" VARCHAR(255) NOT NULL,
    "productImage" VARCHAR NOT NULL,
    discount INT ,
    "productPrice" INT NOT NULL,
    description VARCHAR(255) ,
    category VARCHAR(100),
    sizes VARCHAR[],
    colors VARCHAR[],
    "sellerName" VARCHAR(200) NOT NULL,
)`;

  try {
    pool.query(queryText);
    console.log("Products table created successfully");
  } catch (error) {
    console.log("error occurred couldnt create products table : ", error);
  }
};

export default createProductsTable;
