import { PrismaClient } from '@prisma/client';

const data = [
  {
    name: 'ADMIN',
    label: 'Администратор системы',
    description:
      'Пользователь, имеющий права добавлять, удалять, обновлять информационные системы',
  },
  {
    name: 'ROOT',
    label: 'Босс',
    description:
      'Пользователь, обладающий всеми возможными правами, включая удаление и добавление пользователей',
  },
];

export async function seedRoles(prisma: PrismaClient) {
  for (const role of data) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        label: role.label,
        description: role.description,
      },
      create: role,
    });
  }

  console.log('Roles seeded successfully.');
}
