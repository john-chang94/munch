const client = require('../config/db');

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

            res.status(200).json({
                success: true,
                results: user.rows.length,
                data: user.rows[0]
            })
        } catch (err) {
            res.status(500).send('Sever error');
        }
    })
}