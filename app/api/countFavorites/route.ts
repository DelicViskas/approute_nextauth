import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';

import {  /*type request: NextRequest, */ NextResponse } from 'next/server'



export async function GET(/* request: NextRequest */) {
  try {
    const session = await auth();

    const favoriteCount = await prisma.favorites.count({
      where: {
        accountId: session?.user?.id
      }
    });

    return NextResponse.json(favoriteCount);

  } catch (error) {
    console.error("Ошибка при получении избранного:", error);
    return NextResponse.json({ error: "Ошибка при получении данных" }, { status: 500 });
  }
}