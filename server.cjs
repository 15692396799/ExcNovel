// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { create } = require('axios');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/excnov-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Successfully');
})
.catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

const storySchema = new mongoose.Schema({
    id: Number,
    title: String, 
    author: String,
    description: String,       
    image: String,
    type: String,
    rating: Number,
    likes: Number,
    dislikes: Number,
});

const categorySchema = new mongoose.Schema({
    id: Number,
    name: String,
    type: String,
});

const commentSchema = new mongoose.Schema({
    id: Number,
    storyId: Number,
    userId: Number,
    content: String,
    date: Date,
    ipAddress: String,
    likes: Number,
    dislikes: Number,
    qutoeCommentId: Number,
    moderationStatus: String,
    // rating: Number,

});

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String,
    role: String,
    createDate:Date,
    updateDate:Date,
    ipAddress: String,
    status: String,
    avartarUrl: String,
    bio: String,
    lastLogin: Date,
    loginAttempted: Number,
    loginBlocked: Boolean,
    perforences: Object,
    address: Object,
    socialMedia: Object,

});


const Story = mongoose.model('Story', storySchema, 'stories');
const Category = mongoose.model('Category', categorySchema, 'categories');

// 获取所有故事
app.get('/api/stories', async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 获取评分最高的五条故事
app.get('/api/stories/recommend', async (req, res) => {
    try {
        // 按评分降序排序，并限制返回结果为 5 条
        const topStories = await Story.find()
            .sort({ rating: -1 }) // 按评分降序排序
            .limit(5); // 限制返回 5 条数据

        res.json(topStories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 获取所有分类标签
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 根据类型获取故事
app.get('/api/stories/type/:type?', async (req, res) => {
    try {
        //升序排序
        if (req.params.type === 'default') {
            //限制返回数量为100条
            const stories = await Story.find()
                .sort({ rating: -1 })
                .limit(100);
            console.log(`selected type is ${req.params.type}`);
            res.json(stories);
        }
        else {
            const stories = await Story.find({ type: req.params.type })
                .sort({ rating: -1 });
            console.log(`selected type is ${req.params.type}`);
            res.json(stories);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 根据评分获取故事
app.get('/api/stories/rating/:rating', async (req, res) => {
    try {
        //寻找评分大于等于输入评分的故事
        const stories = await Story.find({ rating: { $gte: parseFloat(req.params.rating) } });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//按照喜欢的人数获取故事
app.get('/api/stories/popular', async (req, res) => {
    try {
        //寻找喜欢人数大于500的故事
        const stories = await Story.find({ likes: { $gte: 500 } });
        // const stories = await Story.find({ like: { $gte: parseInt(req.params.like) } });
        res.json(stories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});