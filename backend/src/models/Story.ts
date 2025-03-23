import { Schema, model } from 'mongoose';

const storySchema = new Schema({
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

export default model('Story', storySchema, 'stories');