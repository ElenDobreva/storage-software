DROP DATABASE IF EXISTS storage_db;
CREATE DATABASE storage_db;
USE storage_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(13) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Customer', 'Admin', 'Order Processor', 'Inventory Manager') NOT NULL,
    address TEXT, -- Only for customers
    contract_date DATE, -- Only for customers
    contract_no VARCHAR(13) UNIQUE, -- Only for customers
    photo VARCHAR(255) -- Only for customers
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 0), 
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),  
    description TEXT,  
    image_path VARCHAR(255)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    status ENUM('Pending', 'Processing', 'Shipped') NOT NULL DEFAULT 'Pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0), 
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
