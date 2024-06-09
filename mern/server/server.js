const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/router');
require('dotenv').config();
const mongoose = require('./db/db');
const path = require('path');

const app = express();
// const PORT = process.env.BACKEND_PORT || 3001;
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../client/build')));

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hi from the server! (test)');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
