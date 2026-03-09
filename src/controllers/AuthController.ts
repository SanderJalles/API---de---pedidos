import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.js';
import { LoginUserDTO } from '../dtos/LoginUserDTO.js';
import { RegisterUserDTO } from '../dtos/RegisterUserDTO.js';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
  const data: RegisterUserDTO = req.body; 
  const user = await authService.register(data);
  return res.status(201).json(user);
}

async login(req: Request, res: Response) {
  try {
    const data: LoginUserDTO = req.body;
    const result = await authService.login(data);
    
    return res.status(200).json(result);
  } catch (error: any) {
    const message = error.message || 'Erro inesperado no servidor';
    
    if (message.includes('registre-se')) {
      return res.status(401).json({ message });
    }

    return res.status(400).json({ message });
  }
}
}