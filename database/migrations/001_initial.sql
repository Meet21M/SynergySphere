-- Initial migration for SynergySphere database

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO items (name, description, price) VALUES
('Sample Item 1', 'Description for sample item 1', 19.99),
('Sample Item 2', 'Description for sample item 2', 29.99);
