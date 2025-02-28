import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';

import { /* type NextRequest, */ NextResponse } from 'next/server'

export async function GET(/* request: NextRequest */) {
  try {
    const session = await auth();
    const userId = session?.user?.id
    const goods = await prisma.goods.findMany({
      where: {
        accountId: { not: userId }
      },
      include: {
        Favorites: userId ? { where: { accountId: userId } } : false
      },
    })

    return NextResponse.json(goods.map(good => ({
      ...good,
      isFavorite: good.Favorites?.length > 0
    })));
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    return NextResponse.json({ error: "Ошибка загрузки данных" }, { status: 500 });
  }

}