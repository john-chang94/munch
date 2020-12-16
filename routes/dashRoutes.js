const router = require('express').Router();
const pool = require('../db');
const { addRestaurantValidator } = require('../middlewares/validator');

router.get('/restaurants', async (req, res) => {
    try {
        const results = await pool.query(
            `SELECT * FROM restaurants`
        )

        if (results.rows.length === 0) {
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
        const results = await pool.query(
            `SELECT * FROM restaurants WHERE restaurant_id = $1`,
            [id]
        )

        if (results.rows.length === 0) {
            return res.status(404).send('No restaurant found');
        }

        res.status(200).json({
            status: 'success',
            results: results.length,
            data: results.rows[0]
        })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

router.post('/restaurants', async (req, res) => {
    // Check for validation before adding a restaurant
    const { errors, isValid } = addRestaurantValidator(req.body);
    if (!isValid) return res.status(400).json(errors);

    try {
        const { name, city, category, price_range } = req.body;
        const results = await pool.query(
            `INSERT INTO restaurants (name, city, category, price_range) VALUES ($1, $2, $3, $4)`,
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
        const results = await pool.query(
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
        const results = await pool.query(
            `DELETE FROM restaurants WHERE restaurant_id = $1`,
            [id]
        )

        res.status(200).json({ status: 'success' })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

module.exports = router;