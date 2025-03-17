DROP DATABASE IF EXISTS storage_db;
CREATE DATABASE storage_db;
USE storage_db;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
	phone VARCHAR(13) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    contract_date DATE NOT NULL,
    contract_no VARCHAR(13) NOT NULL UNIQUE,
    photo VARCHAR(255)
);

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	phone VARCHAR(13) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE order_processor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	phone VARCHAR(13) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE inventory_manager (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
	phone VARCHAR(13) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
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
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0), 
	status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE customer_order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0), 
	status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE VIEW orders_display AS
SELECT 
    o.id AS order_id,
    c.name AS customer_name,
    p.name AS product_name,
    o.quantity,
    o.status,
    o.order_date
FROM 
    orders o
JOIN 
    customers c ON o.customer_id = c.id
JOIN 
    products p ON o.product_id = p.id;
    
CREATE VIEW customer_order_display AS
SELECT 
    co.id AS order_id,
    p.name AS product_name,
    co.quantity,
    co.status,
    co.order_date
FROM 
    customer_order co
JOIN 
    products p ON co.product_id = p.id;

INSERT INTO customers (name, address, phone, email, password, contract_date, contract_no, photo) VALUES 
("Rilchev Mafia", 'Han Asparuh str., Vidin, Bulgaria', '1234567890123', 'rilchev_s_mafia@gfun.com', 'hashedpassword1', '2025-03-01', 'CNT-000001', 'images/RILCHEV.jpg');

INSERT INTO admin (name, phone, email, password) VALUES 
('Elena Dobreva',  '1112223334444', 'elena_dobreva@admin.com', 'adminpass1');

INSERT INTO order_processor (name, phone, email, password) VALUES 
('Vasil Popov', '9990001112222', 'vasil_popov@processor.com', 'orderpass1');

INSERT INTO inventory_manager (name, phone, email, password) VALUES 
('Denis Ivanov',  '5556667778888', 'denis_ivanov@manager.com', 'inventorypass1');

INSERT INTO products (name, quantity, price, description, image_path) VALUES 
('Glock 19', 15, 550.00, 'Compact 9mm pistol, perfect for self-defense and law enforcement.', 'images/glock19.jpg'),
('AR-15 Rifle', 10, 1200.00, 'Semi-automatic rifle chambered in 5.56 NATO, widely used for sporting and defense.', 'images/ar15.jpg'),
('Remington 870', 8, 450.00, '12-gauge pump-action shotgun, great for hunting and home defense.', 'images/remington870.jpg'),
('AK-47', 12, 900.00, 'Classic 7.62x39mm assault rifle known for its durability and reliability.', 'images/ak47.jpg'),
('Sig Sauer P320', 20, 650.00, 'Modular 9mm pistol with high accuracy and customization options.', 'images/p320.jpg');

SELECT * FROM customers;
SELECT * FROM products;
SELECT * FROM admin;
SELECT * FROM order_processor;
SELECT * FROM inventory_manager;
SELECT * FROM orders_display;
SELECT * FROM customer_order_display;



	

