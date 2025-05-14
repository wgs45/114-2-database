-- CREATE TABLE products (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100),
--     description TEXT,
--     price DECIMAL(10, 2),
--     image_url VARCHAR(255)
-- );
--
-- CREATE TABLE orders (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     customer_name VARCHAR(100),
--     total DECIMAL(10, 2),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100),
--     email VARCHAR(100) UNIQUE,
--     password VARCHAR(255)
-- );
--

-- Create restaurants table
-- CREATE TABLE restaurants (
--   id INT PRIMARY KEY,
--   name TEXT NOT NULL,
--   location TEXT
-- );

-- Create menu items table
-- CREATE TABLE menu_items (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   restaurant_id INT NOT NULL,
--   name TEXT NOT NULL,
--   price DECIMAL(10, 2),
--   description TEXT,
--   FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
-- );

