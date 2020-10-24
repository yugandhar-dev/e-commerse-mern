import dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';
import products from './data/products.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

app.listen(
  process.env.PORT || 5000,
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .magenta.bold
  )
);
