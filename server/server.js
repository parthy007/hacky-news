const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const cors = require('cors');

const app = express();

// CORS configuration
const allowedOrigins = ['https://hacky-news-sigma.vercel.app', 'http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['OPTIONS', 'GET', 'POST'],
    credentials: true,
  })
);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/auth', authRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend listening at ${PORT}`);
});
