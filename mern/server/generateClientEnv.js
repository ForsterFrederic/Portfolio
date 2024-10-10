require('dotenv').config();
const fs = require('fs');
const path = require('path');

const clientEnv = {
    REACT_APP_BACKEND_API_URL: process.env.IS_PROD === "TRUE" ? process.env.PROD_BACKEND_API_URL : process.env.BACKEND_API_URL,
    REACT_APP_IS_PROD: process.env.IS_PROD,
    REACT_APP_IS_DEVELOPMENT: process.env.IS_DEVELOPMENT,
};

const nextClientEnv = {
    NEXT_PUBLIC_BACKEND_API_URL: process.env.IS_PROD === "TRUE" ? process.env.PROD_BACKEND_API_URL : process.env.BACKEND_API_URL,
    NEXT_PUBLIC_IS_PROD: process.env.IS_PROD,
    NEXT_PUBLIC_IS_DEVELOPMENT: process.env.IS_DEVELOPMENT,
};

fs.writeFileSync(
    path.join(__dirname, '../client/.env'),
    Object.entries(clientEnv)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n')
);

fs.writeFileSync(
    path.join(__dirname, '../client/control-dashboard/.env'),
    Object.entries(nextClientEnv)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n')
);