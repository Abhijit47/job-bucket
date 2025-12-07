import cloudinary from '@/configs';
import { requireAuth } from '@/lib/auth/requireAuth';
import { UploadApiOptions } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { user } = await requireAuth();

  try {
    const payload = await req.formData();

    const file = payload.get('avatar') as File;
    // console.log('UPLOAD file', file);

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: 'No file provided or invalid file.' },
        { status: 400, statusText: 'Bad Request' }
      );
    }

    const ALLOWED_TYPES = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ];

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: 'File too large. Maximum size: 10MB.' },
        { status: 400 }
      );
    }

    // create a buffer from the file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // set up folders
    const baseFolder = 'job-bucket'; // in cloudinary base folder
    // e.g., job-bucket/employers/employerId or job-bucket/candidates/candidateId
    const uploadFolder = `${baseFolder}/${user.role}s/${user.id}`;

    // upload options
    const options: UploadApiOptions = {
      folder: uploadFolder,
      // resource_type: 'image',
      tags: [`${user.role}`, `${user.id}`],
    };

    // convert the File/Buffer to a data URI string that cloudinary.uploader.upload accepts
    const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

    const res = await cloudinary.uploader.upload(dataUri, options);
    // console.info({ res });
    return NextResponse.json(
      {
        publicId: res.public_id,
        fileUrl: res.secure_url,
        fileName: file.name,
        fileSize: res.bytes,
        fileType: res.format,
        tags: res.tags,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error({ error });
    console.error('Cloudinary upload failed:', (error as Error).message);
    return NextResponse.json(
      {
        message: 'Unexpected error occurred during file upload.',
        error: (error as Error).message,
      },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
}
