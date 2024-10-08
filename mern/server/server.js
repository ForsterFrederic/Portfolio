require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/router');
const mongoose = require('./db/db');
const path = require('path');

const app = express();

const IS_PROD = process.env.IS_PROD;
const BACKEND_PORT = process.env.BACKEND_PORT;
const PROD_BACKEND_PORT = process.env.PROD_BACKEND_PORT;
const PORT = (IS_PROD === "TRUE" ? PROD_BACKEND_PORT : BACKEND_PORT) || 3001;

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['https://frederic-forster.com', 'http://localhost:3000'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../client/build')));

app.use('/api', router);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/api/test', (req, res) => {
    res.send('Hi from the server! (OK)');
});

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`\n\n|----> SERVER IS RUNNING ON PORT: ${PORT} <----|\n\n`);
    });
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
