// middleware/authMiddleware.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../utils/jwtUtils';

export const authenticate: RequestHandler = (req: Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
  
  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return ;
  }

  try{
    const decoded = verifyToken(token);
    if (!decoded?.userId) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    req.userId = decoded.userId;
    next();
  }
  catch(error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }

};