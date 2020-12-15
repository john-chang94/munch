const router = require('express').Router();
const pool = require('../db');

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
    try {
        const { name, location, price_range } = req.body;
        const results = await pool.query(
            `INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3)`,
            [name, location, price_range]
        )

        res.status(201).json({ status: 'success' })
    } catch (err) {
        res.status(500).send('Server error');
    }
})

module.exports = router;