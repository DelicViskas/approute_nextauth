import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';

import { type NextRequest, NextResponse } from 'next/server'



export async function GET(/* request: NextRequest */) {
  try {
    const session = await auth();

    if (!session?.user) return NextResponse.json(null);
    const
      favorites = await prisma.favorites.findMany({
        where: {
          accountId: session.user.id,
        },
        include: {
          goods: {
            select: {
              title: true,
              price: true,
              image: true,
            },
          },
        },
      });

    const mappedFavorites = favorites.map(({ goods, goodsId: id }) => ({
      id,
      ...goods,
      isFavorite: true
    }));

    return NextResponse.json(mappedFavorites);

  } catch (error) {
    console.error("Ошибка при получении избранного:", error);
    return NextResponse.json({ error: "Ошибка при получении данных" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const id = await request.json();
    await prisma.favorites.create({
      data: {
        accountId: session?.user?.id as string,
        goodsId: id
      }
    })
    return NextResponse.json(`Товар успешно добавлен`, { status: 201 });

  } catch (error) {
    console.error("Ошибка при добвалении в избранное:", error);
    return NextResponse.json({ error: "Ошибка при добвалении в избранное" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    const id = await request.json();
    await prisma.favorites.delete({
      where: {
        accountId_goodsId: {
          accountId: session?.user?.id as string,
          goodsId: id,
        }
      }
    })

    return NextResponse.json(`Товар успешно удален`, { status: 201 });
  } catch (error) {
    console.error("Ошибка при удалении из избранного:", error);
    return NextResponse.json({ error: "Ошибка при удалении из избранного" }, { status: 500 });
  }
}
