# Frédéric FORSTER's Portfolio

## Important

```
MONGODB ATLAS URI = mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/
.env in /server and generated in /client

in .env file:
    IS_PROD=FALSE
    IS_DEVELOPMENT=FALSE
    
    BACKEND_PORT=3001
    PROD_BACKEND_PORT=5000
    
    BACKEND_API_URL=http://localhost:3001/api
    PROD_BACKEND_API_URL=https://frederic-forster.com/api
    
    MONGODB_URI=mongodb://localhost:27017/PortfolioDB
    PROD_MONGODB_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/    --change with the real one from MongoDB Atlas
```

## How To Run

Start server and client:
```
cd mern/
npm install
npm start
```

Start server:
```
cd mern/server
npm install
npm start
```

Start Web server
```
cd mern/client
npm install
npm start
```