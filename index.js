require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

require('./routes/dashRoutes')(app);
require('./routes/userRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));