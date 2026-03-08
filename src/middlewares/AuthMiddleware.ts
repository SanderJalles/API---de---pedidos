import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Erro no formato do token' });
  }

  const [scheme, token] = parts;

  if (!token || !scheme) {
    return res.status(401).json({ error: 'Token malformado' });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("❌ ERRO: JWT_SECRET não configurado no .env");
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }

    const decoded = jwt.verify(token, secret) as any;

    (req as any).user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};