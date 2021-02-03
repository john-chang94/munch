const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'));

mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err.message}`)
})

module.exports = mongoose;