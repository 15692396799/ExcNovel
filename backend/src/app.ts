import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import storyRoutes from './routes/storyRoutes';
import categoryRoutes from './routes/categoryRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const port = 5000;

// 中间件
app.use(cors());
app.use(express.json());

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/excnov-db')
.then(() => {
    console.log('Connected to MongoDB Successfully');
})
.catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

// 路由
app.use('/api', storyRoutes);
app.use('/api', categoryRoutes);
app.use('/api/auth', authRoutes);

// 启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});