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

    app.get('/api/users/:user_id', async (req, res) => {
        try {
            const { user_id } = req.params;
            const user = await client.query('SELECT * FROM users WHERE user_id = $1', [user_id]);

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
    app.put('/api/users/:user_id', updateUserValidator, async (req, res) => {
        try {
            const { user_id } = req.params;
            const { first_name, last_name, email } = req.body;
            const user = await client.query(
                `UPDATE users
                    SET first_name = $1,
                        last_name = $2,
                        email = $3
                    WHERE user_id = $4`,
                [first_name, last_name, email, user_id]
            )

            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).send('Server error');
        }
    })

    // Update user password
    app.put('/api/users/reset-pw/:user_id', async (req, res) => {
        try {
            const { user_id } = req.params;
            let { password, newPassword, confirmNewPassword } = req.body;

            const user = await client.query('SELECT * FROM users WHERE user_id = $1', [user_id]);

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
                                WHERE user_id = $2`,
                            [newPassword, user_id]
                        )

                        res.status(200).json({ success: true })
                    })
                })
            }
        } catch (err) {
            res.status(500).send('Server error');
        }
    })
}