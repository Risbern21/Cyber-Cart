CREATE TABLE IF NOT EXISTS cart(
    customer_id VARCHAR,
    cart_id SERIAL NOT NULL PRIMARY KEY,
    products VARCHAR[],
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

CREATE TABLE IF NOT EXISTS wishlist(
    customer_id VARCHAR,
    wishlist_id SERIAL NOT NULL PRIMARY KEY,
    product_ids VARCHAR[],
    created_at TIMESTAMP DEFAULT NOW()
)