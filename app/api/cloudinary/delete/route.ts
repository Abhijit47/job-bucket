import cloudinary from '@/configs';
import { requireAuth } from '@/lib/auth/requireAuth';
import { NextRequest, NextResponse } from 'next/server';
// import {  } from "cloudinary";

export async function POST(req: NextRequest) {
  await requireAuth();

  try {
    const payload = await req.formData();
    const publicId = payload.get('publicId') as string;
    console.log('DELETE payload', payload);

    // cloudinary.api.delete_resources(
    //   [payload.public_id],
    //   function (error, result) {
    //     console.log('Cloudinary delete result', result, error);
    //   }
    // );
    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
    // console.log('Cloudinary delete response', deleteImage);

    return NextResponse.json(
      { success: true, message: 'File deleted successfully.' },
      { status: 200, statusText: 'OK' }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Unexpected error occurred during file deletion.',
        error: (error as Error).message,
      },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
}
