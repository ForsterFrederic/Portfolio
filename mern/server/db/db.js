const mongoose= require('mongoose');

const IS_PROD = process.env.IS_PROD;
const MONGODB_URI = process.env.MONGODB_URI;
const PROD_MONGODB_URI = process.env.PROD_MONGODB_URI;
const URI = IS_PROD === "TRUE" ? PROD_MONGODB_URI : MONGODB_URI;

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
