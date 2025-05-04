import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {prisma} from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_with_a_real_secret';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or malformed token' });
  }

  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) throw new Error();
    req.user = { id: user.id };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
