import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

async function createUsers() {
  const data: User[] = [
    {id: '1', name: 'TestName', email: 'test@email.com', createdAt: new Date, updatedAt: new Date, image: null, emailVerified: new Date, age: 0}
  ]
  return await prisma.user.createMany({
    data
  })
}

async function main() {
  try {
    const users = await createUsers();
    console.log(users);
  } catch (error) {
    console.error("Error", error)
  }finally {
    prisma.$disconnect()
  }
}

main()