import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import storyRoutes from './routes/storyRoutes';
import categoryRoutes from './routes/categoryRoutes';
import authRoutes from './routes/authRoutes';
import { all } from 'axios';
import cookieParser from 'cookie-parser';

const app = express();
const port = 5000;

// 中间件
// app.use(cors());
// app.use(express.json());

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/excnov-db')
    .then(() => {
        console.log('Connected to MongoDB Successfully');
    })
    .catch(err => {
        console.log('Failed to connect to MongoDB', err);
    });

// // 精确配置允许的源（不要用通配符 * 当使用 credentials 时）
// const allowedOrigins = ['http://localhost:5173']; // 添加你的前端地址

// app.use(cors({
//     // origin: function (origin, callback) {
//     //     // 允许没有 origin 的请求（如移动端或 Postman）
//     //     if (!origin) return callback(null, true);
//     //     if (allowedOrigins.includes(origin)) {
//     //         callback(null, true);
//     //     } else {
//     //         callback(new Error('Not allowed by CORS'));
//     //     }
//     // },
//     // credentials: true, // 允许携带凭证（Cookie）
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST','OPTIONS', 'PUT', 'DELETE'], // 允许的 HTTP 方法
//     allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
// }));


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
   }

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Custom CORS middleware
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//     });

// app.use(cors());
// 路由
app.use('/api', storyRoutes);
app.use('/api', categoryRoutes);
app.use('/api/auth', authRoutes);


// 启动服务器
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});