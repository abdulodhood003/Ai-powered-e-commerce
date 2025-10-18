import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRouter.js';

const app = express();
const PORT = process.env.PORT || 8000;


// Connect MongoDB & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:5173',
     'http://localhost:5174',
     'https://aurafit-backend-ruby.vercel.app'

    
  
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // Must come before routers

// API routes
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Default route
app.get('/', (req, res) => res.send('API Working'));

// 404 handler
app.use((req, res) => res.status(404).send('Not Found'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});
app.listen(PORT,() => console.log(`server running on port ${PORT}`))


export default app; // Vercel uses this for serverless
