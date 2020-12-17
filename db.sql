CREATE DATABASE yelpclone;

CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price_range VARCHAR(1) NOT NULL
);

INSERT INTO restaurants (name, city, category, price_range)
VALUES ('Dennys', 'Pomona', 'Diners', '2'),
('Burger King', 'Chino Hills', 'Fast Food', '1'),
('Yard House', 'Costa Mesa', 'American', '2'),
('Pick Up Stix', 'Chino Hills', 'Chinese', '1'),
('Waba Grill', 'West Covina', 'Fast Food', '1'),
('Pho Ha', 'Diamond Bar', 'Vietnamese', '2'),
('Cheesecake Factory', 'Brea', 'American', '2'),
('Summit House', 'Fullerton', 'Steakhouses', '3'),
('Subway', 'El Monte', 'Sandwiches', '1'),
('Thaitwist', 'Chino Hills', 'Thai', '2'),
('Noodology', 'Chino Hills', 'Chinese', '2'),
('Coco Palm Restaurant', 'Pomona', 'Cuban', '3'),
('Rolling Spicy Kimchi', 'Diamond Bar', 'Korean', '2'),
('Eureka!', 'Claremont', 'American', '2'),
('Black Bear Diner', 'Chino', 'Diners', '2'),
('Taiko', 'Irvine', 'Japanese', '2'),
('Hacienda La Joya', 'Mission Viejo', 'Mexican', '1'),
('Taqeuria De Anda', 'Pomona', 'Mexican', '1'),
('Taco Bell', 'Gardena', 'Fast Food', '1');