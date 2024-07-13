const express = require('express');
const errorHandler = require("./middlewear/errorHandler");
const app = express();
const dotEnv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDb = require('./config/dbConnection');
connectDb();


app.use(express.json());
app.use('/api/product', require("./routes/productRoutes"));
app.use('/api/seller',require('./routes/sellerRoutes'));
app.use('/api/resturant',require('./routes/resturantRoutes'));
app.use(errorHandler);



app.listen(port, ()=>{
    console.log("server is running on " + port);

})