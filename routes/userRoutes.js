const client = require('../config/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

module.exports = app => {
    app.get('/api/users', async (req, res) => {
        try {
            const results = await client.query('SELECT * FROM users');

            if (!results.rows.length) res.status(404).send('No users');

            res.status(200).json({
                status: 'success',
                results: results.rows.length,
                data: results.rows
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.post('/api/users', async (req, res) => {
        try {
            let { name, email, password } = req.body;

            // Check if user exists
            const user = await client.query(
                'SELECT * FROM users WHERE email = $1', [email]
            )
            // Throw error if user exists
            if (user.rows.length) return res.status(400).send('User already exists');

            // Hash new user's password
            if (!user.rows.length) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw new Error(err);
                    bcrypt.hash(password, salt, async (err, hash) => {
                        if (err) throw new Error(err);
                        password = hash;

                        // Add new user into db
                        const results = await client.query(
                            `INSERT INTO users (name, email, password)
                            VALUES ($1, $2, $3) RETURNING *`,
                            [name, email, password]
                        )

                        // Generate jwt token
                        const token = jwtGenerator(results.rows[0].user_id)
                        res.status(200).json({
                            status: 'success',
                            token
                        })
                    })
                })
            }
        } catch (err) {
            res.status(500).send('Sever error');
        }
    })

    app.get('/api/users/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const results = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);

            if (!results.rows.length) return res.status(404).send('No user found');

            res.status(200).json({
                status: 'success',
                results: results.rows.length,
                data: results.rows[0]
            })
        } catch (err) {
            res.status(500).send('Sever error');
        }
    })
}