const router = require('express').Router();
// const pool = require('../db');
const client = require('../config/db');
const { addRestaurantValidator } = require('../middlewares/validator');

const queryCheck = async (reqQuery) => {
    let isQuery = false;
    let values = [];
    let num = 1;
    let querystr = ['SELECT * FROM restaurants WHERE'];
    const validQueries = ['name', 'city', 'category', 'price_range'];

    for (let i = 0; i < validQueries.length; i++) {
        // Check if there are any valid query params in req.query
        if (reqQuery.hasOwnProperty(validQueries[i])) {
            // Append SQL command with query param
            querystr.push(`${validQueries[i]} = $${num++}`);
            // Also include SQL command 'AND' for multiple query params
            querystr.push('AND');
            // Add the value of the query param in the values array
            values.push(reqQuery[validQueries[i]]);
            isQuery = true;
        }
    }
    // Remove the extra 'AND' at the end of the querystr array
    querystr.pop()
    // Join the querystr array to get one whole query string
    let text = querystr.join(' ');
    // Default query string
    if (!isQuery) text = 'SELECT * FROM restaurants'

    let results = await client.query(text, values);
    return results;
}

router.get('/restaurants', async (req, res) => {
    try {
        const results = await queryCheck(req.query);

        if (!results.rows.length) {
            return res.status(404).send('No restaurants');
        }

        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: results.rows
        })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.get('/restaurants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const results = await client.query(
            `SELECT * FROM restaurants WHERE restaurant_id = $1`,
            [id]
        )

        if (!results.rows.length) {
            return res.status(404).send('No restaurant found');
        }

        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: results.rows[0]
        })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.post('/restaurants', addRestaurantValidator, async (req, res) => {
    try {
        const { name, city, category, price_range } = req.body;
        const results = await client.query(
            `INSERT INTO restaurants (name, city, category, price_range)
            VALUES ($1, $2, $3, $4)`,
            [name, city, category, price_range]
        )

        res.status(201).json({ status: 'success' })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.put('/restaurants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, city, category, price_range } = req.body;
        const results = await client.query(
            `UPDATE restaurants
                SET name = $1,
                city = $2,
                category = $3
                price_range = $4
            WHERE restaurant_id = $5 RETURNING *`,
            [name, city, category, price_range, id]
        )

        res.status(200).json({
            status: 'success',
            data: results.rows[0]
        })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.delete('/restaurants/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const results = await client.query(
            `DELETE FROM restaurants WHERE restaurant_id = $1`,
            [id]
        )

        res.status(200).json({ status: 'success' })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

module.exports = router;

// console.log(req.query)
// console.log(Object.keys(req.query))
// console.log(req.query.hasOwnProperty('city'))
// console.log(req.query['city'])