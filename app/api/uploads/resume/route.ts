import fs from 'fs/promises';
import path from 'path';

import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthenticated' },
      { status: 401, statusText: 'Unauthorized' }
    );
  }

  try {
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!(await fs.stat(uploadDir).catch(() => false))) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const payload = await request.formData();

    const fileField = payload.get('resumeFile');
    if (!(fileField instanceof File)) {
      return NextResponse.json(
        { error: 'resumeFile is required' },
        { status: 400, statusText: 'Bad Request' }
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (fileField.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400, statusText: 'Bad Request' }
      );
    }

    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowed.includes(fileField.type)) {
      return NextResponse.json(
        { error: 'Only PDF and Word documents are allowed' },
        { status: 400, statusText: 'Bad Request' }
      );
    }

    const storedFileName = `${session.user.id}-${Date.now()}-${fileField.name}`;

    await fs.writeFile(
      path.join(uploadDir, storedFileName),
      Buffer.from(await fileField.arrayBuffer())
    );

    // const payload = await request.formData();

    // const fileField = payload.get('resumeFile') as File;
    // const fileName = `${session.user.id}-${Date.now()}-${fileField.name}`;

    // await fs.writeFile(
    //   path.join(uploadDir, fileName),
    //   Buffer.from(await fileField.arrayBuffer())
    // );

    return NextResponse.json(
      {
        fileUrl: `/uploads/${storedFileName}`,
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
