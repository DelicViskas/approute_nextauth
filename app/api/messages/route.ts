import { auth } from '@/auth';
// import { prisma } from '@/prisma/prisma';

import { /* type NextRequest,  NextRequest,*/ NextResponse } from 'next/server'

export async function GET(/* request: NextRequest */) {
  try {
    const session = await auth();
    const userId = session?.user?.id

    return NextResponse.json({id: userId});
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    return NextResponse.json({ error: "Ошибка загрузки данных" }, { status: 500 });
  }
}