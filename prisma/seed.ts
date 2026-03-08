import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@jitterbit.com' },
    update: {},
    create: {
      email: 'admin@jitterbit.com',
      name: 'Admin Jitterbit',
      password: hashedPassword,
    },
  });

  await prisma.order.upsert({
    where: { orderId: 'seed-order-01' },
    update: {},
    create: {
      orderId: 'seed-order-01',
      value: 1250.00,
      creationDate: new Date(),
      items: {
        create: [
          { productId: 101, quantity: 2, price: 500.00 },
          { productId: 102, quantity: 1, price: 250.00 }
        ]
      }
    }
  });

  console.log('✅ Banco semeado com sucesso!');
  console.log('👤 User: admin@jitterbit.com | Senha: admin123');
  console.log('📦 Order inicial criada: seed-order-01');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });