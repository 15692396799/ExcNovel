import { User} from '../models/User'; // 根据你的实际路径调整

declare global {
  namespace Express {
    interface Request {
      userId?: string; // 我们添加的自定义属性
      user?: User; // 如果需要也可以添加完整的用户对象
    }
  }
}   