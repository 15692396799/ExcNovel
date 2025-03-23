import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
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
});

export default model('Comment', commentSchema, 'comments');