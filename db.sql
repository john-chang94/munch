CREATE DATABASE munch;

CREATE TABLE restaurants (
    restaurantId SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    priceRange VARCHAR(1) NOT NULL
);

CREATE TABLE categories (
    categoryId SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL
)

CREATE TABLE restaurantCategories (
    restaurantCategoriesId SERIAL PRIMARY KEY,
    restaurantId INT NOT NULL,
    categoryId INT NOT NULL,
    FOREIGN KEY (restaurantId) REFERENCES restaurants(restaurantId),
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
)

CREATE TABLE users (
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
    reviewId SERIAL PRIMARY KEY,
    restaurantId INT NOT NULL,
    userId INT NOT NULL,
    rating VARCHAR(1) NOT NULL,
    details VARCHAR(1000) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (restaurantId) REFERENCES restaurants(restaurantId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE reviewImages (
    reviewImagesId SERIAL PRIMARY KEY,
    restaurantId INT NOT NULL,
    userId INT NOT NULL,
    reviewId INT NOT NULL,
    url VARCHAR(500) NOT NULL,
    FOREIGN KEY (restaurantId) REFERENCES restaurants(restaurantId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (reviewId) REFERENCES reviews(reviewId)
);

CREATE TABLE images_thumb (
    imagesThumbId SERIAL PRIMARY KEY,
    reviewImagesId INT NOT NULL,
    thumbUrl VARCHAR(500) NOT NULL
);

CREATE TABLE userImages (
    userImagesId SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    url VARCHAR(500) NOT NULL
);

CREATE TABLE suggestions (
    suggestionsId SERIAL PRIMARY KEY,
    param VARCHAR(255) NOT NULL,
    query VARCHAR(50) NOT NULL
);

INSERT INTO restaurants (name, location, category, price_range)
VALUES ('Dennys', '3012 W Temple Ave, Pomona, CA 91766', 'Diners', '2'),
('Burger King', '3943 Grande Ave, Chino Hills, CA 91710', 'Fast Food', '1'),
('Yard House', '1875 Newport Blvd, Costa Mesa, CA 92627', 'American', '2'),
('Pick Up Stix', '3410 Grand Ave H, Chino Hills, CA 91709', 'Chinese', '1'),
('Waba Grill', ' 245 Barranca St Ste 4, West Covina, CA 91791', 'Fast Food', '1'),
('Pho Ha Plus', '21090 Golden Springs Dr, Diamond Bar, CA 91789', 'Vietnamese', '2'),
('Cheesecake Factory', '120 Brea Mall Way, Brea, CA 92821', 'American', '2'),
('Summit House', '2000 E Bastanchury Rd, Fullerton, CA 92835', 'Steakhouses', '3'),
('Subway', '3534 Peck Rd, El Monte, CA 91731', 'Sandwiches', '1'),
('Thaitwist', '13065 Peyton Dr A, Chino Hills, CA 91709', 'Thai', '2'),
('Noodology', '4200 Chino Hills Pkwy #143, Chino Hills, CA 91709', 'Chinese', '2'),
('Coco Palm Restaurant', '1600 Fairplex Dr, Pomona, CA 91768', 'Cuban', '3'),
('Rolling Spicy Kimchi', '13831 S Diamond Bar Blvd, Diamond Bar, CA 91765', 'Korean', '2'),
('Eureka!', '580 W 1st St, Claremont, CA 91711', 'American', '2'),
('Black Bear Diner', '12325 Mountain Ave, Chino, CA 91710', 'Diners', '2'),
('Taiko', '14775 Jeffrey Rd, Irvine, CA 92618', 'Japanese', '2'),
('Hacienda La Joya', '25542 Jeronimo Road #6, Mission Viejo, CA 92691', 'Mexican', '1'),
('Taqeuria De Anda', '1690 S Garey Ave, Pomona, CA 91766', 'Mexican', '1'),

('Taco Bell', '1301 Artesia Blvd, Gardena, CA 90247', 'Fast Food', '1'),
('Panda Express', '1544 S La Cienega Blvd, Los Angeles, CA 90035', 'Chinese', '1'),
('Starbucks', '164 N Robertson Blvd, West Hollywood, CA 90048', 'Coffee', '1'),
('Blue Plate Taco', '1515 Ocean Ave, Santa Monica, CA 90401', 'Mexican', '2'),
('Lazy Dog Restaurant & Bar', '3525 W Carson St, Torrance, CA 90503', 'American', '2'),
('Cuppa Cuppa', '455 E Ocean Blvd, Long Beach, CA 90802', 'Coffee', '2'),
('Q Smokehouse', '300 S Pine Ave, Long Beach, CA 90802', 'Barbecue', '2'),
('Il Pastaio', '400 N Canon Dr, Beverly Hills, CA 90210', 'Italian', '3'),
('Spago', '176 N Canon Dr, Beverly Hills, CA 90210', 'American', '4'),
('Honor Bar', '122 S Beverly Dr, Beverly Hills, CA 90212', 'American', '2'),
('The Ivy', '113 N Robertson Blvd, Los Angeles, CA 90048', 'American', '4'),
('Panera Bread', '300 N Brand Blvd, Glendale, CA 91203', 'Cafe', '2'),
('Bopomofo Cafe', '841 W Las Tunas Dr, San Gabriel, CA 91776', 'Cafe', '1'),
('7 Leaves', '151 N Garfield Ave, Alhambra, CA 91801', 'Tea house', '1'),
('Factory Tea Bar', '323 S Mission Dr, San Gabriel, CA 91776', 'Tea house', '1'),
('Banana Bay', '18230 Colima Rd, Rowland Heights, CA 91748', 'Thai', '2'),
('Mister Bossam', '18162 Colima Rd, Rowland Heights, CA 91748', 'Korean', '2'),
('Mos 2', '1008 W Lincoln Ave, Anaheim, CA 92805', 'Asian', '1'),
('Mr Dumpling', '9319 Foothill Blvd, Rancho Cucamongo, CA 91730', 'Chinese', '1'),
('Jack in the Box', '8521 Archibald Ave, Rancho Cucamonga, CA 91730' 'Fast Food', '1'),
('Jollibee', '11632 South St, Artesia, CA 90701', 'Fast Food', '1'),
('Providence', '5955 Melrose Ave, Los Angeles, CA 90038', 'American', '4');


INSERT INTO suggestions (param, query)
VALUES ('Dennys', 'name'),
('Burger King', 'name'),
('Yard House', 'name'),
('Pick Up Stix', 'name'),
('Waba Grill', 'name'),
('Pho Ha', 'name'),
('Cheesecake Factory', 'name'),
('Summit House', 'name'),
('Subway', 'name'),
('Thaitwist', 'name'),
('Noodology', 'name'),
('Coco Palm Restaurant', 'name'),
('Rolling Spicy Kimchi', 'name'),
('Eureka!', 'name'),
('Black Bear Diner', 'name'),
('Taiko', 'name'),
('Hacienda La Joya', 'name'),
('Taqueria De Anda', 'name'),
('Diners', 'category'),
('Fast Food', 'category'),
('American', 'category'),
('Chinese', 'category'),
('Vietnamese', 'category'),
('Steakhouses', 'category'),
('Sandwiches', 'category'),
('Thai', 'category'),
('Cuban', 'category'),
('Korean', 'category'),
('Japanese', 'category'),
('Mexican', 'category'),
('Taco Bell', 'name'),
('Panda Express', 'name'),
('Starbucks', 'name'),
('Blue Plate Taco', 'name'),
('Lazy Dog Restaurant & Bar', 'name'),
('Cuppa Cuppa', 'name'),
('Q Smokehouse', 'name'),
('Il Pastaio', 'name'),
('Spago', 'name'),
('Honor Bar', 'name'),
('The Ivy', 'name'),
('Panera Bread', 'name'),
('Bopomofo Cafe', 'name'),
('7 Leaves', 'name'),
('Factory Tea Bar', 'name'),
('Banana Bay', 'name'),
('Mister Bossam', 'name'),
('Mos 2', 'name'),
('Mr Dumpling', 'name'),
('Jack in the Box', 'name'),
('Jollibee', 'name'),
('Providence', 'name'),
('Coffee', 'category'),
('Tea house', 'category'),
('Italian', 'category'),
('Asian', 'category'),
('Barbecue', 'category'),
('Cafe', 'category');


INSERT INTO images_thumb (review_images_id, thumbUrl)
VALUES (2, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(3, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcake-cappuccino.jpg?alt=media&token=c5aa070b-63e3-4eb5-b158-94a3b1b71c12'),
(4, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcheese.jpg?alt=media&token=ef1a9c6e-a3c9-40be-9008-ef5eabfae586'),
(5, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457'),
(6, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fgrilled-pineapple-pork-burrito.jpg?alt=media&token=b056df3d-4e46-4c50-9b01-4aa2c63e0a80'),
(7, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fmacarons.jpg?alt=media&token=1c41506e-17fb-4565-90e6-06ef5d7b59d5'),
(8, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fnoodles.jpg?alt=media&token=35b089ed-19db-4613-9740-fe565cad1d51'),
(9, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpancakes.jpg?alt=media&token=a8a3e032-0f7c-4362-b8a7-e5a448001288'),
(10, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpasta.jpg?alt=media&token=2b3d2ee6-86e1-4ecc-a0d8-bae1fee438e6'),
(12, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpumpkin-soup.jpg?alt=media&token=4e42c7d5-efd7-4cfa-9202-426aee9cbd02'),
(13, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsalmon.jpg?alt=media&token=0583f665-c658-47b7-82ae-c48cbff9d138'),
(14, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsoup.jpg?alt=media&token=21f44e08-0631-4cad-bfae-77f9f01e6586'),
(15, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi-combo.jpg?alt=media&token=30d053da-3558-47f8-b47f-77a5df5a2c8f'),
(16, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi.jpg?alt=media&token=4da43aea-4f95-460b-8b09-d007860a05af'),
(17, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=91e81fb3-e84e-4550-b21f-4ab2dd152c99'),
(18, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(19, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcake-cappuccino.jpg?alt=media&token=c5aa070b-63e3-4eb5-b158-94a3b1b71c12'),
(20, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcheese.jpg?alt=media&token=ef1a9c6e-a3c9-40be-9008-ef5eabfae586'),
(21, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457'),
(22, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fgrilled-pineapple-pork-burrito.jpg?alt=media&token=b056df3d-4e46-4c50-9b01-4aa2c63e0a80'),
(24, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fnoodles.jpg?alt=media&token=35b089ed-19db-4613-9740-fe565cad1d51'),
(25, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpancakes.jpg?alt=media&token=a8a3e032-0f7c-4362-b8a7-e5a448001288'),
(26, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpasta.jpg?alt=media&token=2b3d2ee6-86e1-4ecc-a0d8-bae1fee438e6'),
(27, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpizza.jpg?alt=media&token=e497d49f-6d47-44c9-accc-25416357a0f6'),
(28, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpumpkin-soup.jpg?alt=media&token=4e42c7d5-efd7-4cfa-9202-426aee9cbd02'),
(29, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsalmon.jpg?alt=media&token=0583f665-c658-47b7-82ae-c48cbff9d138'),
(30, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsoup.jpg?alt=media&token=21f44e08-0631-4cad-bfae-77f9f01e6586'),
(31, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi-combo.jpg?alt=media&token=30d053da-3558-47f8-b47f-77a5df5a2c8f'),
(32, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi.jpg?alt=media&token=4da43aea-4f95-460b-8b09-d007860a05af'),
(33, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=91e81fb3-e84e-4550-b21f-4ab2dd152c99'),
(34, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(35, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcake-cappuccino.jpg?alt=media&token=c5aa070b-63e3-4eb5-b158-94a3b1b71c12'),
(36, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fmacarons.jpg?alt=media&token=1c41506e-17fb-4565-90e6-06ef5d7b59d5'),
(37, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fgrilled-pineapple-pork-burrito.jpg?alt=media&token=b056df3d-4e46-4c50-9b01-4aa2c63e0a80'),
(38, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpasta.jpg?alt=media&token=2b3d2ee6-86e1-4ecc-a0d8-bae1fee438e6'),
(39, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsoup.jpg?alt=media&token=21f44e08-0631-4cad-bfae-77f9f01e6586'),
(41, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpizza.jpg?alt=media&token=e497d49f-6d47-44c9-accc-25416357a0f6'),
(1, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcake-cappuccino.jpg?alt=media&token=c5aa070b-63e3-4eb5-b158-94a3b1b71c12'),
(11, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpizza.jpg?alt=media&token=e497d49f-6d47-44c9-accc-25416357a0f6'),
(42, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=91e81fb3-e84e-4550-b21f-4ab2dd152c99'),
(43, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=91e81fb3-e84e-4550-b21f-4ab2dd152c99'),
(44, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi-combo.jpg?alt=media&token=30d053da-3558-47f8-b47f-77a5df5a2c8f'),
(45, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsoup.jpg?alt=media&token=21f44e08-0631-4cad-bfae-77f9f01e6586'),
(46, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsalmon.jpg?alt=media&token=0583f665-c658-47b7-82ae-c48cbff9d138'),
(47, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpumpkin-soup.jpg?alt=media&token=4e42c7d5-efd7-4cfa-9202-426aee9cbd02'),
(48, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpizza.jpg?alt=media&token=e497d49f-6d47-44c9-accc-25416357a0f6'),
(49, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpasta.jpg?alt=media&token=2b3d2ee6-86e1-4ecc-a0d8-bae1fee438e6'),
(50, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpancakes.jpg?alt=media&token=a8a3e032-0f7c-4362-b8a7-e5a448001288'),
(52, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fmacarons.jpg?alt=media&token=1c41506e-17fb-4565-90e6-06ef5d7b59d5'),
(53, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fgrilled-pineapple-pork-burrito.jpg?alt=media&token=b056df3d-4e46-4c50-9b01-4aa2c63e0a80'),
(54, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457'),
(55, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcheese.jpg?alt=media&token=ef1a9c6e-a3c9-40be-9008-ef5eabfae586'),
(56, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcake-cappuccino.jpg?alt=media&token=c5aa070b-63e3-4eb5-b158-94a3b1b71c12'),
(57, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(58, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=91e81fb3-e84e-4550-b21f-4ab2dd152c99'),
(59, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(60, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi-combo.jpg?alt=media&token=30d053da-3558-47f8-b47f-77a5df5a2c8f'),
(61, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsoup.jpg?alt=media&token=21f44e08-0631-4cad-bfae-77f9f01e6586'),
(62, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsalmon.jpg?alt=media&token=0583f665-c658-47b7-82ae-c48cbff9d138'),
(63, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpumpkin-soup.jpg?alt=media&token=4e42c7d5-efd7-4cfa-9202-426aee9cbd02'),
(64, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpizza.jpg?alt=media&token=e497d49f-6d47-44c9-accc-25416357a0f6'),
(65, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpasta.jpg?alt=media&token=2b3d2ee6-86e1-4ecc-a0d8-bae1fee438e6'),
(66, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpancakes.jpg?alt=media&token=a8a3e032-0f7c-4362-b8a7-e5a448001288'),
(67, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fnoodles.jpg?alt=media&token=35b089ed-19db-4613-9740-fe565cad1d51'),
(68, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fmacarons.jpg?alt=media&token=1c41506e-17fb-4565-90e6-06ef5d7b59d5'),
(69, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fgrilled-pineapple-pork-burrito.jpg?alt=media&token=b056df3d-4e46-4c50-9b01-4aa2c63e0a80'),
(70, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457'),
(71, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcheese.jpg?alt=media&token=ef1a9c6e-a3c9-40be-9008-ef5eabfae586'),
(72, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcake-cappuccino.jpg?alt=media&token=c5aa070b-63e3-4eb5-b158-94a3b1b71c12'),
(73, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=91e81fb3-e84e-4550-b21f-4ab2dd152c99'),
(74, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=91e81fb3-e84e-4550-b21f-4ab2dd152c99'),
(75, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(76, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fmacarons.jpg?alt=media&token=1c41506e-17fb-4565-90e6-06ef5d7b59d5'),
(77, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fgrilled-pineapple-pork-burrito.jpg?alt=media&token=b056df3d-4e46-4c50-9b01-4aa2c63e0a80'),
(78, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpancakes.jpg?alt=media&token=a8a3e032-0f7c-4362-b8a7-e5a448001288'),
(79, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457'),
(80, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpumpkin-soup.jpg?alt=media&token=4e42c7d5-efd7-4cfa-9202-426aee9cbd02'),
(81, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fnoodles.jpg?alt=media&token=35b089ed-19db-4613-9740-fe565cad1d51'),
(82, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(83, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcake-cappuccino.jpg?alt=media&token=c5aa070b-63e3-4eb5-b158-94a3b1b71c12'),
(84, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcheese.jpg?alt=media&token=ef1a9c6e-a3c9-40be-9008-ef5eabfae586'),
(85, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457'),
(86, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fgrilled-pineapple-pork-burrito.jpg?alt=media&token=b056df3d-4e46-4c50-9b01-4aa2c63e0a80'),
(87, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fmacarons.jpg?alt=media&token=1c41506e-17fb-4565-90e6-06ef5d7b59d5'),
(88, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fnoodles.jpg?alt=media&token=35b089ed-19db-4613-9740-fe565cad1d51'),
(89, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpancakes.jpg?alt=media&token=a8a3e032-0f7c-4362-b8a7-e5a448001288'),
(90, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpasta.jpg?alt=media&token=2b3d2ee6-86e1-4ecc-a0d8-bae1fee438e6'),
(92, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpumpkin-soup.jpg?alt=media&token=4e42c7d5-efd7-4cfa-9202-426aee9cbd02'),
(93, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsalmon.jpg?alt=media&token=0583f665-c658-47b7-82ae-c48cbff9d138'),
(94, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsoup.jpg?alt=media&token=21f44e08-0631-4cad-bfae-77f9f01e6586'),
(95, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi-combo.jpg?alt=media&token=30d053da-3558-47f8-b47f-77a5df5a2c8f'),
(96, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi.jpg?alt=media&token=4da43aea-4f95-460b-8b09-d007860a05af'),
(97, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=91e81fb3-e84e-4550-b21f-4ab2dd152c99'),
(98, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(99, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcake-cappuccino.jpg?alt=media&token=c5aa070b-63e3-4eb5-b158-94a3b1b71c12'),
(100, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcheese.jpg?alt=media&token=ef1a9c6e-a3c9-40be-9008-ef5eabfae586'),
(101, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457'),
(102, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fgrilled-pineapple-pork-burrito.jpg?alt=media&token=b056df3d-4e46-4c50-9b01-4aa2c63e0a80'),
(104, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fnoodles.jpg?alt=media&token=35b089ed-19db-4613-9740-fe565cad1d51'),
(105, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpancakes.jpg?alt=media&token=a8a3e032-0f7c-4362-b8a7-e5a448001288'),
(106, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpasta.jpg?alt=media&token=2b3d2ee6-86e1-4ecc-a0d8-bae1fee438e6'),
(107, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpizza.jpg?alt=media&token=e497d49f-6d47-44c9-accc-25416357a0f6'),
(108, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpumpkin-soup.jpg?alt=media&token=4e42c7d5-efd7-4cfa-9202-426aee9cbd02'),
(109, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsalmon.jpg?alt=media&token=0583f665-c658-47b7-82ae-c48cbff9d138'),
(110, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsoup.jpg?alt=media&token=21f44e08-0631-4cad-bfae-77f9f01e6586'),
(111, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi-combo.jpg?alt=media&token=30d053da-3558-47f8-b47f-77a5df5a2c8f'),
(112, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsushi.jpg?alt=media&token=4da43aea-4f95-460b-8b09-d007860a05af'),
(113, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=91e81fb3-e84e-4550-b21f-4ab2dd152c99'),
(114, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(115, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcake-cappuccino.jpg?alt=media&token=c5aa070b-63e3-4eb5-b158-94a3b1b71c12'),
(116, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fmacarons.jpg?alt=media&token=1c41506e-17fb-4565-90e6-06ef5d7b59d5'),
(117, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fgrilled-pineapple-pork-burrito.jpg?alt=media&token=b056df3d-4e46-4c50-9b01-4aa2c63e0a80'),
(118, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpasta.jpg?alt=media&token=2b3d2ee6-86e1-4ecc-a0d8-bae1fee438e6'),
(119, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsoup.jpg?alt=media&token=21f44e08-0631-4cad-bfae-77f9f01e6586'),
(121, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpizza.jpg?alt=media&token=e497d49f-6d47-44c9-accc-25416357a0f6'),
(23, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fburger-fries.jpg?alt=media&token=66b137b1-14dc-41e0-8ca4-fff40eb5d478'),
(51, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fnoodles.jpg?alt=media&token=35b089ed-19db-4613-9740-fe565cad1d51'),
(91, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fpizza.jpg?alt=media&token=e497d49f-6d47-44c9-accc-25416357a0f6'),
(122, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fnoodles.jpg?alt=media&token=0863d4af-24be-401c-a07d-1cc993923dbc'),
(123, 'https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fsweet-and-sour-pork.jpg?alt=media&token=7e8dae70-1014-402e-aad4-8a5f02868d00')