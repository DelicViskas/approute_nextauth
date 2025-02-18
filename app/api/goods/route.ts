import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';

import { /* type NextRequest, */ NextResponse } from 'next/server'


export async function GET(/* request: NextRequest */) {
  try {
    const session = await auth();
    const goods = await prisma.goods.findMany({
      include: {
        Favorites: {
          where: {
            accountId: session?.user?.id,
          }
        }
      }
    })
    return NextResponse.json(goods.map(good => ({
      ...good,
      isFavorite: good.Favorites.length > 0
    })));
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    return NextResponse.json({ error: "Ошибка загрузки данных" }, { status: 500 });
  }

}