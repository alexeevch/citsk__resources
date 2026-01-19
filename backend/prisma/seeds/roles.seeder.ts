import { PrismaClient } from '@prisma/client';

const data = [
  {
    code: 'ADMIN',
    name: 'Администратор системы',
    description:
      'Пользователь, имеющий права добавлять, удалять, обновлять информационные системы',
  },
  {
    code: 'ROOT',
    name: 'Босс',
    description:
      'Пользователь, обладающий всеми возможными правами, включая удаление и добавление пользователей',
  },
];

export async function seedRoles(prisma: PrismaClient) {
  for (const role of data) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {
        name: role.name,
        description: role.description,
      },
      create: role,
    });
  }

  console.log('Roles seeded successfully.');
}
