import { Request, Response, RequestHandler } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwtUtils';

// 注册
export const register: RequestHandler = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        // 检查用户名和邮箱是否已存在
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(400).json({ message: 'Username or email already exists' });
            return;
        }

        // 创建新用户
        const newUser = new User({ username, email, password });
        await newUser.save();

        // 生成 JWT
        const token = generateToken(newUser._id.toString());

        res.status(201).json({
            message: 'User registered successfully', token, user: {
                username: newUser.username,
                email: newUser.email,
            },
        });
        return;
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
        return;
    }
};

// 登录
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // 检查用户是否存在
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ message: `No user name ${username} exist !` });
            return;
        }

        // 验证密码
        const isPasswordValid = await (user as any).comparePassword(password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Wrong password !' });
            return;
        }

        // 生成 JWT
        if (user) {
            const token = generateToken(user._id.toString());
            res.status(200).json({
                message: 'Login successful', token, user: {
                    username: user.username,
                    email: user.email,
                },
            });
            return;
        }

    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ message: errorMessage });
        return;
    };
};