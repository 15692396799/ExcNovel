// src/utils/jwtUtils.ts
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/auth';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string||'your-secret-key';
const DEFAULT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

/**
 * 生成 JWT Token
 * @param userId - 用户ID
 * @param expiresIn - 过期时间（默认为7天）
 * @returns 生成的Token字符串
 */
export const generateToken = (
  userId: string,
  expiresIn: string = DEFAULT_EXPIRES_IN
): string => {
  const payload: TokenPayload = {
    userId,
    // 可以添加其他必要字段（如角色等）
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
    algorithm: 'HS256', // 明确指定算法
  });
};

/**
 * 验证 Token 有效性（与authController中的verifyToken保持同步）
 */
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
