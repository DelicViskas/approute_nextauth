import { Categories, Goods, PrismaClient, Role, User } from "@prisma/client";
const prisma = new PrismaClient();


async function main() {
  try {
    const categories: Categories[] = await Promise.all(
      Array.from({ length: 10 }, (_, i) =>
        prisma.categories.create({
          data: { name: `Category ${i + 1}` }
        })
      )
    );
    const users: User[] = await Promise.all(
      Array.from({ length: 5 }, (_, i) =>
        prisma.user.create({
          data: {
            name: `User ${i + 1}`,
            email: `user${i + 1}@test.com`,
            age: Math.floor(Math.random() * 20) + 18
          }
        })
      )
    );
    await prisma.user.create({
      data: {
        name: `admin`,
        email: `admin@test.com`,
        age: Math.floor(Math.random() * 20) + 18,
        role: Role.ADMIN
      }
    })
    const goods: Goods[] =await Promise.all(
      Array.from({ length: 49 }, (_, i) =>
        prisma.goods.create({
          data: {
            title: `Product ${i + 1}`,
            price: Math.floor(Math.random() * 1000) + 100,
            description: `Description for product ${i + 1}`,
            categoryId: categories[Math.floor(Math.random() * categories.length)].id,
            accountId: users[Math.floor(Math.random() * users.length)].id,
            created: new Date(),
            updated: new Date(),
            image: 'https://placehold.co/200x300'
          }
        }))
    );

    await Promise.all(
      users.map((user)=> {
        const selectedGoods = goods
          .sort(() => 0.5 - Math.random()) // Перемешиваем товары
          .slice(0, 5);

          return Promise.all(
            selectedGoods.map(good => 
              prisma.favorites.create({
                data: {
                  accountId: user.id,
                  goodsId: good.id
                }
              })
            )
          )
      })

      
    )
    console.log("seed создано успешно");

  } catch (error) {
    console.error("Error", error)
  } finally {
    prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });