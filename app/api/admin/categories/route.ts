
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Доступ запрещен" }, { status: 403 });
  }
  
  try {
    const categories = await prisma.categories.findMany();
    return NextResponse.json(categories);
  } catch  {
    return NextResponse.json({ error: "Ошибка при получении категорий" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Доступ запрещен" }, { status: 403 });
  }
  
  
  const { name } = await request.json();
  try {
    const category = await prisma.categories.create({
      data: { name },
    });
    return NextResponse.json(category);
  } catch  {
    return NextResponse.json({ error: "Ошибка при получении категорий" }, { status: 500 });
  }
}

export async function PUT(request: Request) {

  const session = await auth();
  const body = await request.json()
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Доступ запрещен" }, { status: 403 });
  }

  const { name, id } = body;
  try {
    const category = await prisma.categories.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    return NextResponse.json(category);
  } catch {
    return NextResponse.json({ error: "Ошибка при обновлении категории" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();  
  const id = (await request.json()).id;
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Доступ запрещен" }, { status: 403 });
  }

  try {
    const category = await prisma.categories.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(category);
  } catch  {
    return NextResponse.json({ error: "Ошибка при удалении категории" }, { status: 500 });
  }
}