const client = require('../config/db');
const { addReviewValidator, addReviewValidatorM } = require('../middlewares/validator');
const Review = require('../mdbModels/Review');
const authorizeToken = require('../middlewares/authorizeToken');

module.exports = app => {
    app.get('/api/reviews', async (req, res) => {
        try {
            const reviews = await client.query('SELECT * FROM reviews');
            if (!results.rows.length) return res.status(404).send('No reviews yet');

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
                VALUES ($1, $2, $3, $4, $5) returning *`,
                [restaurant_id, user_id, rating, details, date]
            )

            res.status(201).json({
                success: true,
                review: review.rows[0]
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.post('/api/reviews/m', addReviewValidatorM, async (req, res) => {
        try {
            const review = new Review({ ...req.body });
            const result = review.save();

            res.status(201).json(review);
        } catch (err) {
            res.status(500).send('Server error')
        }
    })

    app.put('/api/reviews/m/:review_id', async (req, res) => {
        try {
            const result = await Review.findByIdAndUpdate(req.params.review_id,
                { $push: { images: req.body } },
                { new: true, useFindAndModify: false }
            )

            res.status(200).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.put('/api/reviews/m/rem/:review_id', async (req, res) => {
        try {
            const result = await Review.findByIdAndUpdate(req.params.review_id,
                { $pull: { images: { _id: req.body.imageId } } },
                { useFindAndModify: false }
            )

            res.status(200).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Get a specific review
    app.get('/api/reviews/:review_id', async (req, res) => {
        try {
            const { review_id } = req.params;
            const review = await client.query('SELECT * FROM reviews WHERE review_id = $1', [review_id]);
            if (!review.rows.length) return res.status(404).send('No review yet');

            res.status(200).json({
                success: true,
                results: review.rows.length,
                data: review.rows[0]
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Get all reviews for a restaurant with user info
    // and any images in an array for each review
    app.get('/api/reviews/restaurants/:restaurant_id', async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const reviews = await client.query(
                `WITH reviews AS (
                    SELECT r.review_id, r.rating, r.details, r.date, r.updated_at, u.user_id, u.first_name, u.last_name
                    FROM reviews AS r
                        JOIN users AS u
                        ON r.user_id = u.user_id
                    WHERE restaurant_id = $1
                ),
                images AS (
                    SELECT review_id, array_agg(image_url) AS images
                    FROM review_images
                        GROUP BY review_id
                )
                SELECT
                    reviews.user_id, reviews.first_name, reviews.last_name, reviews.rating, reviews.details,
                    reviews.date, reviews.updated_at, images.images
                FROM reviews LEFT JOIN images
                ON reviews.review_id = images.review_id
                ORDER BY reviews.date DESC`,
                [restaurant_id]
            )
            if (!reviews.rows.length) return res.status(404).send('No reviews yet');

            res.status(200).json({
                success: true,
                results: reviews.rows.length,
                data: reviews.rows
            })
        } catch (err) {
            res.status(500).send(err.message);
        }
    })

    app.get('/test', async (req, res) => {
        const result = await client.query(`SELECT review_id, array_agg(image_url) AS images
        FROM review_images
            GROUP BY review_id`)

            res.send(result.rows)
    })

    // Get all reviews from a user
    app.get('/api/reviews/users/:user_id', async (req, res) => {
        try {
            const { user_id } = req.params;
            const reviews = await client.query(
                `SELECT r.review_id, r.restaurant_id, r.rating, r.details, r.date, re.name
                    FROM reviews AS r
                        JOIN restaurants AS re
                        ON r.restaurant_id = re.restaurant_id
                    WHERE r.user_id = $1
                    ORDER BY r.date DESC`,
                [user_id]
            )
            if (!reviews.rows.length) return res.status(404).send('No reviews yet');

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

    // Add an image url
    app.post('/api/review_images', async (req, res) => {
        try {
            const { restaurant_id, user_id, review_id, image_url } = req.body;
            const image = await client.query(
                `INSERT INTO review_images (restaurant_id, user_id, review_id, image_url)
                VALUES ($1, $2, $3, $4)`,
                [restaurant_id, user_id, review_id, image_url]
            )

            res.status(201).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Get images for a restaurant
    app.get('/api/review_images/restaurants/:restaurant_id', async (req, res) => {
        try {
            const { restaurant_id } = req.params;
            const images = await client.query('SELECT * FROM review_images WHERE restaurant_id = $1', [restaurant_id]);
            if (!images.rows.length) return res.status(404).send('No images yet');

            res.status(200).json({
                success: true,
                results: images.rows.length,
                data: images.rows
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.get('/api/review_images/users/:user_id', async (req, res) => {
        try {
            const { user_id } = req.params;
            const user_images = await client.query(
                `SELECT * FROM review_images
                    WHERE user_id = $1
                    `,
                [user_id]
            )

            res.status(200).json({
                success: true,
                results: user_images.rows
            });
        } catch (err) {
            res.status(500).send('Server error');
        }
    })
}