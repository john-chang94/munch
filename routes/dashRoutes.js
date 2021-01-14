const client = require('../config/db');
const { addRestaurantValidator } = require('../middlewares/validator');

// Check if there are any valid query params in req.query
const queryCheck = async (reqQuery) => {
    let isQuery = false;
    let values = [];
    let num = 1;
    // Join restaurants and reviews to get the ratings
    let queryStr = [
        `SELECT r.restaurant_id, r.name, r.location, r.category, r.price_range,
        AVG(rev.rating) AS rating, COUNT(rev.rating) AS total_ratings
            FROM restaurants AS r
            JOIN reviews AS rev
            ON r.restaurant_id = rev.restaurant_id
        WHERE`
    ]
    const validQueries = ['location', 'category', 'price_range'];

    // Main search text input can be name or category
    if (reqQuery.hasOwnProperty('find')) {
        queryStr.push(`lower(name) LIKE $${num++} OR lower(category) LIKE $${num++}`);
        // Search for values that have any characters following the user input with %
        values.push(`${reqQuery['find'].toLowerCase()}%`);
        values.push(`${reqQuery['find'].toLowerCase()}%`);
        isQuery = true;
    }

    // Additional queries will be appended here
    for (let i = 0; i < validQueries.length; i++) {
        if (reqQuery.hasOwnProperty(validQueries[i])) {
            // Append SQL command with query param in lowercase
            queryStr.push(`AND lower(${validQueries[i]}) = $${num++}`);
            // Add the value of the query param in the values array in lowercase
            values.push(reqQuery[validQueries[i]].toLowerCase());
            isQuery = true;
        }
    }
    // Add the final GROUP BY clause
    queryStr.push('GROUP BY r.restaurant_id');
    // Join the queryStr array to get one whole query string
    let ratingText = queryStr.join(' ');

    // Default query string if there are no query params
    if (!isQuery) ratingText = `SELECT r.restaurant_id, r.name, r.location, r.category, r.price_range,
    AVG(rev.rating) AS rating, COUNT(rev.rating) AS total_ratings
        FROM restaurants AS r
        JOIN reviews AS rev
        ON r.restaurant_id = rev.restaurant_id
    GROUP BY r.restaurant_id`

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
                `SELECT r.restaurant_id, r.name, r.location, r.category, r.price_range,
                AVG(rev.rating) AS rating, COUNT(rev.rating) AS total_ratings
                    FROM restaurants AS r
                    JOIN reviews AS rev
                    ON r.restaurant_id = rev.restaurant_id
                WHERE r.restaurant_id = $1
                GROUP BY r.restaurant_id`, [restaurant_id])

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
            const { name, location, category, price_range } = req.body;
            const restaurant = await client.query(
                `INSERT INTO restaurants (name, location, category, price_range)
                VALUES ($1, $2, $3, $4)`,
                [name, location, category, price_range]
            )

            res.status(201).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.put('/api/restaurants/:id', async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { name, location, category, price_range } = req.body;
            const restaurant = await client.query(
                `UPDATE restaurants
                    SET name = $1,
                    location = $2,
                    category = $3
                    price_range = $4
                WHERE restaurant_id = $5 RETURNING *`,
                [name, location, category, price_range, restaurant_id]
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