// const pool = require('../db');
const client = require('../config/db');
const { addRestaurantValidator } = require('../middlewares/validator');

// Check if there are any valid query params in req.query
const queryCheck = async (reqQuery) => {
    let isQuery = false;
    let values = [];
    let num = 1;
    let querystr = ['SELECT * FROM restaurants WHERE'];
    const validQueries = ['name', 'city', 'category', 'price_range'];

    for (let i = 0; i < validQueries.length; i++) {
        // If req.query has any valid query params then do the following
        if (reqQuery.hasOwnProperty(validQueries[i])) {
            // Append SQL command with query param with lowercase
            querystr.push(`lower(${validQueries[i]}) = $${num++}`);
            // Also include SQL command 'AND' for multiple query params
            querystr.push('AND');
            // Add the value of the query param in the values array with lowercase
            values.push(reqQuery[validQueries[i]].toLowerCase());
            isQuery = true;
        }
    }
    // Remove the extra 'AND' at the end of the querystr array
    querystr.pop()
    // Join the querystr array to get one whole query string
    let text = querystr.join(' ');
    // Default query string if there are no query params
    if (!isQuery) text = 'SELECT * FROM restaurants'

    // Run query in pg
    let results = await client.query(text, values);
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
            const { id } = req.params;
            const restaurant = await client.query('SELECT * FROM restaurants WHERE restaurant_id = $1', [id])
    
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
            const { name, city, category, price_range } = req.body;
            const restaurant = await client.query(
                `INSERT INTO restaurants (name, city, category, price_range)
                VALUES ($1, $2, $3, $4)`,
                [name, city, category, price_range]
            )
    
            res.status(201).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })
    
    app.put('/api/restaurants/:id', async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const { name, city, category, price_range } = req.body;
            const restaurant = await client.query(
                `UPDATE restaurants
                    SET name = $1,
                    city = $2,
                    category = $3
                    price_range = $4
                WHERE restaurant_id = $5 RETURNING *`,
                [name, city, category, price_range, restaurant_id]
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
}


// console.log(req.query)
// console.log(Object.keys(req.query))
// console.log(req.query.hasOwnProperty('city'))
// console.log(req.query['city'])