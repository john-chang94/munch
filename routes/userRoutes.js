const client = require('../config/db');
const bcrypt = require('bcrypt');
const { updateUserValidator } = require('../middlewares/validator');

module.exports = app => {
    app.get('/api/users', async (req, res) => {
        try {
            const users = await client.query('SELECT * FROM users');

            if (!users.rows.length) res.status(404).send('No users');

            res.status(200).json({
                success: true,
                results: users.rows.length,
                data: users.rows
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.get('/api/users/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await client.query('SELECT * FROM users WHERE userId = $1', [userId]);

            if (!user.rows.length) return res.status(404).send('No user found');

            delete user.rows[0].password;
            res.status(200).json({
                success: true,
                data: user.rows[0]
            })
        } catch (err) {
            res.status(500).send('Sever error');
        }
    })

    // Update user profile
    app.put('/api/users/:userId', updateUserValidator, async (req, res) => {
        try {
            const { userId } = req.params;
            const { firstName, lastName, email } = req.body;
            const user = await client.query(
                `UPDATE users
                    SET firstName = $1,
                        lastName = $2,
                        email = $3
                    WHERE userId = $4`,
                [firstName, lastName, email, userId]
            )

            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Update user password
    app.put('/api/users/reset-pw/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            let { password, newPassword, confirmNewPassword } = req.body;

            const user = await client.query('SELECT * FROM users WHERE userId = $1', [userId]);

            // Validate user's current password
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
            if (!validPassword) return res.status(400).send('Incorrect password');

            // Check if new password and confirmation password match
            const newPasswordMatch = newPassword === confirmNewPassword;
            if (!newPasswordMatch) return res.status(400).send('New passwords do not match');

            if (validPassword) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw new Error(err);
                    bcrypt.hash(newPassword, salt, async (err, hash) => {
                        if (err) throw new Error(err);
                        newPassword = hash;

                        const newUserPass = await client.query(
                            `UPDATE users
                                SET password = $1
                                WHERE userId = $2`,
                            [newPassword, userId]
                        )

                        res.status(200).json({ success: true })
                    })
                })
            }
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.post('/api/users/userImages', async (req, res) => {
        try {
            const { userId, url } = req.body;
            const image = await client.query(
                `INSERT INTO userImages (userId, url)
                VALUES ($1, $2)`,
                [userId, url]
            )

            res.status(201).json({ success: true });
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.delete('/api/users/userImages/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const removed = await client.query('DELETE FROM userImages WHERE userId = $1', [userId])

            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    app.get('/api/users/userImages/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const image = await client.query('SELECT * FROM userImages WHERE userId = $1', [userId])

            // Return default image if there is no user profile picture
            if (!image.rows.length) {
                const def = await client.query('SELECT * FROM userImages WHERE userId = 0')

                return res.status(200).json({
                    success: true,
                    data: def.rows[0]
                })
            }

            res.status(200).json({
                success: true,
                data: image.rows[0]
            })
        } catch (err) {
            res.status(500).send('Server error');
        }
    })
}