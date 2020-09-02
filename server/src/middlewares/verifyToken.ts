import jwt, { JsonWebTokenError, VerifyCallback } from 'jsonwebtoken';
import { Request, Response } from 'express';

export default function verifyToken(request: Request, response: Response, next: Function) {
  const token = request.header('auth-token');

  if (!token) return response.status(401).send('Access Denied');

  try {
    jwt.verify(token, String(process.env.TOKEN_SECRET), (err, decoded) => {
      if (err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      return next();
    });
  } catch (err) {
    return response.status(400).send('Invalid Token');
  }
}
