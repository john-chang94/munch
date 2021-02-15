const client = require('../config/db');
const { addRestaurantValidator } = require('../middlewares/validator');

// Check if there are any valid query params in req.query
const queryCheck = async (reqQuery) => {
    let isQuery = false;
    let values = [];
    let num = 1;
    // Join restaurants and reviews to get the ratings
    let queryStr = [
        `SELECT r.restaurant_id, r.name, r.location, r.category, r.price,
        AVG(rev.rating) AS rating, COUNT(rev.rating) AS total_ratings
            FROM restaurants AS r
            JOIN reviews AS rev
            ON r.restaurant_id = rev.restaurant_id
        WHERE`
    ]
    const validQueries = ['location', 'category', 'price'];

    // Main search text input can be name or category
    if (reqQuery.hasOwnProperty('find')) {
        queryStr.push(`(lower(name) LIKE $${num++} OR lower(category) LIKE $${num++})`);
        queryStr.push('AND');
        // Search for values that have any characters following the user input with %
        values.push(`${reqQuery['find'].toLowerCase()}%`);
        values.push(`${reqQuery['find'].toLowerCase()}%`);
        isQuery = true;
    }

    // Additional queries will be appended here
    for (let i = 0; i < validQueries.length; i++) {
        if (reqQuery.hasOwnProperty(validQueries[i])) {
            // Append SQL command with query param in lowercase
            queryStr.push(`lower(${validQueries[i]}) = $${num++}`);
            queryStr.push('AND');
            // Add the value of the query param in the values array in lowercase
            values.push(reqQuery[validQueries[i]].toLowerCase());
            isQuery = true;
        }
    }
    // Remove extra 'AND'
    queryStr.pop();
    // Add the final GROUP BY clause
    queryStr.push('GROUP BY r.restaurant_id');
    // Join the queryStr array to get one whole query string
    let ratingText = queryStr.join(' ');

    // Default query string if there are no query params
    // if (!isQuery) ratingText = `SELECT r.restaurant_id, r.name, r.location, r.category, r.price,
    // AVG(rev.rating) AS rating, COUNT(rev.rating) AS total_ratings
    //     FROM restaurants AS r
    //     JOIN reviews AS rev
    //     ON r.restaurant_id = rev.restaurant_id
    // GROUP BY r.restaurant_id`

    if (!isQuery) ratingText = `WITH restaurants AS (
        SELECT r.restaurant_id, r.name, r.price, array_agg(c.category) AS categories
            FROM restaurants AS r 
                JOIN restaurant_categories AS rc
                    ON r.restaurant_id = rc.restaurant_id
                JOIN categories AS c
                    ON rc.category_id = c.category_id
                GROUP BY r.restaurant_id
        ),
        ratings AS (
        SELECT r.restaurant_id, AVG(re.rating) AS rating, COUNT(re.rating) AS total_ratings
        FROM restaurants AS r
                JOIN reviews AS re
                    ON r.restaurant_id = re.restaurant_id
                GROUP BY r.restaurant_id
        )
        SELECT
            restaurants.restaurant_id, restaurants.name, restaurants.price, restaurants.categories,
            ratings.rating, COALESCE (ratings.total_ratings, 0) AS total_ratings
        FROM restaurants FULL JOIN ratings
        ON restaurants.restaurant_id = ratings.restaurant_id`

    // Run query in pg
    let results = await client.query(ratingText, values);
    return results;
}

module.exports = app => {
    app.get('/api/restaurants', async (req, res) => {
        try {
            const restaurants = await queryCheck(req.query);

            if (!restaurants.rows.length) return res.status(404).send('No restaurants found');

            res.status(200).json({
                success: true,
                results: restaurants.rows.length,
                data: restaurants.rows
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.get('/api/restaurants/:restaurant_id', async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const restaurant = await client.query(
                `WITH restaurants AS (
                SELECT r.restaurant_id, r.name, r.price, array_agg(c.category) AS categories
                    FROM restaurants AS r 
                        JOIN restaurant_categories AS rc
                            ON r.restaurant_id = rc.restaurant_id
                        JOIN categories AS c
                            ON rc.category_id = c.category_id
                        WHERE r.restaurant_id = $1
                        GROUP BY r.restaurant_id
                ),
                ratings AS (
                SELECT r.restaurant_id, AVG(re.rating) AS rating, COUNT(re.rating) AS total_ratings
                FROM restaurants AS r
                        JOIN reviews AS re
                            ON r.restaurant_id = re.restaurant_id
                        WHERE r.restaurant_id = $1
                        GROUP BY r.restaurant_id
                )
                SELECT
                    restaurants.restaurant_id, restaurants.name, restaurants.price, restaurants.categories,
                    ratings.rating, COALESCE (ratings.total_ratings, 0) AS total_ratings
                FROM restaurants FULL JOIN ratings
                ON restaurants.restaurant_id = ratings.restaurant_id`, [restaurant_id])

            if (!restaurant.rows.length) return res.status(404).send('No restaurant found');

            res.status(200).json({
                success: true,
                results: restaurant.rows.length,
                data: restaurant.rows[0]
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.post('/api/restaurants', addRestaurantValidator, async (req, res) => {
        try {
            const { name, address, suite, city, state, zip, price } = req.body;
            const restaurant = await client.query(
                `INSERT INTO restaurants (name, address, suite, city, state, zip, price)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [name, address, suite, city, state, zip, price]
            )

            res.status(201).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.put('/api/restaurants/:id', async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { name, location, category, price } = req.body;
            const restaurant = await client.query(
                `UPDATE restaurants
                    SET name = $1,
                    location = $2,
                    category = $3
                    price = $4
                WHERE restaurant_id = $5 RETURNING *`,
                [name, location, category, price, restaurant_id]
            )

            res.status(200).json({
                success: true,
                data: restaurant.rows[0]
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.delete('/api/restaurants/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const restaurant = await client.query('DELETE FROM restaurants WHERE restaurant_id = $1', [id])

            res.status(200).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.post('/api/categories', async (req, res) => {
        try {
            const { category } = req.body;
            const addCategory = await client.query('INSERT INTO categories (category) VALUES $1', [category])

            res.status(201).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.get('/api/categories', async (req, res) => {
        try {
            const categories = await client.query('SELECT * FROM categories');

            res.status(200).json(categories.rows);
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.post('/api/restaurant_categories', async (req, res) => {
        try {
            const { restaurant_id, category_id } = req.body;
            const addCategory = await client.query(
                `INSERT INTO restaurant_categories (restaurant_id, category_id)
                VALUES ($1, $2)`,
                [restaurant_id, category_id]
            )

            res.status(201).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.get('/api/restaurant_categories', async (req, res) => {
        try {
            const categories = await client.query('SELECT * FROM restaurant_categories')

            res.status(200).json(categories.rows);
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.get('/api/suggestions', async (req, res) => {
        try {
            const suggestions = await client.query('SELECT * FROM suggestions');
            if (!suggestions.rows.length) return res.status(404).send('No suggestions');

            res.status(200).json(suggestions.rows);
        } catch (err) {
            res.status(500).send('Server error');
        }
    })
}


// console.log(req.query)
// console.log(Object.keys(req.query))
// console.log(req.query.hasOwnProperty('location'))
// console.log(req.query['location'])