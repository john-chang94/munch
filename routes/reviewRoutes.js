const client = require('../config/db');
const { addReviewValidator, addReviewValidatorM } = require('../middlewares/validator');
const Review = require('../mdbModels/Review');

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
            const { restaurantId, userId, rating, details, date } = req.body;
            const review = await client.query(
                `INSERT INTO reviews (restaurantId, userId, rating, details, date)
                VALUES ($1, $2, $3, $4, $5) returning *`,
                [restaurantId, userId, rating, details, date]
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

    app.put('/api/reviews/m/:reviewId', async (req, res) => {
        try {
            const result = await Review.findByIdAndUpdate(req.params.reviewId,
                { $push: { images: req.body } },
                { new: true, useFindAndModify: false }
            )

            res.status(200).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.put('/api/reviews/m/rem/:reviewId', async (req, res) => {
        try {
            const result = await Review.findByIdAndUpdate(req.params.reviewId,
                { $pull: { images: { _id: req.body.imageId } } },
                { useFindAndModify: false }
            )

            res.status(200).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Get a specific review
    app.get('/api/reviews/:reviewId', async (req, res) => {
        try {
            const { reviewId } = req.params;
            const review = await client.query('SELECT * FROM reviews WHERE reviewId = $1', [reviewId]);
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
    app.get('/api/reviews/restaurants/:restaurantId', async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const reviews = await client.query(
                `SELECT r.rating, r.details, r.date, u.userId, u.firstName, u.lastName
                    FROM reviews AS r
                        JOIN users AS u
                        ON r.userId = u.userId
                    WHERE restaurantId = $1
                    ORDER BY r.date DESC`,
                [restaurantId]
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

    // Get all reviews from a user
    app.get('/api/reviews/users/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const reviews = await client.query(
                `SELECT r.reviewId, r.restaurantId, r.rating, r.details, r.date, re.name
                    FROM reviews AS r
                        JOIN restaurants AS re
                        ON r.restaurantId = re.restaurantId
                    WHERE r.userId = $1
                    ORDER BY r.date DESC`,
                [userId]
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
    app.put('/api/reviews/:reviewId', addReviewValidator, async (req, res) => {
        try {
            const { reviewId } = req.params;
            const { restaurantId, userId, rating, details, date } = req.body;
            const review = await client.query(
                `UPDATE reviews
                    SET restaurantId = $1,
                    userId = $2,
                    rating = $3,
                    details = $4,
                    date = $5
                WHERE reviewId = $6 RETURNING *`,
                [restaurantId, userId, rating, details, date, reviewId]
            )

            res.status(200).json({
                success: true,
                data: review.rows[0]
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.delete('/api/reviews/:reviewId', async (req, res) => {
        try {
            const { reviewId } = req.params;
            const review = await client.query('DELETE FROM reviews WHERE reviewId = $1', [reviewId]);

            res.status(200).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Add an image url
    app.post('/api/reviewImages', async (req, res) => {
        try {
            const { restaurantId, userId, reviewId, url } = req.body;
            const image = await client.query(
                `INSERT INTO reviewImages (restaurantId, userId, reviewId, url)
                VALUES ($1, $2, $3, $4)`,
                [restaurantId, userId, reviewId, url]
            )

            res.status(201).json({ success: true })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Get images for a restaurant
    app.get('/api/reviewImages/restaurants/:restaurantId', async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const images = await client.query('SELECT * FROM reviewImages WHERE restaurantId = $1', [restaurantId]);
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

    app.get('/api/reviewImages/users/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const userImages = await client.query(
                `SELECT * FROM reviewImages
                    WHERE userId = $1
                    `,
                [userId]
            )

            res.status(200).json({
                success: true,
                results: userImages.rows
            });
        } catch (err) {
            res.status(500).send('Server error');
        }
    })
}