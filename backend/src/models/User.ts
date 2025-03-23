import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    id: Number,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // 用户角色
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

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

// 密码加密钩子
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        console.log('pre save');
        console.log(this .password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password);
    }
    next();
});

// 密码验证方法
userSchema.methods.comparePassword = async function (password: string) {
    console.log('comparePassword');
    console.log(password);
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
};

export default model('User', userSchema, 'users');