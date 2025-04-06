CREATE TABLE IF NOT EXISTS cart(
    customer_id INT,
    cart_id SERIAL NOT NULL PRIMARY KEY,
    products INT[],
    created_at TIMESTAMP DEFAULT NOW()
)

CREATE TABLE if NOT EXISTS products(
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
)