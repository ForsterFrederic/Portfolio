const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/router');
require('dotenv').config();
const mongoose = require('./db/db'); // Import the mongoose connection

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hi from the server!');
});

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
