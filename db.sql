CREATE DATABASE yelpclone;

CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 AND price_range <= 5)
);

INSERT INTO restaurants (name, location, price_range)
VALUES ('Dennys', 'Pomona', 2),
('Burger King', 'Chino Hills', 1),
('Yard House', 'Costa Mesa', 2),
('Pick Up Stix', 'Chino Hills', 1),
('Waba Grill', 'West Covina', 1),
('Pho Ha', 'Diamond Bar', 2),
('Cheesecake Factory', 'Brea', 2);