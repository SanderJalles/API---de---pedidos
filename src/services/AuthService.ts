import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


export class AuthService {
  async login(data: any) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('E-mail ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('E-mail ou senha inválidos');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' } 
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    };
  }


  async register(data: any) {
  const { email, password, name } = data;

  if (!password) {
    throw new Error('A senha é obrigatória');
  }

  if (!email) {
    throw new Error('O e-mail é obrigatório');
  }

  if (!name) {
    throw new Error('O nome é obrigatório');
  }

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}
}