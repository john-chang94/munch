const client = require('../config/db');
const { addReviewValidator } = require('../middlewares/validator');

module.exports = app => {
    app.get('/api/reviews', async (req, res) => {
        try {
            const reviews = await client.query('SELECT * FROM reviews');
            if (!results.rows.length) return res.status(404).send('No reviews found');

            return res.status(200).json({
                success: true,
                results: reviews.rows.length,
                data: reviews.rows
            })
        } catch (err) {
            res.status(500).send('Sever error');
        }
    })

    app.post('/api/reviews', addReviewValidator, async (req, res) => {
        try {
            const { restaurant_id, user_id, rating, details, date } = req.body;
            const review = await client.query(
                `INSERT INTO reviews (restaurant_id, user_id, rating, details, date)
                VALUES ($1, $2, $3, $4, $5)`,
                [restaurant_id, user_id, rating, details, date]
            )

            res.status(201).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Get a specific review
    app.get('/api/reviews/:review_id', async (req, res) => {
        try {
            const { review_id } = req.params;
            const review = await client.query('SELECT * FROM reviews WHERE review_id = $1', [review_id]);
            if (!review.rows.length) return res.status(404).send('No review found');

            res.status(200).json({
                success: true,
                results: review.rows.length,
                data: review.rows[0]
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Get all reviews for a restaurant
    app.get('/api/reviews/restaurant/:restaurant_id', async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const reviews = await client.query(
                `SELECT * FROM reviews
                    WHERE restaurant_id = $1
                    ORDER BY date DESC`,
                [restaurant_id]
            )
            if (!reviews.rows.length) return res.status(404).send('No reviews found');

            res.status(400).json({
                success: true,
                results: reviews.rows.length,
                data: reviews.rows
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Get all reviews from a user
    app.get('/api/reviews/user/:user_id', async (req, res) => {
        try {
            const { user_id } = req.params;
            const reviews = await client.query(
                `SELECT r.review_id, r.restaurant_id, r.rating, r.details, r.date
                    FROM reviews AS r
                        JOIN restaurants AS re
                        ON r.restaurant_id = re.restaurant_id
                    WHERE r.user_id = $1`,
                [user_id]
            )
            if (!reviews.rows.length) return res.status(404).send('No reviews found');

            res.status(200).json({
                success: true,
                results: reviews.rows.length,
                data: reviews.rows
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Update a review
    app.put('/api/reviews/:review_id', addReviewValidator, async (req, res) => {
        try {
            const { review_id } = req.params;
            const { restaurant_id, user_id, rating, details, date } = req.body;
            const review = await client.query(
                `UPDATE reviews
                    SET restaurant_id = $1,
                    user_id = $2,
                    rating = $3,
                    details = $4,
                    date = $5
                WHERE review_id = $6 RETURNING *`,
                [restaurant_id, user_id, rating, details, date, review_id]
            )
            
            res.status(200).json({
                success: true,
                data: review.rows[0]
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.delete('/api/reviews/:review_id', async (req, res) => {
        try {
            const { review_id } = req.params;
            const review = await client.query('DELETE FROM reviews WHERE review_id = $1', [review_id]);

            res.status(200).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })
}