const mongoose= require('mongoose');
require('dotenv').config("../.env");

const IS_PROD = process.env.IS_PROD;
const MONGODB_URI = process.env.MONGODB_URI;
const PROD_MONGODB_URI = process.env.PROD_MONGODB_URI;
// const URI = IS_PROD === "TRUE" ? PROD_MONGODB_URI : MONGODB_URI;
// const URI = "mongodb://localhost:27017/PortfolioDB"
const URI = "mongodb+srv://portfolio:Frederic137*@cluster24753.2uvzwvc.mongodb.net/portfolio"

console.log("MongoDB ATLAS URI: " + URI)

mongoose.connect(URI, {
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = mongoose;
