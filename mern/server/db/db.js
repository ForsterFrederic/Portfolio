require('dotenv').config();
const mongoose= require('mongoose');

const IS_PROD = process.env.IS_PROD;
const MONGODB_URI = process.env.MONGODB_URI;
const PROD_MONGODB_URI = process.env.PROD_MONGODB_URI;
const URI = (IS_PROD === "TRUE" ? PROD_MONGODB_URI : MONGODB_URI) || 'mongodb://localhost:27017/PortfolioDB';
// const URI = 'mongodb+srv://portfolio:Frederic137*@cluster24753.2uvzwvc.mongodb.net/portfolio';

console.log(URI)

mongoose.connect(URI, {
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
