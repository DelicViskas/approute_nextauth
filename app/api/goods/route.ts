import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';

import { /* type NextRequest, */ NextRequest, NextResponse } from 'next/server'

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

    return NextResponse.json(goods.map(({ Favorites, ...good }) => ({
      ...good,
      isFavorite: Favorites?.length > 0
    })));
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    return NextResponse.json({ error: "Ошибка загрузки данных" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log((await request.json()));

  } catch (error) {
    console.error("Ошибка при добвалении обявления:", error);
    return NextResponse.json({ error: "Ошибка при добвалении обявления" }, { status: 500 });
  }
}