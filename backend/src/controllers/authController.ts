import { Request, Response, RequestHandler } from 'express';
import User from '../models/User';
import { generateToken, verifyToken } from '../utils/jwtUtils';

import { CookieOptions } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    domain: 'localhost',
    maxAge: 7 * 24 * 3600 * 1000, // 7天有效期
};


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

        res.cookie('token', token, COOKIE_OPTIONS);

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
export const login : RequestHandler = async (req: Request, res: Response) => {
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
        // console.log(isPasswordValid);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Wrong password !' });
            return;
        }

        // 生成 JWT
        if (user) {
            const token = generateToken(user._id.toString());
            res.cookie('token', token, COOKIE_OPTIONS);
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


// 验证 Token 并返回用户信息
export const getCurrentUser: RequestHandler = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Authorization token missing' });
        return;
    }

    try {
        // 验证 Token
        const decoded = verifyToken(token);
        if (!decoded?.userId) {
            res.status(401).json({ message: 'Invalid token' });
            return;
          }

        // 查询用户（排除密码字段）
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // 返回安全字段
        res.json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
        return;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: ' Session over time. Login again.' });
            return;
        }
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
}

export const logout: RequestHandler = async (req: Request, res: Response) => {
    try {
        // 如果是基于 Cookie 的验证，清除 Cookie
        res.clearCookie('token', {
            ...COOKIE_OPTIONS,
            maxAge: 0,
          });
        // 返回成功响应
        res.status(200).json({ message: 'Logged out successfully' });
        return;
      } catch (error) {
        res.status(500).json({ message: 'Logout failed' });
        return;
      }
}
