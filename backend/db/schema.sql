CREATE RABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    image_url VARCHAR(255)
);

CREATE TABLE orders {
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    total DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
};


