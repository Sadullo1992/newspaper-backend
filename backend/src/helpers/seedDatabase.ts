import { PrismaClient } from '@prisma/client';
import { genHashPassword } from 'src/helpers/hashPassword';

const prisma = new PrismaClient();

export const seedDatabase = async () => {  
  const login = process.env.ADMIN_LOGIN;
  const password = await genHashPassword(process.env.ADMIN_PASSWORD);
  const now = Date.now();

  await prisma.user.upsert({
    where: { login },
    update: {},
    create: {
      login,
      password,
      createdAt: now,
      updatedAt: now,
    },
  });
};
