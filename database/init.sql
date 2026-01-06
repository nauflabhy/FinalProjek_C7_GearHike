DROP TABLE IF EXISTS gears;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE gears (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    weight INT NOT NULL,
    status ENUM('Ready', 'Borrowed') DEFAULT 'Ready',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY (category_id) 
        REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO categories (name) VALUES ('Shelter'), ('Cooking'), ('Apparel'), ('Tools');
INSERT INTO gears (category_id, name, weight, status) VALUES 
(1, 'Tenda Kapasitas 2', 2500, 'Ready'),
(2, 'Kompor Windproof', 350, 'Ready'),
(3, 'Jaket Gore-Tex', 600, 'Borrowed'),
(2, 'Nesting Set', 500, 'Ready');
