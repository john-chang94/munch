CREATE DATABASE munch;

CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price_range VARCHAR(1) NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL check(rating >= 1 AND rating <= 5),
    details VARCHAR(1000) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE review_images (
    review_images_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    review_id INT NOT NULL,
    url VARCHAR(500) NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (review_id) REFERENCES reviews(review_id)
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
