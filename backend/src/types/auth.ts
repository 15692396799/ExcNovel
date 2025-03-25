
export interface TokenPayload {
    userId: string;
    [key: string]: any; // 允许扩展其他字段
  }