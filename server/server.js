const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require("./routes/auth")
const cors = require("cors");

const app = express();

app.use(
    cors({
      origin: true,
      credentials: true,
    })
);

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB is connected"))
.catch(err=>console.log(err))

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
  });
app.use("/auth",authRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Backend listening at ${PORT}`)
})