import { prisma } from '@/prisma/prisma';

import { /* type NextRequest, */ NextResponse } from 'next/server'


export async function GET(/* request: NextRequest */) {  

  return NextResponse.json(
    await prisma.goods.findMany()
  );
}