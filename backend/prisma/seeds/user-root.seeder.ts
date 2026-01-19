import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { getEnv } from '../env';

export async function userRootSeeder(prisma: PrismaClient) {
  const user = {
    email: getEnv('ROOT_EMAIL'),
    password: getEnv('ROOT_PASSWORD'),
    firstName: getEnv('ROOT_FIRST_NAME'),
    lastName: getEnv('ROOT_LAST_NAME'),
    phone: getEnv('ROOT_PHONE'),
  };

  const rootRole = await prisma.role.findUnique({
    where: { code: 'ROOT' },
  });
  if (!rootRole) {
    throw new Error('ROOT role not found');
  }

  await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: {
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
      roleId: rootRole.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    },
  });

  console.log('Root user seeded');
}
