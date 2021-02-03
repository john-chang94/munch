require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

require('./config/mdb');

app.use(cors());
app.use(express.json());

require('./routes/dashRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/reviewRoutes')(app);
require('./routes/authRoutes')(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));