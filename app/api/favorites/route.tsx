import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';
import { Favorites } from '@prisma/client';
// import type { Prisma } from '@prisma/client';

import { /* type NextRequest, */ NextResponse } from 'next/server'



export async function GET(/* request: NextRequest */) {
  // console.log('request=', request);
  const session = await auth();
  // console.log(session?.user);
  
  if (!session?.user) return NextResponse.json(null);
  const
    favorites: Favorites[] = await prisma.favorites.findMany({
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

  return NextResponse.json(favorites);

}