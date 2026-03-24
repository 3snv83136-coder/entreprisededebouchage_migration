'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const adminToken = process.env.ADMIN_TOKEN;

  if (password && adminToken && password === adminToken) {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 jours
      path: '/',
    });
    redirect('/admin');
  }

  redirect('/admin/login?error=1');
}
