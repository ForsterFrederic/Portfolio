const mongoose = require('mongoose');
require('dotenv').config();

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PortfolioDB';
const MONGODB_URI = 'mongodb+srv://portfolio:Frederic137*@cluster24753.2uvzwvc.mongodb.net/portfolio';


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = mongoose;
