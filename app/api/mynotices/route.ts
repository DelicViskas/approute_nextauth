import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';

import { type NextRequest,  NextResponse } from 'next/server'



export async function GET(/* request: NextRequest */) {
  try {
    const session = await auth();
    console.log("Session: ", session);


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

    // const mappedFavorites = favorites.map(({ goods, goodsId:id }) => ({
    //   id, 
    //   ...goods,
    // }));
  // console.log(mappedFavorites);
  // console.log('sf');
      console.log(mynotices);
      
    return NextResponse.json(mynotices?.Goods);

  } catch (error) {
    console.error("Ошибка при добвалении обявления:", error);
    return NextResponse.json({ error: "Ошибка при добвалении обявления" }, { status: 500 });
  }
}

export async function POST(request: NextRequest ) {
  try {
//     const session = await auth();
  console.log(request.body);
  
//     // if (!session?.user) return NextResponse.json("Unauthorized", {status: 401 })
//     // const req = await request.json();
//     // await prisma.favorites.create({
//     //   data: {
//     //     accountId: session?.user?.id as string,
//     //     goodsId: req.id
//     //   }
//     // })
    
//     // return NextResponse.json(req, { status: 201 });

  } catch (error) {
    console.error("Ошибка при добвалении обявления:", error);
    return NextResponse.json({ error: "Ошибка при добвалении обявления" }, { status: 500 });
  }
}