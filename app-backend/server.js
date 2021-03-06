import dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);

// This middleware is initiated for all errors
app.use(errorHandler);

app.listen(
  process.env.PORT || 5000,
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .magenta.bold
  )
);
