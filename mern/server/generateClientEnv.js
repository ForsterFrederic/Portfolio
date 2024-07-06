require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log("la", process.env.IS_PROD)
const clientEnv = {
    REACT_APP_BACKEND_API_URL: process.env.IS_PROD === "TRUE" ? process.env.PROD_BACKEND_API_URL : process.env.BACKEND_API_URL,
    REACT_APP_IS_PROD: process.env.IS_PROD,
    REACT_APP_IS_DEVELOPMENT: process.env.IS_DEVELOPMENT,
};

fs.writeFileSync(
    path.join(__dirname, '../client/.env'),
    Object.entries(clientEnv)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n')
);