import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';

import { type NextRequest,  NextResponse } from 'next/server'



export async function GET(/* request: NextRequest */) {
  try {
    const session = await auth();

    if(session?.user?.role === 'ADMIN') {
      const goods = await prisma.goods.findMany({

      });
      return NextResponse.json(goods);
    }
    if (!session?.user) return NextResponse.json(null);
    const
      mynotices = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          Goods: true
        }
      });

    return NextResponse.json(mynotices?.Goods);

  } catch (error) {
    console.error("Ошибка при добвалении обявления:", error);
    return NextResponse.json({ error: "Ошибка при добвалении обявления" }, { status: 500 });
  }
}

export async function POST(request: NextRequest ) {
  try {
  console.log(request.body);

  } catch (error) {
    console.error("Ошибка при добвалении обявления:", error);
    return NextResponse.json({ error: "Ошибка при добвалении обявления" }, { status: 500 });
  }
}