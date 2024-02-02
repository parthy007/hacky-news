const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require("./routes/auth")
const cors = require("cors");

const app = express();
dotenv.config()

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'OPTIONS', 'ORIGIN'],
    credentials: true
}));


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB is connected"))
.catch(err=>console.log(err))

app.use(express.json());
app.use("/auth",authRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Backend listening at ${PORT}`)
})