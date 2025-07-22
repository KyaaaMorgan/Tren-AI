import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Email not registered' }, { status: 400 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
  }

  // Optional: bisa tambahkan session/token nanti
  return NextResponse.json({
    message: 'Login successful',
    user: { id: user.id, name: user.name, email: user.email }
  });
}
