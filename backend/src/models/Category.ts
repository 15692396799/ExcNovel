import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    id: Number,
    name: String,
    type: String,
});

export default model('Category', categorySchema, 'categories');