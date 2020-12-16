CREATE DATABASE yelpclone;

CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 AND price_range <= 4)
);

INSERT INTO restaurants (name, city, category, price_range)
VALUES ('Dennys', 'Pomona', 'Diners', 2),
('Burger King', 'Chino Hills', 'Fast Food', 1),
('Yard House', 'Costa Mesa', 'American', 2),
('Pick Up Stix', 'Chino Hills', 'Chinese', 1),
('Waba Grill', 'West Covina', 'Fast Food', 1),
('Pho Ha', 'Diamond Bar', 'Vietnamese', 2),
('Cheesecake Factory', 'Brea', 'American', 2),
('Summit House', 'Fullerton', 'Steakhouses', 3),
('Subway', 'El Monte', 'Sandwiches', 1),
('Thaitwist', 'Chino Hills', 'Thai', 2),
('Noodology', 'Chino Hills', 'Chinese', 2),
('Coco Palm Restaurant', 'Pomona', 'Cuban', 3),
('Rolling Spicy Kimchi', 'Diamond Bar', 'Korean', 2),
('Eureka!', 'Claremont', 'American', 2),
('Black Bear Diner', 'Chino', 'Diners', 2),
('Taiko', 'Irvine', 'Japanese', 2),
('Hacienda La Joya', 'Mexican', 'Mission Viejo', 1),
('Taqeuria De Anda', 'Mexican', 'Pomona', 1);