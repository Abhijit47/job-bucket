import fs from 'fs/promises';
import path from 'path';

import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return redirect('/login');
  }

  try {
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!(await fs.stat(uploadDir).catch(() => false))) {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    const payload = await request.formData();

    const fileField = payload.get('resumeFile') as File;
    const fileName = `${session.user.id}-${Date.now()}-${fileField.name}`;

    await fs.writeFile(
      path.join(uploadDir, fileName),
      Buffer.from(await fileField.arrayBuffer())
    );

    return NextResponse.json(
      {
        fileUrl: `/uploads/${fileField.name}`,
        fileName: fileField.name,
        fileSize: fileField.size.toString(),
        fileType: fileField.type,
      },
      {
        status: 200,
        statusText: 'OK',
      }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
}
