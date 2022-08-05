const express =require ('express');
require("dotenv").config();
const mongoose = require('mongoose')

// const errorHandler = require('./middlewares/error')

const playerRouter = require('./routes/playersroute')
const clubRouter=require('./routes/clubroute')

const app = express();

app.use(express.json());

app.use('/api/club/players', playerRouter)
app.use('/api/club/clubs',clubRouter)

// app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI).then((connection) => {
    console.log('connected to database')
}).catch((error) => {
    console.log(`unable to connect to database: ${error.message}`)
})

app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`);
  });
