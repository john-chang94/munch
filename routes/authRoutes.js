const client = require('../config/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const { registerUserValidator } = require('../middlewares/validator');
const authorizeToken = require('../middlewares/authorizeToken');

module.exports = app => {
    app.post('/auth/register', registerUserValidator, async (req, res) => {
        try {
            let { firstName, lastName, email, password } = req.body;

            // Check if user exists
            const user = await client.query('SELECT * FROM users WHERE email = $1', [email])
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
                        const newUser = await client.query(
                            `INSERT INTO users (firstName, lastName, email, password)
                            VALUES ($1, $2, $3, $4) RETURNING *`,
                            [firstName, lastName, email, password]
                        )

                        res.status(201).json({ success: true })
                    })
                })
            }
        } catch (err) {
            res.status(500).send('Sever error');
        }
    })

    app.post('/auth/signin', async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await client.query('SELECT * FROM users WHERE email = $1', [email])
            if (!user.rows.length) return res.status(400).send('Email does not exist');

            // Check if hashed password is a match
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
            if (!validPassword) return res.status(400).send('Invalid credentials');

            // Provide token if successful
            const token = jwtGenerator(user.rows[0].userId);
            // Remove password from response user object
            delete user.rows[0].password;
            res.status(200).json({
                success: true,
                user: user.rows[0],
                token
            });

        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Return user info for init page load
    app.get('/auth/verify', authorizeToken, async (req, res) => {
        try {
            // req.id comes from authorizeToken middleware
            const user = await client.query('SELECT * FROM users WHERE userId = $1', [req.id]);
            delete user.rows[0].password;
            res.status(200).json(user.rows[0]);
        } catch (err) {
            res.send(500).send('Unauthorized');
        }
    })

    // app.param('userId', async (req, res, next, userId) => {
    //     const user = await client.query('SELECT * FROM users WHERE userId = $1', [userId])
    //     req.user = user;
    //     next();
    // })
}